from fastapi import APIRouter, HTTPException
from models import HintRequest, HintResponse
from services.hint_service import generate_hint

router = APIRouter(prefix="/hints", tags=["hints"])


@router.post("/get", response_model=HintResponse)
async def get_hint_endpoint(request: HintRequest):
    """
    Get a hint for a question based on the hint level
    """
    try:
        result = await generate_hint(
            question=request.question,
            level=request.level
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating hint: {str(e)}")

