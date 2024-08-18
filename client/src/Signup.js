import React, { useState } from 'react';
import { Container, Typography, Paper, Button, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://class-room-application-mern.onrender.com/api/signup', { email, password, role }, {
                headers: { Authorization: `${token}` }
            });
            setEmail('');
            setPassword('');
            setRole('');
            setToken('');
            setSnackbarMessage('User created successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error creating user', error);
            setSnackbarMessage('Failed to create user. Please try again.');
            setSnackbarSeverity('error');
        }
        setOpenSnackbar(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/PrincipalDashboard');
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="sm">
            <Typography variant="h5" align="center">Principal Dashboard</Typography>
            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="h6">Create User</Typography>
                <form onSubmit={handleSignup}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Role (e.g., Teacher)"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Create User
                    </Button>
                </form>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '16px' }}
                    onClick={handleLogout}
                    fullWidth
                >
                    Go Back
                </Button>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Signup;
