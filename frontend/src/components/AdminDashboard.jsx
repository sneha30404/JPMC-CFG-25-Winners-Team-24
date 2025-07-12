import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats } from '../api/api';
import '../styles/dashboard.css';

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
    
    const handleCreateChat = () => {
        // In a real app, this would open a modal for selecting trainees and graduates
        alert("Feature to create chat: Select a trainee and graduate from the lists and click a 'Create Chat' button. (This is a UI implementation task)");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button className="btn btn-danger" onClick={onLogout}>Logout</button>
            </div>
            
            <div className="card mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3>Trainee Overview</h3>
                    <Link to="/community" className="btn btn-primary">View Community Feed</Link>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Sector</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainees.map(trainee => (
                                <tr key={trainee.id}>
                                    <td>{trainee.first_name}</td>
                                    <td className="text-muted">{trainee.phone_number}</td>
                                    <td>{trainee.business_sector}</td>
                                    <td>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                                        </div>
                                        <span className="text-sm text-muted">50%</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card mb-6">
                <h3>Graduate Overview</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Sector</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {graduates.map(graduate => (
                                <tr key={graduate.id}>
                                    <td>{graduate.first_name}</td>
                                    <td className="text-muted">{graduate.phone_number}</td>
                                    <td>{graduate.business_sector}</td>
                                    <td>
                                        {graduate.has_success_tag ? (
                                            <span className="badge badge-success">Success Tag</span>
                                        ) : (
                                            <span className="text-muted">In Progress</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h3>Manage Group Chats</h3>
                    <button className="btn btn-primary" onClick={handleCreateChat}>
                        New Chat Group
                    </button>
                </div>
                {chats.length > 0 ? (
                    <ul className="list-group">
                        {chats.map(chat => (
                            <li key={chat.id} className="list-item">
                                <Link to={`/chat/${chat.id}`} className="flex items-center justify-between">
                                    <span>{chat.name}</span>
                                    <span className="text-muted text-sm">View Chat →</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-6 text-muted">
                        No group chats yet. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;