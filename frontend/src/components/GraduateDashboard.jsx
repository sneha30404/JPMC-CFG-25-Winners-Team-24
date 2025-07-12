import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats } from '../api/api';
import '../styles/dashboard.css';

function GraduateDashboard({ user, onLogout }) {
    const [refreshers, setRefreshers] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getDashboardData().then(res => setRefreshers(res.data.refreshers));
        getUserChats().then(res => setChats(res.data));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome back, {user.first_name}!</h1>
                    <p className="text-muted">Graduate Entrepreneur Dashboard</p>
                </div>
                <button className="btn btn-danger" onClick={onLogout}>Logout</button>
            </div>

            {user.has_success_tag && (
                <div className="card mb-6" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-green-800 font-medium">Success Tag Achieved!</h3>
                            <p className="text-green-700 text-sm mt-1">
                                Congratulations on earning your Success Tag! Share your journey to inspire others.
                            </p>
                            <button className="mt-2 btn btn-primary">
                                Share Your Story
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h3>Skill Refreshers</h3>
                        <Link to="/community" className="btn btn-primary">Help Community</Link>
                    </div>
                    
                    {refreshers.length > 0 ? (
                        <ul className="list-group">
                            {refreshers.map(course => (
                                <li key={course.id} className="list-item">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">{course.title}</h4>
                                            <p className="text-sm text-muted">{course.description || 'No description available'}</p>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            Start →
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-6 text-muted">
                            <p>No refresher courses available at the moment.</p>
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h3>My Mentorship Groups</h3>
                        <button className="btn btn-primary">
                            New Group
                        </button>
                    </div>
                    
                    {chats.length > 0 ? (
                        <ul className="list-group">
                            {chats.map(chat => (
                                <li key={chat.id} className="list-item">
                                    <Link to={`/chat/${chat.id}`} className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">{chat.name}</h4>
                                            <p className="text-sm text-muted">Last active: {new Date().toLocaleDateString()}</p>
                                        </div>
                                        <span className="text-muted text-sm">View →</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-6 text-muted">
                            <p>You're not part of any mentorship groups yet.</p>
                            <button className="mt-2 btn btn-primary">Join a Group</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="card">
                <h3>Your Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-muted">Mentees Helped</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">24</div>
                        <div className="text-sm text-muted">Community Posts</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">8.9</div>
                        <div className="text-sm text-muted">Average Rating</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GraduateDashboard;