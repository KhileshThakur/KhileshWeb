import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if token exists in LocalStorage
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // If not authenticated, redirect to Login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child component (Dashboard)
  return children;
};

export default ProtectedRoute;