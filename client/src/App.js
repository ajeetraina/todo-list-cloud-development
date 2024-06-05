import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TodoList from './components/TodoList';

const App = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage on app load
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/todolist');
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/todolist" element={isAuthenticated ? <TodoList /> : <Navigate to="/auth" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/todolist" : "/auth"} />} />
    </Routes>
  );
};

export default App;
