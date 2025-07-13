import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box, 
    Avatar, 
    IconButton, 
    Menu, 
    MenuItem,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import { 
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Forum as ForumIcon,
    Chat as ChatIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    ArrowDropDown as ArrowDropDownIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
    const { language, changeLanguage, t } = useLanguage();
    const { user, logout } = useAuth();
    const { getUserChats } = useChat();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    
    const userChats = getUserChats();
    const unreadCount = 2; // This would be dynamic in a real app

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationMenu = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const navItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Community', icon: <ForumIcon />, path: '/community' },
    ];
    
    
    if (userChats.length > 0) {
        navItems.push({ text: 'My Chats', icon: <ChatIcon />, path: `/chat/${userChats[0].id}` });
    }

    return (
        <>
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src="/icecd-logo.png" sx={{ mr: 1, width: 40, height: 40 }} />
                        <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            ICECD Community
                        </Typography>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }} />
                    
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                        {navItems.map((item) => (
                            <Button 
                                key={item.text} 
                                color="inherit" 
                                startIcon={item.icon}
                                onClick={() => navigate(item.path)}
                                sx={{ mx: 1 }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={handleNotificationMenu}>
                            <Badge badgeContent={unreadCount} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Menu
                            id="notification-menu"
                            anchorEl={notificationAnchorEl}
                            keepMounted
                            open={Boolean(notificationAnchorEl)}
                            onClose={handleNotificationClose}
                        >
                            <MenuItem onClick={handleNotificationClose}>
                                <Typography variant="body2">New message from Priya Singh</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleNotificationClose}>
                                <Typography variant="body2">Amit Verma shared a resource</Typography>
                            </MenuItem>
                        </Menu>
                        
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar 
                                src={user?.avatar || '/static/images/avatar/1.jpg'} 
                                sx={{ width: 32, height: 32 }}
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); logout(); }}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar src="/icecd-logo.png" sx={{ mr: 2 }} />
                        <Typography variant="h6">ICECD Community</Typography>
                    </Box>
                    <Divider />
                    <List>
                        {navItems.map((item) => (
                            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={logout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;