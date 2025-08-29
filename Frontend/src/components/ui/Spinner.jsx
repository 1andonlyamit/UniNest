import React from 'react';

const Spinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-[#3E78B2]',
    secondary: 'border-[#88B7E7]',
    muted: 'border-[#848F99]',
    accent: 'border-[#FFC145]',
    white: 'border-white'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        border-2
        ${colorClasses[color]}
        border-t-transparent
        rounded-full
        animate-spin
      `}
    />
  );
};

export default Spinner;