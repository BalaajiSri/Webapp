import React, { useState } from 'react';
import { getHint } from '../api/client';

const HintBox = ({ question }) => {
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hintLevel, setHintLevel] = useState(null);

  const handleGetHint = async (level) => {
    setLoading(true);
    setHintLevel(level);
    try {
      const response = await getHint(question, level);
      setHint(response.hint);
    } catch (error) {
      console.error('Error fetching hint:', error);
      setHint('Failed to fetch hint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => handleGetHint('subtle')}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Subtle Hint
        </button>
        <button
          onClick={() => handleGetHint('strong')}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Strong Hint
        </button>
        <button
          onClick={() => handleGetHint('thinking')}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Thinking Framework
        </button>
      </div>
      {loading && (
        <div className="text-sm text-gray-500">Loading hint...</div>
      )}
      {hint && !loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-blue-700 mb-1 uppercase">
            {hintLevel} Hint
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">{hint}</div>
        </div>
      )}
    </div>
  );
};

export default HintBox;

