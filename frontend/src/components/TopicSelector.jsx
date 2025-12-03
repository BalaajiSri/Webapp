import React, { useState } from 'react';

const TopicSelector = ({ selectedTopics, onTopicsChange }) => {
  const [inputValue, setInputValue] = useState('');

  const commonTopics = {
    'Data Analyst': ['SQL', 'Python', 'Data Visualization', 'Statistics', 'Excel', 'Tableau', 'Power BI'],
    'ML Engineer': ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Model Deployment', 'MLOps'],
    'NLP Engineer': ['Natural Language Processing', 'Transformers', 'BERT', 'GPT', 'Text Classification', 'NER']
  };

  const handleAddTopic = () => {
    if (inputValue.trim() && !selectedTopics.includes(inputValue.trim())) {
      onTopicsChange([...selectedTopics, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTopic = (topic) => {
    onTopicsChange(selectedTopics.filter(t => t !== topic));
  };

  const handleAddCommonTopic = (topic) => {
    if (!selectedTopics.includes(topic)) {
      onTopicsChange([...selectedTopics, topic]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Topics
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
          placeholder="Type a topic and press Enter"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTopic}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedTopics.map((topic) => (
          <span
            key={topic}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {topic}
            <button
              onClick={() => handleRemoveTopic(topic)}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;

