

import React from 'react';
import { Container, CssBaseline, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // useNavigate instead of useHistory

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Typography variant="h5" align="center">Dashboard</Typography>
            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="h6">Welcome!</Typography>
                <Typography variant="body1">Your token is:</Typography>
                <Typography variant="body2" style={{ wordBreak: 'break-word' }}>
                    {token}
                </Typography>
            </Paper>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: '16px' }}
                onClick={handleLogout}
                fullWidth
            >
                Logout
            </Button>
        </Container>
    );
};

export default Dashboard;
