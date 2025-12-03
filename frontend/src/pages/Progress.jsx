import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTable from '../components/ProgressTable';
import { getProgress } from '../api/client';

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const data = await getProgress();
      setProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
      alert('Failed to fetch progress. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateAverage = () => {
    if (progress.length === 0) return 0;
    const sum = progress.reduce((acc, item) => acc + item.score, 0);
    return (sum / progress.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your interview preparation journey</p>
        </div>

        {progress.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{progress.length}</div>
                <div className="text-sm text-gray-600">Total Attempts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{calculateAverage()}</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.max(...progress.map(p => p.score))}
                </div>
                <div className="text-sm text-gray-600">Best Score</div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">Loading progress...</p>
          </div>
        ) : (
          <ProgressTable progress={progress} />
        )}
      </div>
    </div>
  );
};

export default Progress;

