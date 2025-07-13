import React from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Avatar, 
    Badge, 
    Button,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChatPreview = ({ chat, hasUnread = false }) => {
    const navigate = useNavigate();
    
    const lastMessage = chat.messages[chat.messages.length - 1];
    const formattedTime = new Date(lastMessage.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Truncate message if it's too long
    const truncatedText = lastMessage.text.length > 50 
        ? `${lastMessage.text.substring(0, 50)}...` 
        : lastMessage.text;

    return (
        <Card 
            className="dashboard-card" 
            onClick={() => navigate(`/chat/${chat.id}`)}
            sx={{ 
                mb: 2, 
                cursor: 'pointer',
                backgroundColor: hasUnread ? '#f0f7ff' : 'white',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }
            }}
        >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="div">
                        {chat.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {formattedTime}
                    </Typography>
                </Box>
                
                <Divider sx={{ mb: 1.5 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                        alt={lastMessage.sender} 
                        src={`/images/avatars/avatar${Math.floor(Math.random() * 6) + 1}.jpg`}
                        sx={{ mr: 1.5, width: 36, height: 36 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" component="div">
                            {lastMessage.sender}
                        </Typography>
                        <Typography variant="body2" color={hasUnread ? "text.primary" : "text.secondary"}>
                            {truncatedText}
                        </Typography>
                    </Box>
                    {hasUnread && (
                        <Badge color="primary" badgeContent=" " variant="dot" sx={{ ml: 1 }} />
                    )}
                </Box>
                
                <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/chat/${chat.id}`);
                        }}
                    >
                        Open Chat
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ChatPreview;