

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // useNavigate instead of useHistory

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://class-room-application-mern.onrender.com/api/login', { email, password });
            const { role } = JSON.parse(atob(response.data.token.split('.')[1]));
            localStorage.setItem('role', role);
            localStorage.setItem('token', response.data.token);
            setError(null);
            navigate('/dashboard'); // Redirect to the dashboard page after successful login
        } catch (error) {
            console.error('Login error', error);
            setError('Invalid credentials');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography variant="h5" align="center">Login</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
            >
                Login
            </Button>
            {error && <Typography color="error" align="center">{error}</Typography>}
        </Container>
    );
};

export default Login;
