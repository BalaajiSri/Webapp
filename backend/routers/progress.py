from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from typing import List
from datetime import datetime
import json
from models import Progress, ProgressRequest, ProgressResponse
from database import get_session

router = APIRouter(prefix="/progress", tags=["progress"])


@router.post("/save")
async def save_progress(request: ProgressRequest, session: Session = Depends(get_session)):
    """
    Save user's progress (question, answer, score) to database
    """
    try:
        progress = Progress(
            question=request.question,
            answer=request.answer,
            score=request.score,
            timestamp=request.timestamp or datetime.utcnow(),
            role=request.role,
            difficulty=request.difficulty,
            topics=json.dumps(request.topics)
        )
        session.add(progress)
        session.commit()
        session.refresh(progress)
        return {"id": progress.id, "message": "Progress saved successfully"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving progress: {str(e)}")


@router.get("/", response_model=List[ProgressResponse])
async def get_progress(session: Session = Depends(get_session)):
    """
    Get all progress records ordered by timestamp (most recent first)
    """
    try:
        statement = select(Progress).order_by(Progress.timestamp.desc())
        results = session.exec(statement).all()
        return [
            ProgressResponse(
                id=p.id,
                question=p.question,
                answer=p.answer,
                score=p.score,
                timestamp=p.timestamp,
                role=p.role,
                difficulty=p.difficulty,
                topics=p.topics
            )
            for p in results
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching progress: {str(e)}")

