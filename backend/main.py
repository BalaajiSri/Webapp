# Load environment variables FIRST, before any other imports
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routers import questions, evaluation, hints, progress

# Initialize database
init_db()

# Create FastAPI app
app = FastAPI(
    title="SmartPrep API",
    description="API for generating interview questions and tracking progress",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(questions.router)
app.include_router(evaluation.router)
app.include_router(hints.router)
app.include_router(progress.router)


@app.get("/")
async def root():
    return {"message": "SmartPrep API is running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}

