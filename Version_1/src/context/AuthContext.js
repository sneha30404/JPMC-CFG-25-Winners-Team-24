import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is already logged in (from localStorage in a real app)
    useEffect(() => {
        const storedUser = localStorage.getItem('icecd_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (phone, role, callback) => {
        setIsLoading(true);
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Find user by phone and role
            const foundUser = mockUsers.find(u => u.phone === phone && u.role === role);
            if (foundUser) {
                setUser(foundUser);
                // Save to localStorage for persistence
                localStorage.setItem('icecd_user', JSON.stringify(foundUser));
                navigate('/dashboard');
                if (callback) callback(true);
            } else {
                if (callback) callback(false, 'User not found for this role. Please check the phone number and selected role.');
            }
            setIsLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('icecd_user');
        navigate('/');
    };

    const updateUserData = (updatedData) => {
        // This would be an API call in a real app
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('icecd_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUserData, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};