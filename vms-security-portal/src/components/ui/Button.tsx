// src/components/ui/Button.tsx

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  children: React.ReactNode;
}

const getStyles = (variant: 'primary' | 'secondary' | 'danger', disabled: boolean) => {
  let base = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  };

  const colors = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
  };

  const style = colors[variant] || colors.primary;

  if (disabled) {
    return {
      ...base,
      ...style,
      backgroundColor: '#aaa',
      cursor: 'not-allowed',
    };
  }
  
  return { ...base, ...style };
};

/**
 * A reusable button component with loading state and style variants.
 */
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  isLoading = false, 
  disabled = false, 
  children, 
  ...rest 
}) => {
  const isDisabled = disabled || isLoading;
 const baseStyle = getStyles(variant, isDisabled);
const mergedStyle = { ...baseStyle, ...(rest.style || {}) };

return (
  <button
    {...rest}
    disabled={isDisabled}
    style={mergedStyle}
  >

      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner message="" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;