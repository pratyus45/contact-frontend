import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' 
    : type === 'error' ? 'bg-red-100 border-red-400 text-red-700' 
    : 'bg-blue-100 border-blue-400 text-blue-700';

  return (
    <div className={`${bgColor} border px-4 py-3 rounded relative mb-4`} role="alert">
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          <span className="text-2xl">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert;