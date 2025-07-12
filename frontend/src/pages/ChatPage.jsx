import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserChats, getChatMessages, postChatMessage } from '../api/api';
import {
  Box,
  Grid,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import ChatList from '../components/ChatList';

function ChatPage({ user }) {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatList, setShowChatList] = useState(true);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
      if (window.innerWidth >= 900) {
        setShowChatList(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getUserChats();
        setChats(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setIsLoading(false);
      }
    };
    fetchChats();
  }, []);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const response = await getChatMessages(chatId);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;
    
    try {
      const { data } = await postChatMessage(chatId, newMessage);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChatSelect = (chatId) => {
    navigate(`/chat/${chatId}`);
    if (isMobileView) {
      setShowChatList(false);
    }
  };

  const selectedChat = chats.find(chat => chat.id === chatId);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Chat List */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{
            display: { xs: showChatList ? 'block' : 'none', md: 'block' },
            height: '100%',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          <ChatList 
            user={user} 
            chats={chats} 
            onSelectChat={handleChatSelect} 
          />
        </Grid>

        {/* Chat Area */}
        <Grid 
          item 
          xs={12} 
          md={8} 
          sx={{
            display: { xs: !showChatList ? 'flex' : 'none', md: 'flex' },
            flexDirection: 'column',
            height: '100%',
            position: 'relative'
          }}
        >
          {chatId ? (
            <>
              {/* Chat Header */}
              <Box 
                sx={{
                  p: 2,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'background.paper',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
                }}
              >
                {isMobileView && (
                  <IconButton 
                    onClick={() => setShowChatList(true)}
                    sx={{ mr: 1 }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
                <Avatar sx={{ mr: 2 }}>
                  {selectedChat?.is_group ? <GroupIcon /> : <ChatIcon />}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {selectedChat?.name || 'Chat'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedChat?.is_group 
                      ? `${selectedChat.member_count} members` 
                      : 'Online'}
                  </Typography>
                </Box>
              </Box>

              {/* Messages */}
              <Box 
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  bgcolor: '#f5f5f5',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                }}
              >
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === user.id ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: message.sender === user.id ? 'primary.light' : 'background.paper',
                        color: message.sender === user.id ? 'primary.contrastText' : 'text.primary',
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="body2">
                        {message.content}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{
                          display: 'block',
                          textAlign: 'right',
                          mt: 0.5,
                          opacity: 0.7,
                          color: message.sender === user.id ? 'primary.contrastText' : 'text.secondary',
                        }}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box 
                component="form" 
                onSubmit={handleSendMessage}
                sx={{
                  p: 2,
                  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: 'background.paper',
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        pr: 1,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton 
                          type="submit" 
                          color="primary"
                          disabled={!newMessage.trim()}
                        >
                          <SendIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                p: 3,
              }}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4210/4210903.png" 
                alt="Select a chat" 
                style={{ width: '200px', opacity: 0.5, marginBottom: '20px' }}
              />
              <Typography variant="h6" color="text.secondary">
                Select a chat to start messaging
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Or start a new conversation
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatPage;
