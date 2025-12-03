import os
from openai import OpenAI
from typing import List
from models import Role, Difficulty

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


async def generate_questions(role: Role, difficulty: Difficulty, topics: List[str]) -> List[str]:
    """
    Generate personalized interview questions using OpenAI API
    """
    topics_str = ", ".join(topics) if topics else "general topics"
    
    prompt = f"""Generate 5 interview questions for a {role} position at {difficulty} level.
    
Focus on these topics: {topics_str}

Requirements:
- Questions should be specific to {role} role
- Difficulty level: {difficulty}
- Questions should be practical and relevant
- Each question should be on a separate line
- Number each question (1., 2., 3., etc.)

Return only the questions, one per line, without any additional text or formatting."""

    try:
        client = get_client()
        response = client.chat.completions.create(
            model="gpt-5o-nano",
            messages=[
                {"role": "system", "content": "You are an expert technical interviewer specializing in data science, machine learning, and NLP roles."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        content = response.choices[0].message.content.strip()
        
        # Try to parse questions - they might be numbered or separated by newlines
        lines = [line.strip() for line in content.split('\n') if line.strip()]
        cleaned_questions = []
        
        for line in lines:
            # Remove leading numbers, dots, parentheses, and dashes
            cleaned = line.lstrip('0123456789. )-').strip()
            # Skip if it's too short or looks like metadata
            if cleaned and len(cleaned) > 10 and not cleaned.lower().startswith(('question', 'answer', 'note')):
                cleaned_questions.append(cleaned)
        
        # If we got fewer than 3, try splitting by double newlines
        if len(cleaned_questions) < 3:
            paragraphs = [p.strip() for p in content.split('\n\n') if p.strip()]
            cleaned_questions = [p.lstrip('0123456789. )-').strip() for p in paragraphs if len(p.strip()) > 10][:5]
        
        # Remove duplicates while preserving order
        seen = set()
        unique_questions = []
        for q in cleaned_questions:
            if q not in seen:
                seen.add(q)
                unique_questions.append(q)
        
        return unique_questions[:5] if unique_questions else [
            f"Explain the key responsibilities of a {role}.",
            f"Describe a {difficulty.lower()} level project you would work on as a {role}.",
            f"How would you approach {topics_str} in your role as a {role}?",
            f"What tools and technologies are essential for a {role}?",
            f"Describe a challenging scenario you might face as a {role}."
        ]
    
    except Exception as e:
        print(f"Error generating questions: {e}")
        # Return fallback questions
        return [
            f"Explain the key responsibilities of a {role}.",
            f"Describe a {difficulty.lower()} level project you would work on as a {role}.",
            f"How would you approach {topics_str} in your role as a {role}?",
            f"What tools and technologies are essential for a {role}?",
            f"Describe a challenging scenario you might face as a {role}."
        ]

