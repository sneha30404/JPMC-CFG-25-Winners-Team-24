import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    Paper, 
    TextField, 
    Button, 
    Avatar, 
    IconButton, 
    Divider,
    CircularProgress,
    Container,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Grid
} from '@mui/material';
import {
    Send as SendIcon,
    ArrowBack as ArrowBackIcon,
    MoreVert as MoreVertIcon,
    AttachFile as AttachFileIcon,
    InsertEmoticon as EmojiIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { mockUsers } from '../data/mockUsers';

const ChatPage = () => {
    const { chatId } = useParams();
    const { user } = useAuth();
    const { getChatById, sendMessage } = useChat();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    
    // Get chat data on initial load
    useEffect(() => {
        const chatData = getChatById(chatId);
        if (chatData) {
            setChat(chatData);
        } else {
            // Chat not found or user not a member
            alert('Chat not found or you are not a member of this chat.');
            navigate('/dashboard');
        }
        setLoading(false);
    }, [chatId]);
    
    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat?.messages]);
    
    // Find the handleSendMessage function and update it:
const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
        // Send the message
        sendMessage(chatId, message);
        
        // Clear the input field
        setMessage('');
        
        // Important: Get the updated chat data directly and update state
        const updatedChat = getChatById(chatId);
        setChat(updatedChat);
        
        // Force a re-render by using a setTimeout
        setTimeout(() => {
            const freshChat = getChatById(chatId);
            setChat({...freshChat});
        }, 100);
    }
};
    
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };
    
    const getUserAvatar = (userId) => {
        const chatUser = mockUsers.find(u => u.id === userId);
        return chatUser?.avatar || null;
    };
    
    const getUserRole = (userId) => {
        const chatUser = mockUsers.find(u => u.id === userId);
        return chatUser?.role || '';
    };
    
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    
    if (!chat) {
        return (
            <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" gutterBottom>
                    Chat not found or you don't have access.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/dashboard')}
                    sx={{ mt: 2 }}
                >
                    Return to Dashboard
                </Button>
            </Container>
        );
    }
    
    // Group messages by date for better display
    const groupedMessages = chat.messages.reduce((groups, message) => {
        const date = new Date(message.timestamp).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {});

    return (
        <Box className="chat-container">
            {/* Chat Header */}
            <AppBar position="static" className="chat-header">
                <Toolbar variant="dense">
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        onClick={() => navigate('/dashboard')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                        <Avatar 
                            src="/icecd-logo.png" 
                            sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Box>
                            <Typography variant="h6">
                                {chat.name}
                            </Typography>
                            <Typography variant="caption">
                                {chat.members.length} participants
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            {/* Chat Messages */}
            <Box className="chat-messages">
                {Object.keys(groupedMessages).map(date => (
                    <Box key={date}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            my: 2 
                        }}>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    backgroundColor: 'rgba(0,0,0,0.1)', 
                                    px: 2, 
                                    py: 0.5, 
                                    borderRadius: 10 
                                }}
                            >
                                {formatDate(new Date(date))}
                            </Typography>
                        </Box>
                        
                        {groupedMessages[date].map((msg, index) => (
                            <Box 
                                key={msg.id || index}
                                sx={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.senderId === user.id ? 'flex-end' : 'flex-start',
                                    mb: 1.5
                                }}
                            >
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: msg.senderId === user.id ? 'row-reverse' : 'row',
                                    alignItems: 'flex-end',
                                    maxWidth: '80%'
                                }}>
                                    {msg.senderId !== user.id && (
                                        <Avatar 
                                            src={getUserAvatar(msg.senderId)} 
                                            sx={{ 
                                                width: 30, 
                                                height: 30, 
                                                ml: msg.senderId === user.id ? 1 : 0,
                                                mr: msg.senderId !== user.id ? 1 : 0
                                            }}
                                        />
                                    )}
                                    
                                    <Box sx={{ 
                                        bgcolor: msg.senderId === user.id ? '#dcf8c6' : 'white',
                                        borderRadius: msg.senderId === user.id ? '16px 0px 16px 16px' : '0px 16px 16px 16px',
                                        px: 2,
                                        py: 1,
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                    }}>
                                        {msg.senderId !== user.id && (
                                            <Typography 
                                                variant="caption" 
                                                color="primary" 
                                                sx={{ fontWeight: 'bold', display: 'block' }}
                                            >
                                                {msg.sender} ({getUserRole(msg.senderId)})
                                            </Typography>
                                        )}
                                        <Typography variant="body2">
                                            {msg.text}
                                        </Typography>
                                        <Typography 
                                            variant="caption" 
                                            color="text.secondary" 
                                            sx={{ 
                                                display: 'block', 
                                                textAlign: 'right', 
                                                mt: 0.5,
                                                fontSize: '0.7rem'
                                            }}
                                        >
                                            {formatTime(msg.timestamp)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>
            
            {/* Chat Input */}
            <Box 
                component="form" 
                onSubmit={handleSendMessage} 
                className="chat-input"
            >
                <IconButton color="primary" sx={{ mr: 1 }}>
                    <EmojiIcon />
                </IconButton>
                <IconButton color="primary" sx={{ mr: 1 }}>
                    <AttachFileIcon />
                </IconButton>
                <TextField
                    fullWidth
                    placeholder="Type a message"
                    variant="outlined"
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<SendIcon />}
                    type="submit"
                    disabled={!message.trim()}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatPage;