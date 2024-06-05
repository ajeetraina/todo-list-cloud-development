import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from '../services/api';

const Register = ({ onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/auth/register', { username, password });
      console.log('Registration successful:', response.data);
      onAuthSuccess();
    } catch (error) {
      console.error('Registration error:', error);
    }
    setLoading(false);
  };

  return (
    <Box component="form" sx={{ mt: 1 }} noValidate autoComplete="off">
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
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default Register;
