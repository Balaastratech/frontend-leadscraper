import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export const ErrorState = ({ title, message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <FiAlertTriangle className="text-red-500" size={48} />
    <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
    <p className="text-sm text-gray-500 mt-2 max-w-md">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);