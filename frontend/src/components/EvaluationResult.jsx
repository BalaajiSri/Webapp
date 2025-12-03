import React from 'react';

const EvaluationResult = ({ evaluation }) => {
  if (!evaluation) return null;

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Evaluation Result</h3>
        <div className={`inline-block px-4 py-2 rounded-lg ${getScoreColor(evaluation.score)}`}>
          <span className="text-2xl font-bold">{evaluation.score}</span>
          <span className="text-sm ml-1">/ 10</span>
        </div>
      </div>

      {evaluation.missing_points && evaluation.missing_points.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Missing Points / Areas for Improvement:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {evaluation.missing_points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.improved_answer && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Improved Answer:</h4>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
            {evaluation.improved_answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationResult;

