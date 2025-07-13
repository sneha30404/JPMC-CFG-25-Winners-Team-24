import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers as initialUsers } from '../data/mockUsers';
import { mockCourses as initialCourses } from '../data/mockCourses';
import { mockCommunityPosts as initialPosts } from '../data/mockCommunity';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [users, setUsers] = useState(initialUsers);
    const [courses, setCourses] = useState(initialCourses);
    const [communityPosts, setCommunityPosts] = useState(initialPosts);
    const [userProgress, setUserProgress] = useState({});

    // Load user progress from localStorage
    useEffect(() => {
        if (user) {
            const storedProgress = localStorage.getItem(`progress_${user.id}`);
            if (storedProgress) {
                setUserProgress(JSON.parse(storedProgress));
            } else {
                // Initialize progress for this user
                const newProgress = {};
                if (user.role === 'trainee') {
                    courses.trainee.forEach(course => {
                        newProgress[course.id] = false;
                    });
                    // Mark courses as completed based on user's courseProgress
                    for (let i = 0; i < user.courseProgress; i++) {
                        newProgress[courses.trainee[i].id] = true;
                    }
                } else if (user.role === 'graduate') {
                    courses.refresher.forEach(course => {
                        newProgress[course.id] = false;
                    });
                }
                setUserProgress(newProgress);
                localStorage.setItem(`progress_${user.id}`, JSON.stringify(newProgress));
            }
        }
    }, [user, courses]);

    // Update user progress
    const updateProgress = (courseId, completed) => {
        if (user) {
            const newProgress = { ...userProgress, [courseId]: completed };
            setUserProgress(newProgress);
            localStorage.setItem(`progress_${user.id}`, JSON.stringify(newProgress));
            
            // Update courseProgress count for trainees
            if (user.role === 'trainee') {
                const completedCount = Object.values(newProgress).filter(Boolean).length;
                const updatedUsers = users.map(u => 
                    u.id === user.id ? { ...u, courseProgress: completedCount } : u
                );
                setUsers(updatedUsers);
            }
        }
    };

    // Add a new community post
    const addCommunityPost = (newPost) => {
        const postWithId = {
            ...newPost,
            id: communityPosts.length + 1,
            authorName: user.name,
            authorRole: user.role,
        };
        const updatedPosts = [postWithId, ...communityPosts];
        setCommunityPosts(updatedPosts);
    };

    // Update user data (e.g., adding success story, tags, etc.)
    const updateUserData = (userId, updatedData) => {
        const updatedUsers = users.map(u => 
            u.id === userId ? { ...u, ...updatedData } : u
        );
        setUsers(updatedUsers);
    };

    // Award success tag to a graduate
    const awardSuccessTag = (userId) => {
        const updatedUsers = users.map(u => {
            if (u.id === userId) {
                // Add success tag if not already present
                const tags = u.tags.includes('Success') ? u.tags : [...u.tags, 'Success'];
                return { ...u, tags };
            }
            return u;
        });
        setUsers(updatedUsers);
    };

    // Add a mentoring relationship
    const addMentoringRelationship = (graduateId, traineeId) => {
        const updatedUsers = users.map(u => {
            if (u.id === graduateId) {
                const mentoring = Array.isArray(u.mentoring) ? 
                    (u.mentoring.includes(traineeId) ? u.mentoring : [...u.mentoring, traineeId]) : 
                    [traineeId];
                return { ...u, mentoring };
            }
            if (u.id === traineeId) {
                return { ...u, assignedMentorId: graduateId };
            }
            return u;
        });
        setUsers(updatedUsers);
    };

    return (
        <DataContext.Provider value={{
            users,
            courses,
            communityPosts,
            userProgress,
            updateProgress,
            addCommunityPost,
            updateUserData,
            awardSuccessTag,
            addMentoringRelationship
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};