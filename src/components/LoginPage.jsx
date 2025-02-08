import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = useSelector((state) => state.auth.user);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!storedUser) {
      setError('No registered user found. Please sign up first.');
      return;
    }

    if (
      credentials.email === storedUser.email &&
      credentials.password === storedUser.password
    ) {
      dispatch(login());
      navigate('/users');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box className="login-page">
      {/* Left Side - .Background Image */}
      <Box className="login-image"></Box>

      {/* Right Side - Login Form */}
      <Box className="login-container">
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Log In
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email Address"
            fullWidth
            variant="outlined"
            margin="normal"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/signup')}
            sx={{ mt: 2 }}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
