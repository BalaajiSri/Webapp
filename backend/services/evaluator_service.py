import os
from openai import OpenAI
from typing import List
from models import EvaluationResponse

# Lazy initialization of OpenAI client
_client = None

def get_client():
    """Get or create OpenAI client"""
    global _client
    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        _client = OpenAI(api_key=api_key)
    return _client


async def evaluate_answer(question: str, user_answer: str) -> EvaluationResponse:
    """
    Evaluate user's answer using OpenAI API
    Returns score (0-10), missing points, and improved answer
    """
    prompt = f"""You are an expert technical interviewer evaluating an interview answer.

Question: {question}

User's Answer: {user_answer}

Please evaluate this answer and provide:
1. A score from 0-10 (where 10 is excellent)
2. A list of missing points or areas for improvement (as a bulleted list)
3. An improved version of the answer that demonstrates best practices

Format your response as JSON with these exact keys:
- "score": integer from 0-10
- "missing_points": array of strings
- "improved_answer": string

Be constructive and specific in your feedback."""

    try:
        client = get_client()
        response = client.chat.completions.create(
            model="gpt-5o-nano",
            messages=[
                {"role": "system", "content": "You are an expert technical interviewer. Always respond with valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        import json
        content = response.choices[0].message.content
        result = json.loads(content)
        
        return EvaluationResponse(
            score=result.get("score", 5),
            missing_points=result.get("missing_points", []),
            improved_answer=result.get("improved_answer", "Could not generate improved answer.")
        )
    
    except Exception as e:
        print(f"Error evaluating answer: {e}")
        # Return default response
        return EvaluationResponse(
            score=5,
            missing_points=["Could not evaluate answer. Please try again."],
            improved_answer="Evaluation service is temporarily unavailable."
        )

