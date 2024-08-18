
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (role === 'Principal') {
            navigate('/PrincipalDashboard');
        }
    }, [role, navigate]);

    if (role === 'Teacher') {
        return <h1>Teacher Dashboard</h1>;
    }

    return <div>No access</div>;
};

export default Dashboard;


/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    if (role === 'Principal') {
        navigate('/PrincipalDashboard');
        return null; // Prevent rendering while redirecting
    }

    if (role === 'Teacher') {
        return <h1>Teacher Dashboard</h1>;
    }

    return <div>No access</div>;
};

export default Dashboard;
*/