// src/App.tsx (Updated)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; 

// Import pages and features
import LoginPage from '@/pages/LoginPage';
import ValidationPortal from '@/features/validation/ValidationPortal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// --- Components ---

/** * Component to protect routes based on authentication status.
 * Now only checks if the user is authenticated, ignoring roles.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    // Show a global loading indicator while checking auth status
    return <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        <LoadingSpinner message="Checking authentication status..." />
    </div>;
  }
  
  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};


// --- Main App Component ---

const App: React.FC = () => {
  return (
    <Routes>
      {/* 1. Login Route (Public) - The landing page */}
      <Route path="/" element={<LoginPage />} />
      
      {/* 2. Validation Portal (Protected - The only operational route) */}
      <Route 
        path="/validate" 
        element={
          <ProtectedRoute>
            <ValidationPortal />
          </ProtectedRoute>
        } 
      />
      
      {/* 3. Fallback Route: Redirect authenticated users to /validate, others to / */}
      <Route 
        path="*" 
        element={
          <ProtectedRoute>
            {/* If authenticated, redirect to the portal */}
            <Navigate to="/validate" replace />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;