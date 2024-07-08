import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from '../services/api';

const Login = ({ onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/auth/login', { username, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      onAuthSuccess();
    } catch (error) {
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  return (
    <Box 
      component="form" 
      sx={{ mt: 1, width: '300px', margin: 'auto' }} // Adjusted styling
      noValidate 
      autoComplete="off"
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default Login;
