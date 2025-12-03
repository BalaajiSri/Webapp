import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Questions API
export const getQuestions = async (role, difficulty, topics) => {
  const response = await client.post('/questions/generate', {
    role,
    difficulty,
    topics,
  });
  return response.data;
};

// Evaluation API
export const evaluateAnswer = async (question, userAnswer) => {
  const response = await client.post('/evaluation/evaluate', {
    question,
    user_answer: userAnswer,
  });
  return response.data;
};

// Hints API
export const getHint = async (question, level) => {
  const response = await client.post('/hints/get', {
    question,
    level,
  });
  return response.data;
};

// Progress API
export const saveProgress = async (question, answer, score, role, difficulty, topics) => {
  const response = await client.post('/progress/save', {
    question,
    answer,
    score,
    role,
    difficulty,
    topics,
  });
  return response.data;
};

export const getProgress = async () => {
  const response = await client.get('/progress/');
  return response.data;
};

export default client;

