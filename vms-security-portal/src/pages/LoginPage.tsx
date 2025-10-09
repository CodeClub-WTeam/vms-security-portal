// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// NOTE: You must ensure '@/hooks/useAuth' exists and exports the useAuth hook.

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect immediately
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/validate', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login({ email, password });
      // Redirection logic is handled by the useEffect above
    } catch (err: any) {
      // Assuming the login function throws an Error with a user-friendly message
      const errorMessage = err.message || 'Login failed. Check your credentials.';
      setError(errorMessage);
      setPassword(''); // Clear password field on error
    }
  };

  const formContainerStyle: React.CSSProperties = {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  return (
    <div style={formContainerStyle}>
      <h1>VMS Security Login</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>Access Control Portal</p>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Email (Officer/Admin)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        
        {error && (
          <div style={{ color: '#dc3545', margin: '15px 0', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <Button 
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          variant="primary"
          style={{ width: '100%', marginTop: '15px' }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;