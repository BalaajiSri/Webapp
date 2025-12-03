import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from '../components/RoleSelector';
import TopicSelector from '../components/TopicSelector';
import { getQuestions } from '../api/client';

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

const Home = () => {
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!role || !difficulty) {
      alert('Please select a role and difficulty level');
      return;
    }

    setLoading(true);
    try {
      const response = await getQuestions(role, difficulty, topics);
      navigate('/questions', {
        state: {
          questions: response.questions,
          role,
          difficulty,
          topics,
        },
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">SmartPrep</h1>
          <p className="text-gray-600">Generate personalized interview questions and track your progress</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <RoleSelector selectedRole={role} onRoleChange={setRole} />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Difficulty
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-6 py-4 rounded-lg border-2 transition-all ${
                    difficulty === diff
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <TopicSelector selectedTopics={topics} onTopicsChange={setTopics} />

          <button
            onClick={handleGenerate}
            disabled={loading || !role || !difficulty}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Questions...' : 'Generate Questions'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

