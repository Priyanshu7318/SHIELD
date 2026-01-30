from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from backend.schemas import UserCreate, UserLogin, Token, UserResponse
from backend.utils.password import get_password_hash, verify_password
from backend.utils.jwt_handler import create_access_token, verify_token
from backend.utils.mongo_storage import (
    get_user_by_username, 
    get_user_by_email, 
    create_user, 
    update_user_password
)
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=401, detail="Invalid token payload")
        
    user_data = await get_user_by_username(username)
    
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Convert dict to object-like structure for compatibility
    class UserObj:
        def __init__(self, **entries):
            self.__dict__.update(entries)
    
    return UserObj(**user_data)

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user = Depends(get_current_user)):
    return current_user

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    # Check if user exists
    if await get_user_by_username(user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    
    if await get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create new user
    new_user = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password
    }
    
    created_user = await create_user(new_user)
    
    # Return as object for Pydantic model compatibility
    class UserObj:
        def __init__(self, **entries):
            self.__dict__.update(entries)
            
    return UserObj(**created_user)

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db_user = await get_user_by_username(user.username)
    
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create JWT token
    access_token = create_access_token(data={"sub": db_user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

@router.post("/change-password")
async def change_password(request: ChangePasswordRequest, current_user = Depends(get_current_user)):
    # Verify current password
    # current_user is an object here, so we access attributes
    # But wait, current_user doesn't have hashed_password attribute if we didn't include it in UserObj in get_current_user
    # In get_current_user, we did `self.__dict__.update(entries)`, so it has all fields from DB.
    
    if not verify_password(request.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect current password")
        
    new_hashed_password = get_password_hash(request.new_password)
    await update_user_password(current_user.username, new_hashed_password)
    
    return {"message": "Password updated successfully"}
