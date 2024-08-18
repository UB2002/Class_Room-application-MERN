import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import PrincipalDashboard from './PrincipalDashboard';
import Signup from './Signup';
import Classroom from './Classroom';
import ClassroomTable from './ClassroomTable';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/PrincipalDashboard" element={<PrincipalDashboard />} />
                <Route path="/Signup" element={<Signup/>} />
                <Route path="/Classroom" element={<Classroom/>} />
                <Route path="/ClassroomTable" element={<ClassroomTable/>} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
