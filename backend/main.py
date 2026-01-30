from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from backend.routes import auth_routes, detection_routes, dashboard_routes
from backend.utils.jwt_handler import verify_token
from backend.database.mongo_config import connect_to_mongo, close_mongo_connection
import os

app = FastAPI(title="AI Guardian Backend")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include Routers
app.include_router(auth_routes.router)
app.include_router(detection_routes.router)
app.include_router(dashboard_routes.router)

# Enable CORS
origins = ["*"] # In production, replace with specific origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

@app.get("/")
def read_root():
    return {"message": "Welcome to Shield API"}

@app.get("/protected")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": "You are authorized", "user": current_user}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
