import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats, updateCourseProgress } from '../api/api';
import '../styles/dashboard.css';

function TraineeDashboard({ user, onLogout }) {
    const [courses, setCourses] = useState([]);
    const [progress, setProgress] = useState({});
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const [dashboardRes, chatsRes] = await Promise.all([
                    getDashboardData(),
                    getUserChats()
                ]);
                
                setCourses(dashboardRes.data.courses);
                const progressMap = dashboardRes.data.progress.reduce((acc, p) => {
                    acc[p.course.id] = p.completed;
                    return acc;
                }, {});
                setProgress(progressMap);
                setChats(chatsRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleProgressChange = async (courseId, isChecked) => {
        try {
            setProgress(prev => ({ ...prev, [courseId]: isChecked }));
            await updateCourseProgress(courseId, isChecked);
        } catch (error) {
            console.error('Error updating progress:', error);
            // Revert on error
            setProgress(prev => ({ ...prev, [courseId]: !isChecked }));
        }
    };

    const calculateOverallProgress = () => {
        if (courses.length === 0) return 0;
        const completed = Object.values(progress).filter(Boolean).length;
        return Math.round((completed / courses.length) * 100);
    };

    if (isLoading) {
        return (
            <div className="dashboard-container flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Hello, {user.first_name}!</h1>
                    <p className="text-muted">Your Learning Journey</p>
                </div>
                <button className="btn btn-danger" onClick={onLogout}>Logout</button>
            </div>

            {/* Progress Summary */}
            <div className="card mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h3>My Learning Progress</h3>
                        <p className="text-muted">Track your courses and achievements</p>
                    </div>
                    <Link to="/community" className="btn btn-primary mt-2 md:mt-0">Ask the Community</Link>
                </div>
                
                <div className="mb-6">
                    <div className="flex justify-between mb-1">
                        <span className="font-medium">Overall Progress</span>
                        <span className="font-medium">{calculateOverallProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${calculateOverallProgress()}%` }}
                        ></div>
                    </div>
                </div>

                <div className="space-y-4">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <div 
                                key={course.id} 
                                className={`p-4 border rounded-lg transition-all duration-200 ${
                                    progress[course.id] ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                                }`}
                            >
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id={`course-${course.id}`}
                                            type="checkbox"
                                            checked={!!progress[course.id]}
                                            onChange={(e) => handleProgressChange(course.id, e.target.checked)}
                                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <label 
                                            htmlFor={`course-${course.id}`}
                                            className="block text-sm font-medium text-gray-700 cursor-pointer"
                                        >
                                            {course.title}
                                        </label>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {course.description || 'No description available'}
                                        </p>
                                    </div>
                                    {progress[course.id] && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Completed
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted">
                            <p>No courses assigned yet. Check back later or contact support.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Group Chats */}
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h3>My Group Chats</h3>
                    <button className="btn btn-primary">
                        New Chat
                    </button>
                </div>
                
                {chats.length > 0 ? (
                    <ul className="list-group">
                        {chats.map(chat => (
                            <li key={chat.id} className="list-item">
                                <Link to={`/chat/${chat.id}`} className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">{chat.name}</h4>
                                        <p className="text-sm text-muted">Last message: {new Date().toLocaleDateString()}</p>
                                    </div>
                                    <span className="text-muted text-sm">Open →</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-muted">
                        <p>You're not part of any group chats yet.</p>
                        <button className="mt-3 btn btn-primary">Join a Chat</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TraineeDashboard;