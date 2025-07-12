import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats, updateCourseProgress } from '../api/api';

function TraineeDashboard({ user, onLogout }) {
    const [courses, setCourses] = useState([]);
    const [progress, setProgress] = useState({});
    const [chats, setChats] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const dashboardRes = await getDashboardData();
            setCourses(dashboardRes.data.courses);
            const progressMap = dashboardRes.data.progress.reduce((acc, p) => {
                acc[p.course.id] = p.completed;
                return acc;
            }, {});
            setProgress(progressMap);

            const chatsRes = await getUserChats();
            setChats(chatsRes.data);
        }
        fetchData();
    }, []);

    const handleProgressChange = async (courseId, isChecked) => {
        setProgress({ ...progress, [courseId]: isChecked });
        await updateCourseProgress(courseId, isChecked);
    };

    return (
        <div className="container">
            <div className="dashboard-header">
                <h1>Welcome, {user.first_name}! (Trainee)</h1>
                <button onClick={onLogout}>Logout</button>
            </div>
            
            <Link to="/community" className="community-btn">Ask the Community</Link>

            <div className="card">
                <h3>My Learning Path</h3>
                {courses.map(course => (
                    <div key={course.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!progress[course.id]}
                                onChange={(e) => handleProgressChange(course.id, e.target.checked)}
                            />
                            {course.title} - <em>{course.description}</em>
                        </label>
                    </div>
                ))}
            </div>

            <div className="card">
                <h3>My Group Chats</h3>
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

export default TraineeDashboard;