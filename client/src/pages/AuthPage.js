import React, { useState } from 'react';
import { Container, Box, Button } from '@mui/material';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    console.log('AuthPage: Navigating to /todolist');
    navigate('/todolist');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        {isLogin ? (
          <>
            <Login onAuthSuccess={handleAuthSuccess} />
            <Button onClick={() => setIsLogin(false)}>Don't have an account? Register</Button>
          </>
        ) : (
          <>
            <Register onAuthSuccess={handleAuthSuccess} />
            <Button onClick={() => setIsLogin(true)}>Already have an account? Login</Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AuthPage;
