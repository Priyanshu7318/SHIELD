from fastapi import APIRouter, Depends, HTTPException
from backend.utils.mongo_storage import get_user_logs, add_feedback, get_user_stats, get_dashboard_chart_data, get_dashboard_type_stats
from pydantic import BaseModel

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

from backend.routes.auth_routes import get_current_user

class FeedbackCreate(BaseModel):
    message: str

@router.get("/logs")
async def get_logs(current_user = Depends(get_current_user)):
    logs = await get_user_logs(current_user.username)
    # Sort by timestamp desc (newest first)
    # Assuming timestamp is ISO format string
    logs.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
    return logs

@router.get("/stats")
async def get_stats(current_user = Depends(get_current_user)):
    return await get_user_stats(current_user.username)

@router.get("/chart-data")
async def get_chart_data(type: str = "All", current_user = Depends(get_current_user)):
    return await get_dashboard_chart_data(current_user.username, type)

@router.get("/type-stats")
async def get_type_stats(current_user = Depends(get_current_user)):
    return await get_dashboard_type_stats(current_user.username)

@router.post("/feedback")
async def create_feedback(feedback: FeedbackCreate, current_user = Depends(get_current_user)):
    await add_feedback(current_user.username, feedback.message)
    return {"message": "Feedback received"}
