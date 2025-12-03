import React from 'react';

const roles = ['Data Analyst', 'ML Engineer', 'NLP Engineer'];

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Role
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onRoleChange(role)}
            className={`px-6 py-4 rounded-lg border-2 transition-all ${
              selectedRole === role
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
            }`}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;

