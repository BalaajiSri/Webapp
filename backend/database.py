from sqlmodel import SQLModel, create_engine, Session
import os

# SQLite database path
DATABASE_URL = "sqlite:///./smartprep.db"

engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})


def init_db():
    """Initialize database tables"""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Get database session"""
    with Session(engine) as session:
        yield session

