import React from 'react';

const AnswerBox = ({ answer, onAnswerChange, disabled }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Your Answer
      </label>
      <textarea
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer here..."
        rows={8}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
      />
    </div>
  );
};

export default AnswerBox;

