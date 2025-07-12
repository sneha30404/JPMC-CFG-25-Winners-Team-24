// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TraineeDashboard from './components/TraineeDashboard.jsx';
import GraduateDashboard from './components/GraduateDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import GroupChatPage from './pages/GroupChatPage.jsx';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Persist user login across page reloads
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogin = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('access_token', userData.access);
        localStorage.setItem('refresh_token', userData.refresh);
        setUser(userData.user);
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    const MainDashboard = () => {
        if (!user) return <Navigate to="/" />;
        switch (user.role) {
            case 'admin':
                return <AdminDashboard user={user} onLogout={handleLogout} />;
            case 'trainee':
                return <TraineeDashboard user={user} onLogout={handleLogout} />;
            case 'graduate':
                return <GraduateDashboard user={user} onLogout={handleLogout} />;
            default:
                return <Navigate to="/" />;
        }
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={<MainDashboard />} />
                    <Route path="/community" element={user ? <CommunityPage user={user} /> : <Navigate to="/login" />} />
                    <Route path="/chat/:chatId" element={user ? <GroupChatPage user={user} /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;