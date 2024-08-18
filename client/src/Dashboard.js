
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Your token:</p>
            <textarea readOnly value={token} rows="5" cols="50" />
            <p>Your role: {role}</p>
            {/* Show different buttons based on role */}
            {role === 'principal' && (
                <button onClick={() => navigate('/principal-dashboard')}>Go to Principal Dashboard</button>
            )}
            {role === 'teacher' && (
                <button onClick={() => navigate('/teacher-dashboard')}>Go to Teacher Dashboard</button>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;


/*
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
*/