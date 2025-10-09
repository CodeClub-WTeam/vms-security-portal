// src/components/ui/LoadingSpinner.tsx

import React from 'react';

const spinnerStyle: React.CSSProperties = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: '4px solid #007bff', // Blue color for the spinner
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  animation: 'spin 1s linear infinite',
  display: 'inline-block',
};

const keyframesStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * A simple, styled loading spinner component.
 * @param message Optional message to display next to the spinner.
 */
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
      <span style={{ marginLeft: '10px', color: '#555' }}>{message}</span>
    </div>
  );
};

export default LoadingSpinner;