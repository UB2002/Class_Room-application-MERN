import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PrincipalDashboard() {
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token and role from localStorage when the component mounts
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (storedToken) {
            setToken(storedToken);
        } else {
            setToken('No token available');
        }

        if (storedRole) {
            setRole(storedRole);
        } else {
            setRole('No role assigned');
        }
    }, []); // Empty dependency array means this effect runs once on mount

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken('No token available');
        setRole('No role assigned');
        navigate('/login');
    };

    const sign = () => {
        navigate('/signup'); // Ensure the route matches the actual path
    };

    const classroom =() => {
        navigate('/Classroom')
    }
    
    const fetchClassroom =() =>{
        navigate('/ClassroomTable')
    };
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Typography variant="h5" align="center">Dashboard</Typography>
            <Typography variant="h5" align="center">Role: {role}</Typography>
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
            <Typography variant="body1" align="center">The token is going to expire in 1 Hr</Typography>
            <Button 
                variant="contained"
                color="secondary"
                style={{ marginTop: '15px' }}
                onClick={sign}
                fullWidth
            >
                Create a new user
            </Button>

            <Button 
                variant="contained"
                color="secondary"
                style={{ marginTop: '15px' }}
                onClick={classroom}
                fullWidth
            >
                Create a classroom
            </Button>

            <Button 
                variant="contained"
                color="secondary"
                style={{ marginTop: '15px' }}
                onClick={fetchClassroom}
                fullWidth
            >
                Fetch all classroom
            </Button>
        </Container>
    );
}

export default PrincipalDashboard;
