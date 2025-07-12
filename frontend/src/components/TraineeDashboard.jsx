import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats, updateCourseProgress } from '../api/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  ExitToApp as LogoutIcon,
  School as CourseIcon,
  Forum as ChatIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Message as MessageIcon
} from '@mui/icons-material';
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    width: '100%',
                }}
            >
                <CircularProgress size={60} thickness={4} />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Loading your dashboard...
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
            <Paper 
                elevation={0} 
                sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    mb: { xs: 3, sm: 4 }, 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%)'
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2
                }}>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1
                            }}
                        >
                            Hello, {user.first_name}!
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            color="text.secondary" 
                            sx={{ 
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                mb: { xs: 2, sm: 0 }
                            }}
                        >
                            Welcome back to your learning journey
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={onLogout}
                        size="large"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2
                            }
                        }}
                    >
                        Sign Out
                    </Button>
                </Box>
            </Paper>

            {/* Progress Summary */}
            <Card 
                sx={{ 
                    mb: 4, 
                    borderRadius: 3,
                    boxShadow: '0 10px 30px rgba(25, 118, 210, 0.08)',
                    '&:hover': {
                        boxShadow: '0 15px 35px rgba(25, 118, 210, 0.12)'
                    },
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography 
                                variant="h5" 
                                component="h2" 
                                sx={{ 
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'primary.main'
                                }}
                            >
                                My Learning Progress
                            </Typography>
                            <Typography 
                                variant="body1" 
                                color="text.secondary"
                                sx={{ 
                                    fontSize: '0.95rem',
                                    opacity: 0.9
                                }}
                            >
                                Track your courses and achievements
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 2, 
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: { xs: 'stretch', md: 'flex-end' },
                                '& .MuiButton-root': {
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    boxShadow: '0 2px 10px rgba(25, 118, 210, 0.1)',
                                    '&:hover': {
                                        boxShadow: '0 4px 15px rgba(25, 118, 210, 0.2)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }
                            }}>
                                <Button
                                    component={Link}
                                    to="/community"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ChatIcon />}
                                    fullWidth={window.innerWidth < 600}
                                    sx={{
                                        background: 'linear-gradient(45deg, #1976d2 0%, #21CBF3 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1565c0 0%, #00B0FF 100%)',
                                        },
                                    }}
                                >
                                    Ask the Community
                                </Button>
                                <Button
                                    component={Link}
                                    to="/chat"
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<MessageIcon />}
                                    fullWidth={window.innerWidth < 600}
                                    sx={{
                                        borderWidth: 1.5,
                                        '&:hover': {
                                            borderWidth: 1.5,
                                            bgcolor: 'rgba(25, 118, 210, 0.04)'
                                        },
                                    }}
                                >
                                    Messages
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ 
                        mt: 4,
                        p: { xs: 2, sm: 3 },
                        bgcolor: 'rgba(25, 118, 210, 0.03)',
                        borderRadius: 2,
                        border: '1px solid rgba(25, 118, 210, 0.1)'
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 1.5 
                        }}>
                            <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 500 }}>
                                Overall Progress
                            </Typography>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'primary.main',
                                    minWidth: 45,
                                    textAlign: 'right'
                                }}
                            >
                                {calculateOverallProgress()}%
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={calculateOverallProgress()}
                            sx={{ 
                                height: 10, 
                                borderRadius: 5,
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                    borderRadius: 5
                                }
                            }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, fontSize: '0.75rem' }}>
                            {courses.length} {courses.length === 1 ? 'course' : 'courses'} in progress
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 5 }}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <Typography 
                                variant="h5" 
                                component="h2"
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'primary.main'
                                }}
                            >
                                My Courses
                            </Typography>
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    display: { xs: 'none', sm: 'block' },
                                    fontSize: '0.9rem'
                                }}
                            >
                                {courses.length} {courses.length === 1 ? 'course' : 'courses'} in total
                            </Typography>
                        </Box>
                        
                        <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                            {courses.map((course) => (
                                <Card 
                                    key={course.id}
                                    variant="outlined"
                                    sx={{
                                        mb: 2,
                                        borderRadius: 2,
                                        borderColor: 'rgba(0, 0, 0, 0.08)',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            borderColor: 'primary.light',
                                            boxShadow: '0 4px 20px rgba(25, 118, 210, 0.08)'
                                        },
                                        ...(progress[course.id] && {
                                            borderLeft: '3px solid',
                                            borderLeftColor: 'success.main',
                                            backgroundColor: 'rgba(76, 175, 80, 0.03)'
                                        })
                                    }}
                                >
                                    <ListItem
                                        component="div"
                                        sx={{
                                            py: 2,
                                            px: { xs: 2, sm: 3 },
                                            '& .MuiListItemSecondaryAction-root': {
                                                right: { xs: 16, sm: 24 }
                                            }
                                        }}
                                        secondaryAction={
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={!!progress[course.id]}
                                                        onChange={(e) => handleProgressChange(course.id, e.target.checked)}
                                                        icon={<RadioButtonUncheckedIcon />}
                                                        checkedIcon={
                                                            <CheckCircleIcon 
                                                                color="primary" 
                                                                sx={{ 
                                                                    width: 24, 
                                                                    height: 24,
                                                                    '&.Mui-checked': {
                                                                        color: 'success.main'
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        sx={{
                                                            '&:hover': { bgcolor: 'transparent' },
                                                            '&.Mui-checked': {
                                                                color: 'success.main'
                                                            }
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography 
                                                        variant="body2" 
                                                        color={progress[course.id] ? 'success.main' : 'text.secondary'}
                                                        sx={{
                                                            display: { xs: 'none', sm: 'block' },
                                                            fontWeight: progress[course.id] ? 600 : 400,
                                                            fontSize: '0.85rem'
                                                        }}
                                                    >
                                                        {progress[course.id] ? 'Completed' : 'Mark as complete'}
                                                    </Typography>
                                                }
                                                labelPlacement="start"
                                                sx={{ m: 0 }}
                                            />
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar 
                                                sx={{ 
                                                    bgcolor: progress[course.id] ? 'success.light' : 'primary.light',
                                                    color: progress[course.id] ? 'success.contrastText' : 'primary.contrastText',
                                                    width: 44,
                                                    height: 44,
                                                    mr: 2
                                                }}
                                            >
                                                <CourseIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography 
                                                    variant="subtitle1" 
                                                    sx={{ 
                                                        fontWeight: 600,
                                                        color: progress[course.id] ? 'success.dark' : 'text.primary',
                                                        textDecoration: progress[course.id] ? 'line-through' : 'none',
                                                        textDecorationColor: 'success.main',
                                                        opacity: progress[course.id] ? 0.8 : 1
                                                    }}
                                                >
                                                    {course.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center',
                                                    mt: 0.5
                                                }}>
                                                    <Box sx={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        bgcolor: progress[course.id] ? 'success.light' : 'action.selected',
                                                        color: progress[course.id] ? 'success.dark' : 'text.secondary',
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontSize: '0.7rem',
                                                        fontWeight: 600,
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {course.lessons_count} {course.lessons_count === 1 ? 'lesson' : 'lessons'}
                                                    </Box>
                                                    {progress[course.id] && (
                                                        <Box 
                                                            component="span"
                                                            sx={{
                                                                ml: 1.5,
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                color: 'success.main',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            <CheckCircleIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                                                            Completed
                                                        </Box>
                                                    )}
                                                </Box>
                                            }
                                            sx={{ my: 0 }}
                                        />
                                    </ListItem>
                                </Card>
                            ))}
                            
                            {courses.length === 0 && (
                                <Box sx={{ 
                                    textAlign: 'center', 
                                    py: 4,
                                    px: 2
                                }}>
                                    <SchoolIcon sx={{ fontSize: 48, color: 'action.disabled', mb: 1.5 }} />
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                        No courses assigned yet
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8, mb: 2 }}>
                                        Your assigned courses will appear here
                                    </Typography>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    >
                                        Browse Courses
                                    </Button>
                                </Box>
                            )}
                        </List>
                    </Box>
                </CardContent>
            </Card>

            {/* Recent Chats */}
            {chats.length > 0 && (
                <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Recent Chats
                        </Typography>
                        <List>
                            {chats.slice(0, 3).map((chat) => (
                                <ListItem
                                    key={chat.id}
                                    button
                                    component={Link}
                                    to={`/chat/${chat.id}`}
                                    divider
                                >
                                    <ListItemText
                                        primary={chat.title}
                                        secondary={`Last message: ${new Date(chat.last_message_at).toLocaleString()}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        {chats.length > 3 && (
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Button
                                    component={Link}
                                    to="/chats"
                                    color="primary"
                                    variant="text"
                                >
                                    View All Chats
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}

export default TraineeDashboard;