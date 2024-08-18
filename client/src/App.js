import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import PrincipalDashboard from './PrincipalDashboard';
import TeacherDashboard from './TeacherDashboard';

function App() {
    const role = localStorage.getItem('role');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Conditionally render routes based on role */}
                {role === 'principal' && (
                    <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
                )}
                {role === 'teacher' && (
                    <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
