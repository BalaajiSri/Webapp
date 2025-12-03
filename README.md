# SmartPrep - Interview Preparation Platform

A full-stack web application for generating personalized interview questions for Data Analyst, ML Engineer, and NLP Engineer roles. The app evaluates user answers, provides hints, and tracks progress.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React + Vite + TailwindCSS
- **Database**: SQLite (SQLModel)
- **AI**: OpenAI API (GPT-4o)

## Features

- 🎯 Generate personalized interview questions based on role, difficulty, and topics
- ✅ Evaluate answers with AI-powered scoring (0-10)
- 💡 Get hints at different levels (subtle, strong, thinking framework)
- 📊 Track progress with detailed history and statistics
- 🎨 Modern, clean UI with TailwindCSS

## Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API key

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the `backend` directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the backend server:
```bash
python -m uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file if you want to customize the API URL:
```bash
VITE_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
Webapp/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── models.py               # SQLModel models and Pydantic schemas
│   ├── database.py             # Database configuration
│   ├── routers/                # API route handlers
│   │   ├── questions.py
│   │   ├── evaluation.py
│   │   ├── hints.py
│   │   └── progress.py
│   ├── services/               # Business logic and OpenAI integration
│   │   ├── generator_service.py
│   │   ├── evaluator_service.py
│   │   └── hint_service.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── pages/              # Page components
    │   │   ├── Home.jsx
    │   │   ├── Questions.jsx
    │   │   └── Progress.jsx
    │   ├── components/         # Reusable components
    │   │   ├── RoleSelector.jsx
    │   │   ├── TopicSelector.jsx
    │   │   ├── QuestionCard.jsx
    │   │   ├── AnswerBox.jsx
    │   │   ├── EvaluationResult.jsx
    │   │   ├── HintBox.jsx
    │   │   └── ProgressTable.jsx
    │   ├── api/                # API client
    │   │   └── client.js
    │   ├── App.jsx             # Main app component with routing
    │   └── main.jsx            # React entry point
    ├── package.json
    └── vite.config.js
```

## API Endpoints

### Questions
- `POST /questions/generate` - Generate interview questions
  - Body: `{ "role": "Data Analyst", "difficulty": "Intermediate", "topics": ["SQL", "Python"] }`

### Evaluation
- `POST /evaluation/evaluate` - Evaluate an answer
  - Body: `{ "question": "...", "user_answer": "..." }`
  - Returns: `{ "score": 8, "missing_points": [...], "improved_answer": "..." }`

### Hints
- `POST /hints/get` - Get a hint for a question
  - Body: `{ "question": "...", "level": "subtle" | "strong" | "thinking" }`

### Progress
- `POST /progress/save` - Save progress
- `GET /progress/` - Get all progress records

## Usage

1. **Generate Questions**: 
   - Select a role (Data Analyst, ML Engineer, or NLP Engineer)
   - Choose difficulty level (Beginner, Intermediate, Advanced)
   - Add relevant topics
   - Click "Generate Questions"

2. **Answer Questions**:
   - Read each question
   - Type your answer in the textarea
   - Click "Evaluate Answer" to get feedback
   - Use hint buttons for guidance

3. **Track Progress**:
   - View your progress page to see all attempts
   - Check statistics: total attempts, average score, best score

## Development

### Backend Development
- The backend uses FastAPI with automatic API documentation
- Visit `http://localhost:8000/docs` for interactive API docs
- Database is SQLite, stored as `smartprep.db` in the backend directory

### Frontend Development
- Uses Vite for fast development
- Hot module replacement enabled
- TailwindCSS for styling

## Notes

- Make sure your OpenAI API key is set in the backend `.env` file
- The database is automatically created on first run
- CORS is configured to allow requests from `localhost:5173` (Vite default)

## License

MIT

