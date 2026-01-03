from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: str = Field(primary_key=True)  # From Better Auth
    email: str = Field(unique=True)
    name: Optional[str] = None
    hashed_password: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to tasks
    tasks: List["Task"] = Relationship(back_populates="user")


class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: int = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)  # Index for efficient filtering by user
    title: str
    description: Optional[str] = None
    completed: bool = Field(default=False, index=True)  # Index for efficient filtering by completion status
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to user
    user: User = Relationship(back_populates="tasks")