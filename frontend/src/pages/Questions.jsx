import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import AnswerBox from '../components/AnswerBox';
import EvaluationResult from '../components/EvaluationResult';
import HintBox from '../components/HintBox';
import { evaluateAnswer, saveProgress } from '../api/client';

const Questions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, role, difficulty, topics } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate('/');
    }
  }, [questions, navigate]);

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex] || '';
  const currentEvaluation = evaluations[currentIndex];

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentIndex]: value });
  };

  const handleEvaluate = async () => {
    if (!currentAnswer.trim()) {
      alert('Please provide an answer before evaluating');
      return;
    }

    setLoading(true);
    try {
      const evaluation = await evaluateAnswer(currentQuestion, currentAnswer);
      setEvaluations({ ...evaluations, [currentIndex]: evaluation });

      // Save progress
      await saveProgress(
        currentQuestion,
        currentAnswer,
        evaluation.score,
        role,
        difficulty,
        topics
      );
    } catch (error) {
      console.error('Error evaluating answer:', error);
      alert('Failed to evaluate answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </button>
          <button
            onClick={() => navigate('/progress')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Progress →
          </button>
        </div>

        <QuestionCard
          question={currentQuestion}
          index={currentIndex}
          total={questions.length}
        />

        <HintBox question={currentQuestion} />

        <AnswerBox
          answer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          disabled={loading}
        />

        <div className="mb-6">
          <button
            onClick={handleEvaluate}
            disabled={loading || !currentAnswer.trim()}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Evaluating...' : 'Evaluate Answer'}
          </button>
        </div>

        {currentEvaluation && (
          <EvaluationResult evaluation={currentEvaluation} />
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;

