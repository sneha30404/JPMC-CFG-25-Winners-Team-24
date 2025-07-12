import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats } from '../api/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ExitToApp as LogoutIcon,
  School as CourseIcon,
  CheckCircle as CheckCircleIcon,
  Share as ShareIcon,
  ArrowForward as ArrowForwardIcon,
  Message as MessageIcon
} from '@mui/icons-material';

function GraduateDashboard({ user, onLogout }) {
    const [refreshers, setRefreshers] = useState([]);
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const [dashboardRes, chatsRes] = await Promise.all([
                    getDashboardData(),
                    getUserChats()
                ]);
                setRefreshers(dashboardRes.data.refreshers || []);
                setChats(chatsRes.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

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
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Loading your dashboard...
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth={false} sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4 } }}>
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
                            Welcome, {user.first_name}!
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            color="text.secondary" 
                            sx={{ 
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                mb: { xs: 2, sm: 0 }
                            }}
                        >
                            Graduate Entrepreneur Dashboard
                        </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                        <Button
                            component={Link}
                            to="/chat"
                            variant="outlined"
                            color="primary"
                            size="large"
                            startIcon={<MessageIcon />}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                borderWidth: 2,
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    borderWidth: 2
                                }
                            }}
                        >
                            Messages
                        </Button>
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
                </Box>
            </Paper>

            {user.has_success_tag && (
                <Card 
                    sx={{ 
                        mb: 4,
                        borderLeft: '4px solid #10b981',
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)'
                    }}
                >
                    <CardContent>
                        <Box display="flex" alignItems="flex-start">
                            <CheckCircleIcon 
                                color="success" 
                                sx={{ 
                                    fontSize: 32, 
                                    mr: 2,
                                    mt: 0.5 
                                }} 
                            />
                            <Box>
                                <Typography 
                                    variant="h6" 
                                    color="success.dark"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    Success Tag Achieved!
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    color="success.dark"
                                    sx={{ opacity: 0.9, mb: 2 }}
                                >
                                    Congratulations on earning your Success Tag! Share your journey to inspire others.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ShareIcon />}
                                    size="small"
                                    sx={{ textTransform: 'none', fontWeight: 600 }}
                                >
                                    Share Your Story
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}

            <Grid container spacing={0}>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Card 
                        sx={{ 
                            height: '100%',
                            borderRadius: 0,
                            boxShadow: 'none',
                            border: 'none',
                            '&:hover': {
                                boxShadow: 'none'
                            },
                            transition: 'none'
                        }}
                    >
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Box 
                                display="flex" 
                                justifyContent="space-between" 
                                alignItems="center"
                                mb={3}
                                flexWrap="wrap"
                                gap={2}
                            >
                                <Typography 
                                    variant="h5" 
                                    component="h2"
                                    sx={{ 
                                        fontWeight: 600,
                                        color: 'primary.main',
                                        flex: 1,
                                        minWidth: 'fit-content'
                                    }}
                                >
                                    Skill Refreshers
                                </Typography>
                                <Button 
                                    component={Link}
                                    to="/community"
                                    variant="contained"
                                    color="primary"
                                    size={isMobile ? 'small' : 'medium'}
                                    sx={{ 
                                        textTransform: 'none', 
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Help Community
                                </Button>
                            </Box>
                            
                            {refreshers.length > 0 ? (
                                <List disablePadding>
                                    {refreshers.map((course, index) => (
                                        <React.Fragment key={course.id}>
                                            <ListItem 
                                                button 
                                                component={Link}
                                                to={`/course/${course.id}`}
                                                sx={{
                                                    borderRadius: 1,
                                                    mb: 1,
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover'
                                                    }
                                                }}
                                            >
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography 
                                                        variant="subtitle1" 
                                                        fontWeight={500}
                                                        color="text.primary"
                                                    >
                                                        {course.title}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary"
                                                        sx={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}
                                                    >
                                                        {course.description || 'No description available'}
                                                    </Typography>
                                                </Box>
                                                <ListItemSecondaryAction>
                                                    <IconButton 
                                                        edge="end" 
                                                        color="primary"
                                                        component={Link}
                                                        to={`/course/${course.id}`}
                                                    >
                                                        <ArrowForwardIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            {index < refreshers.length - 1 && <Divider component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Box 
                                    textAlign="center" 
                                    py={4}
                                    color="text.secondary"
                                >
                                    <Typography variant="body1">
                                        No refresher courses available at the moment.
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default GraduateDashboard;