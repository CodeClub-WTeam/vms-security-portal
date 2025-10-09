// src/components/ui/Input.tsx

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // Optional error message for validation
}

/**
 * A reusable input component with label and optional error display.
 */
const Input: React.FC<InputProps> = ({ label, error, id, ...rest }) => {
  const inputId = id || rest.name;

  return (
    <div style={{ marginBottom: '15px', width: '100%' }}>
      <label 
        htmlFor={inputId} 
        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}
      >
        {label}
      </label>
      <input
        id={inputId}
        {...rest}
        style={{
          width: '100%',
          padding: '10px',
          border: `1px solid ${error ? '#dc3545' : '#ccc'}`,
          borderRadius: '4px',
          boxSizing: 'border-box',
          fontSize: '16px',
        }}
      />
      {error && (
        <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;