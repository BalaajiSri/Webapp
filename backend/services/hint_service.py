import os
from openai import OpenAI
from models import HintLevel, HintResponse

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


async def generate_hint(question: str, level: HintLevel) -> HintResponse:
    """
    Generate a hint for a question based on the hint level
    """
    level_descriptions = {
        HintLevel.SUBTLE: "Give a very subtle hint that gently guides the thinking without revealing the answer.",
        HintLevel.STRONG: "Give a stronger hint that provides more direction but still requires the user to think.",
        HintLevel.THINKING: "Provide a thinking framework or approach to help structure the answer."
    }
    
    prompt = f"""You are helping a candidate prepare for an interview.

Question: {question}

{level_descriptions[level]}

Provide a helpful hint that matches the "{level}" level. Be encouraging and educational."""

    try:
        client = get_client()
        response = client.chat.completions.create(
            model="gpt-5o-nano",
            messages=[
                {"role": "system", "content": "You are a helpful interview coach providing hints to candidates."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )
        
        hint = response.choices[0].message.content.strip()
        return HintResponse(hint=hint)
    
    except Exception as e:
        print(f"Error generating hint: {e}")
        return HintResponse(
            hint="Hint service is temporarily unavailable. Try thinking about the key concepts related to this question."
        )

