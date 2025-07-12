import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats } from '../api/api';

function GraduateDashboard({ user, onLogout }) {
    const [refreshers, setRefreshers] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getDashboardData().then(res => setRefreshers(res.data.refreshers));
        getUserChats().then(res => setChats(res.data));
    }, []);

    return (
        <div className="container">
            <div className="dashboard-header">
                <h1>Welcome, {user.first_name}! (Graduate Entrepreneur)</h1>
                <button onClick={onLogout}>Logout</button>
            </div>

            {user.has_success_tag && (
                <div className="card" style={{ backgroundColor: '#d4edda' }}>
                    <h3>Congratulations! You've achieved the Success Tag!</h3>
                    <button>Share Your Success Story</button>
                </div>
            )}
            
            <Link to="/community" className="community-btn">Help the Community</Link>

            <div className="card">
                <h3>Skill Refreshers</h3>
                {refreshers.map(course => (
                    <div key={course.id}>{course.title}</div>
                ))}
            </div>

            <div className="card">
                <h3>My Mentorship Groups</h3>
                 <ul>
                    {chats.map(chat => (
                        <li key={chat.id}>
                            <Link to={`/chat/${chat.id}`}>{chat.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GraduateDashboard;