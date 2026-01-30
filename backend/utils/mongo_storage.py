from backend.database.mongo_config import get_database
from datetime import datetime
import uuid

def get_collection(name):
    db = get_database()
    return db[name]

async def get_user_by_username(username: str):
    users = get_collection("users")
    user = await users.find_one({"username": username})
    if user:
        user["_id"] = str(user["_id"])
        if "id" not in user:
            # Generate stable int ID from ObjectId if missing
            user["id"] = int(str(user["_id"])[-6:], 16)
    return user

async def get_user_by_email(email: str):
    users = get_collection("users")
    user = await users.find_one({"email": email})
    if user:
        user["_id"] = str(user["_id"])
        if "id" not in user:
             # Generate stable int ID from ObjectId if missing
            user["id"] = int(str(user["_id"])[-6:], 16)
    return user

async def create_user(user_data: dict):
    users = get_collection("users")
    # user_data should already contain hashed_password
    if "created_at" not in user_data:
        user_data["created_at"] = datetime.now().isoformat()
    
    # Generate integer ID for compatibility with existing schemas
    if "id" not in user_data:
        user_data["id"] = int(str(int(uuid.uuid4().int))[:8])
        
    result = await users.insert_one(user_data)
    user_data["_id"] = str(result.inserted_id)
    return user_data

async def add_log(username: str, log_entry: dict):
    logs = get_collection("logs")
    log_entry["username"] = username
    if "timestamp" not in log_entry:
        log_entry["timestamp"] = datetime.now().isoformat()
    if "id" not in log_entry:
        log_entry["id"] = str(uuid.uuid4())
    
    await logs.insert_one(log_entry)
    log_entry["_id"] = str(log_entry.get("_id"))
    return log_entry

async def get_user_logs(username: str):
    logs = get_collection("logs")
    cursor = logs.find({"username": username})
    results = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        results.append(document)
    return results

async def add_feedback(username: str, message: str):
    feedback = get_collection("feedback")
    entry = {
        "username": username,
        "message": message,
        "timestamp": datetime.now().isoformat()
    }
    await feedback.insert_one(entry)
    return entry

async def add_risk_report(username: str, report_entry: dict):
    risks = get_collection("risks")
    report_entry["username"] = username
    if "timestamp" not in report_entry:
        report_entry["timestamp"] = datetime.now().isoformat()
    
    await risks.insert_one(report_entry)
    return report_entry

async def get_user_stats(username: str):
    logs_coll = get_collection("logs")
    # Pipeline to count totals and fakes
    pipeline = [
        {"$match": {"username": username}},
        {"$group": {
            "_id": None,
            "total": {"$sum": 1},
            "fake": {
                "$sum": {
                    "$cond": [
                        {"$or": [
                            {"$regexMatch": {"input": "$result", "regex": "Fake"}},
                            {"$regexMatch": {"input": "$result", "regex": "AI"}}
                        ]},
                        1,
                        0
                    ]
                }
            }
        }}
    ]
    
    # Check if collection exists/has documents first to avoid error? No, aggregate handles empty fine usually.
    # But to_list might return empty list.
    
    try:
        result = await logs_coll.aggregate(pipeline).to_list(length=1)
    except Exception as e:
        print(f"Error in stats aggregation: {e}")
        return {
            "total": 0,
            "fake": 0,
            "real": 0,
            "safetyScore": 100
        }
    
    if not result:
        return {
            "total": 0,
            "fake": 0,
            "real": 0,
            "safetyScore": 100
        }
    
    stats = result[0]
    total = stats["total"]
    fake_count = stats["fake"]
    real_count = total - fake_count
    
    p_fake = fake_count / total if total > 0 else 0
    safety_score = round((1 - p_fake) * 100)
    
    return {
        "total": total,
        "fake": fake_count,
        "real": real_count,
        "safetyScore": safety_score
    }

async def update_user_password(username: str, hashed_password: str):
    users = get_collection("users")
    await users.update_one(
        {"username": username},
        {"$set": {"hashed_password": hashed_password}}
    )

async def get_dashboard_chart_data(username: str, filter_type: str = "All"):
    logs_coll = get_collection("logs")
    
    match_stage = {"username": username}
    if filter_type != "All":
        match_stage["request_type"] = filter_type.lower()

    pipeline = [
        {"$match": match_stage},
        {"$project": {
            "date": {"$substr": ["$timestamp", 0, 10]},
            "result": 1
        }},
        {"$group": {
            "_id": "$date",
            "Total": {"$sum": 1},
            "Fake": {
                "$sum": {
                    "$cond": [
                        {"$or": [
                            {"$regexMatch": {"input": "$result", "regex": "Fake"}},
                            {"$regexMatch": {"input": "$result", "regex": "AI"}}
                        ]},
                        1,
                        0
                    ]
                }
            }
        }},
        {"$sort": {"_id": 1}}
    ]

    results = await logs_coll.aggregate(pipeline).to_list(length=30)
    
    formatted_data = []
    for r in results:
        total = r["Total"]
        fake = r["Fake"]
        real = total - fake
        formatted_data.append({
            "name": r["_id"], # Date string
            "Total": total,
            "Fake": fake,
            "Real": real
        })
        
    return formatted_data

async def get_dashboard_type_stats(username: str):
    logs_coll = get_collection("logs")
    
    pipeline = [
        {"$match": {"username": username}},
        {"$group": {
            "_id": "$request_type",
            "Total": {"$sum": 1},
            "Fake": {
                "$sum": {
                    "$cond": [
                        {"$or": [
                            {"$regexMatch": {"input": "$result", "regex": "Fake"}},
                            {"$regexMatch": {"input": "$result", "regex": "AI"}}
                        ]},
                        1,
                        0
                    ]
                }
            }
        }}
    ]

    results = await logs_coll.aggregate(pipeline).to_list(length=10)
    
    # Ensure all types are present even if count is 0
    types = ['video', 'audio', 'text', 'image']
    formatted_data = []
    
    for t in types:
        found = next((r for r in results if r["_id"] == t), None)
        total = found["Total"] if found else 0
        fake = found["Fake"] if found else 0
        real = total - fake
        
        formatted_data.append({
            "name": t.capitalize(),
            "Total": total,
            "Fake": fake,
            "Real": real
        })
        
    return formatted_data
