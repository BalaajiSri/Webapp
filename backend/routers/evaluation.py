from fastapi import APIRouter, HTTPException
from models import EvaluationRequest, EvaluationResponse
from services.evaluator_service import evaluate_answer

router = APIRouter(prefix="/evaluation", tags=["evaluation"])


@router.post("/evaluate", response_model=EvaluationResponse)
async def evaluate_answer_endpoint(request: EvaluationRequest):
    """
    Evaluate a user's answer to a question
    Returns score, missing points, and improved answer
    """
    try:
        result = await evaluate_answer(
            question=request.question,
            user_answer=request.user_answer
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error evaluating answer: {str(e)}")

