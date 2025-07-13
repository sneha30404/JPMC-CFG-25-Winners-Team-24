import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockChats as initialChats } from '../data/mockChats';
import { useAuth } from './AuthContext';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [chats, setChats] = useState(initialChats);
    const [activeChat, setActiveChat] = useState(null);

    // Load chats from localStorage if available
    useEffect(() => {
        const storedChats = localStorage.getItem('icecd_chats');
        if (storedChats) {
            setChats(JSON.parse(storedChats));
        }
    }, []);

    // Save chats to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('icecd_chats', JSON.stringify(chats));
    }, [chats]);

    // Get chats for the current user
    const getUserChats = () => {
        if (!user) return [];
        return chats.filter(chat => chat.members.includes(user.id));
    };

    // Get a specific chat by ID
    const getChatById = (chatId) => {
        return chats.find(chat => chat.id === chatId);
    };

    // Send a message in a chat
    const sendMessage = (chatId, text) => {
    if (!user) return;
    
    const newMessage = {
        id: `msg_${Date.now()}`,
        text,
        sender: user.name,
        senderId: user.id,
        timestamp: new Date().toISOString(),
    };
        
        const updatedChats = chats.map(chat => {
        if (chat.id === chatId) {
            return {
                ...chat,
                messages: [...chat.messages, newMessage]
            };
        }
        return chat;
    });
    
    // Update the state with the new array
    setChats([...updatedChats]);
};

    // Create a new chat group
    const createChat = (name, memberIds) => {
        if (!user) return null;
        
        // Ensure admin is always a member
        const members = memberIds.includes(user.id) ? 
            memberIds : [...memberIds, user.id];
        
        const newChat = {
            id: `chat_${Date.now()}`,
            name,
            members,
            messages: [{
                id: `msg_welcome_${Date.now()}`,
                text: `Welcome to the "${name}" group!`,
                sender: user.name,
                senderId: user.id,
                timestamp: new Date().toISOString(),
            }],
            createdAt: new Date().toISOString(),
        };
        
        setChats([...chats, newChat]);
        return newChat.id; // Return the new chat ID
    };

    return (
        <ChatContext.Provider value={{
            chats,
            activeChat,
            setActiveChat,
            getUserChats,
            getChatById,
            sendMessage,
            createChat
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};