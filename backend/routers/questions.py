from fastapi import APIRouter, HTTPException
from models import QuestionRequest, QuestionResponse
from services.generator_service import generate_questions

router = APIRouter(prefix="/questions", tags=["questions"])


@router.post("/generate", response_model=QuestionResponse)
async def generate_questions_endpoint(request: QuestionRequest):
    """
    Generate personalized interview questions based on role, difficulty, and topics
    """
    try:
        questions = await generate_questions(
            role=request.role,
            difficulty=request.difficulty,
            topics=request.topics
        )
        return QuestionResponse(questions=questions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating questions: {str(e)}")

