import React from 'react';

const QuestionCard = ({ question, index, total }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Question {index + 1} of {total}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
        {question}
      </h3>
    </div>
  );
};

export default QuestionCard;

