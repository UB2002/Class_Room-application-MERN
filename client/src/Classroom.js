// Classroom.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

function Classroom() {
    const [roomno, setRoomno] = useState('');
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daysInSession, setDaysInSession] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [token, setToken] = useState('');

    const handleCreateClassroom = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://class-room-application-mern.onrender.com/api/classrooms', { roomno, name, startTime, endTime, daysInSession }, {
                headers: { Authorization: `${token}` }
            });
            setRoomno('');
            setName('');
            setStartTime('');
            setEndTime('');
            setDaysInSession([]);
            setSnackbarMessage('Classroom created successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error creating classroom', error);
            setSnackbarMessage('Error creating classroom.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Typography variant="h5">Create Classroom</Typography>
            <form onSubmit={handleCreateClassroom}>
                <TextField
                    label="Room Number"
                    type="number"
                    value={roomno}
                    onChange={(e) => setRoomno(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Start Time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="End Time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Days in Session (comma separated)"
                    value={daysInSession.join(', ')}
                    onChange={(e) => setDaysInSession(e.target.value.split(',').map(day => day.trim()))}
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
                    Create Classroom
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Classroom;
