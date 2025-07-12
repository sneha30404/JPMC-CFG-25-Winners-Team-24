import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats } from '../api/api';

function AdminDashboard({ user, onLogout }) {
    const [trainees, setTrainees] = useState([]);
    const [graduates, setGraduates] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getDashboardData().then(res => {
            setTrainees(res.data.trainees);
            setGraduates(res.data.graduates);
        });
        getUserChats().then(res => setChats(res.data));
    }, []);
    
    // In a real app, this would be a modal form.
    const handleCreateChat = () => {
        alert("Feature to create chat: Select a trainee and graduate from the lists and click a 'Create Chat' button. (This is a UI implementation task)");
    };

    return (
        <div className="container">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button onClick={onLogout}>Logout</button>
            </div>
            
            <Link to="/community" className="community-btn">View Community Feed</Link>

            <div className="card">
                <h3>Trainee Overview</h3>
                <table border="1" width="100%">
                    <thead><tr><th>Name</th><th>Phone</th><th>Sector</th><th>Progress (Placeholder)</th></tr></thead>
                    <tbody>
                        {trainees.map(t => <tr key={t.id}><td>{t.first_name}</td><td>{t.phone_number}</td><td>{t.business_sector}</td><td>50%</td></tr>)}
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h3>Graduate Overview</h3>
                <table border="1" width="100%">
                    <thead><tr><th>Name</th><th>Phone</th><th>Sector</th><th>Success Tag?</th></tr></thead>
                    <tbody>
                        {graduates.map(g => <tr key={g.id}><td>{g.first_name}</td><td>{g.phone_number}</td><td>{g.business_sector}</td><td>{g.has_success_tag ? 'Yes' : 'No'}</td></tr>)}
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h3>Manage Group Chats</h3>
                <button onClick={handleCreateChat}>Create New Chat Group</button>
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

export default AdminDashboard;