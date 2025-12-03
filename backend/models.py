from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum


class Role(str, Enum):
    DATA_ANALYST = "Data Analyst"
    ML_ENGINEER = "ML Engineer"
    NLP_ENGINEER = "NLP Engineer"


class Difficulty(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"


class HintLevel(str, Enum):
    SUBTLE = "subtle"
    STRONG = "strong"
    THINKING = "thinking"


class Progress(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    question: str
    answer: str
    score: int = Field(ge=0, le=10)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    role: str
    difficulty: str
    topics: str  # JSON string of topics list


class QuestionRequest(SQLModel):
    role: Role
    difficulty: Difficulty
    topics: list[str]


class QuestionResponse(SQLModel):
    questions: list[str]


class EvaluationRequest(SQLModel):
    question: str
    user_answer: str


class EvaluationResponse(SQLModel):
    score: int = Field(ge=0, le=10)
    missing_points: list[str]
    improved_answer: str


class HintRequest(SQLModel):
    question: str
    level: HintLevel


class HintResponse(SQLModel):
    hint: str


class ProgressRequest(SQLModel):
    question: str
    answer: str
    score: int = Field(ge=0, le=10)
    timestamp: Optional[datetime] = None
    role: str
    difficulty: str
    topics: list[str]


class ProgressResponse(SQLModel):
    id: int
    question: str
    answer: str
    score: int
    timestamp: datetime
    role: str
    difficulty: str
    topics: str

