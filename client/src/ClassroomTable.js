// ClassroomTable.js
import React, { useState } from 'react';
import { Container, Typography, CircularProgress, TextField, Button, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function ClassroomTable() {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleFetchClassrooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://class-room-application-mern.onrender.com/api/classrooms', {
                headers: { Authorization: `${token}` }
            });
            setClassrooms(response.data);
            setSnackbarMessage('Data fetched successfully!');
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to fetch classrooms');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'roomno', headerName: 'Room Number', width: 150 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'startTime', headerName: 'Start Time', width: 150 },
        { field: 'endTime', headerName: 'End Time', width: 150 },
        { field: 'daysInSession', headerName: 'Days in Session', width: 250 }
    ];

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Classroom List
            </Typography>
            <TextField
                label="Enter Token"
                variant="outlined"
                fullWidth
                margin="normal"
                value={token}
                onChange={handleTokenChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleFetchClassrooms}
                disabled={loading}
            >
                Fetch
            </Button>
            {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            {error && <Typography color="error">{error}</Typography>}
            {classrooms.length > 0 && (
                <div style={{ height: 600, width: '100%', marginTop: 20 }}>
                    <DataGrid
                        rows={classrooms.map((classroom) => ({
                            id: classroom._id,
                            ...classroom
                        }))}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
}

export default ClassroomTable;
