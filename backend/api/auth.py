from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends
from sqlmodel import Session, select
from datetime import datetime, timedelta
import jwt
import os
import uuid
from models.database import User
from core.database import get_session
from schemas.user import UserRead
from pydantic import BaseModel

from dependencies import get_db, get_current_active_user

router = APIRouter()

SECRET_KEY = os.getenv("BETTER_AUTH_SECRET")
ALGORITHM = "HS256"

class AuthCredentials(BaseModel):
    email: str
    password: str
    name: Optional[str] = None

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/auth/signup")
def signup(credentials: AuthCredentials, db: Session = Depends(get_db)):
    # Check if user exists
    statement = select(User).where(User.email == credentials.email)
    existing_user = db.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create new user
    user_id = str(uuid.uuid4())
    new_user = User(
        id=user_id, 
        email=credentials.email, 
        name=credentials.name or credentials.email.split('@')[0],
        hashed_password=get_password_hash(credentials.password),
        created_at=datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token({"user_id": user_id, "email": credentials.email, "name": new_user.name})
    return {"user": new_user, "token": token}

@router.post("/auth/signin")
def signin(credentials: AuthCredentials, db: Session = Depends(get_db)):
    statement = select(User).where(User.email == credentials.email)
    user = db.exec(statement).first()
    
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"user_id": user.id, "email": user.email, "name": user.name})
    return {"user": user, "token": token}

@router.get("/auth/me")
def get_me(user: User = Depends(get_current_active_user)):
    return {
        "user_id": user.id, 
        "email": user.email, 
        "name": user.name, 
        "is_authenticated": True
    }
