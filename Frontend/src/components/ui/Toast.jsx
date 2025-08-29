import React, { useState, useEffect } from 'react';

const Toast = ({ 
  message, 
  color = 'primary', 
  duration = 4000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return 'bg-[#3E78B2] text-white';
      case 'secondary':
        return 'bg-[#88B7E7] text-white';
      case 'muted':
        return 'bg-[#848F99] text-white';
      case 'accent':
        return 'bg-[#FFC145] text-black';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-[#3E78B2] text-white';
    }
  };

  return (
    <div
      className={`
        ${getColorStyles()}
        px-4 py-3 rounded-lg
        transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}
        min-w-72 max-w-md
        shadow-lg
        border
        border-white/20
      `}
      style={{
        fontFamily: 'var(--font-warm)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="text-sm leading-relaxed font-medium">
          {message}
        </div>
        <button
          onClick={handleClose}
          className="ml-3 text-white/80 hover:text-white transition-colors duration-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;