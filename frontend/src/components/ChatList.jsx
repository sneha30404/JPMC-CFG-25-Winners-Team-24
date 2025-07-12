import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Box
} from '@mui/material';
import {
  Search as SearchIcon,
  Group as GroupIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

function ChatList({ user, chats = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.last_message?.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchTerm, chats]);

  return (
    <Paper elevation={0} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%',
      minWidth: 0, // Prevents flex items from overflowing
      overflow: 'hidden' 
    }}>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <Typography variant="h6" component="div">Chats</Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search chats"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <List sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        width: '100%',
        p: 0,
        minWidth: 0, // Prevents flex items from overflowing
        '& .MuiListItem-root': {
          px: 2,
          width: '100%',
          boxSizing: 'border-box',
          maxWidth: '100%'
        }
      }}>
        {filteredChats.map((chat) => (
          <ListItem
            button
            key={chat.id}
            component={Link}
            to={`/chat/${chat.id}`}
            sx={{
              '&:hover': { backgroundColor: 'action.hover' },
              borderLeft: (theme) => `3px solid ${chat.unread_count > 0 ? theme.palette.primary.main : 'transparent'}`,
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              pr: 1
            }}
          >
            <ListItemAvatar>
              <Badge
                color="primary"
                badgeContent={chat.unread_count > 0 ? chat.unread_count : null}
                max={99}
              >
                <Avatar>
                  {chat.is_group ? <GroupIcon /> : <ChatIcon />}
                </Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={chat.name}
              primaryTypographyProps={{
                fontWeight: chat.unread_count > 0 ? 'bold' : 'normal'
              }}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: chat.unread_count > 0 ? 'bold' : 'normal'
                    }}
                  >
                    {chat.last_message?.sender_name}: {chat.last_message?.content}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'nowrap',
                      fontWeight: chat.unread_count > 0 ? 'bold' : 'normal'
                    }}
                  >
                    {new Date(chat.last_message?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </>
              }
              secondaryTypographyProps={{ component: 'div' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ChatList;
