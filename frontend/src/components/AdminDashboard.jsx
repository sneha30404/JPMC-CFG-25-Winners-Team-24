import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData, getUserChats, promoteUser } from '../api/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  CircularProgress,
  Avatar,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Link as MuiLink
} from '@mui/material';
import {
  ExitToApp as LogoutIcon,
  Group as GroupIcon,
  Chat as ChatIcon,
  Message as MessageIcon,
  School as SchoolIcon,
  Add as AddIcon
} from '@mui/icons-material';

function AdminDashboard({ user, onLogout }) {
    const [trainees, setTrainees] = useState([]);
    const [graduates, setGraduates] = useState([]);
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dashboardRes, chatsRes] = await Promise.all([
                    getDashboardData(),
                    getUserChats()
                ]);
                setTrainees(dashboardRes.data.trainees || []);
                setGraduates(dashboardRes.data.graduates || []);
                setChats(chatsRes.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

  const handleCreateChat = () => {
    // In a real app, this would open a modal for selecting trainees and graduates
    alert("Feature to create chat: Select a trainee and graduate from the lists and click a 'Create Chat' button. (This is a UI implementation task)");
  };

  const handlePromote = async (userId) => {
    try {
      await promoteUser(userId);
      alert('User has been successfully promoted to Graduate!');
      // Refresh the dashboard data
      const [dashboardRes] = await Promise.all([
        getDashboardData(),
        getUserChats()
      ]);
      setTrainees(dashboardRes.data.trainees || []);
      setGraduates(dashboardRes.data.graduates || []);
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Failed to promote user. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
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
                Admin Dashboard
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  mb: { xs: 2, sm: 0 }
                }}
              >
                Manage trainees, graduates, and group chats
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              <Button
                component={Link}
                to="/chat"
                variant="contained"
                color="primary"
                startIcon={<MessageIcon />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: '0 2px 10px rgba(25, 118, 210, 0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 15px rgba(25, 118, 210, 0.2)'
                  },
                  transition: 'all 0.2s ease-in-out'
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
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderWidth: 1.5,
                  '&:hover': {
                    borderWidth: 1.5,
                    bgcolor: 'rgba(244, 67, 54, 0.04)'
                  },
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Trainee Overview */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Trainee Overview
              </Typography>
              <Button 
                component={Link}
                to="/community"
                variant="outlined"
                size="small"
                startIcon={<ChatIcon />}
                sx={{ textTransform: 'none' }}
              >
                View Community Feed
              </Button>
            </Box>
            
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Sector</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Progress</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainees.map(trainee => (
                    <TableRow key={trainee.id} hover>
                      <TableCell>{trainee.first_name} {trainee.last_name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{trainee.phone_number || 'N/A'}</TableCell>
                      <TableCell>{trainee.business_sector || 'N/A'}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ width: '100%', maxWidth: 150 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={trainee.progress || 0} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 2,
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 2,
                                  background: 'linear-gradient(90deg, #1976d2 0%, #21CBF3 100%)',
                                }
                              }} 
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
                            {trainee.progress || 0}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleViewProfile(trainee.id)}
                        >
                          View Profile
                        </Button>
                        {trainee.progress === 100 && (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handlePromote(trainee.id)}
                            sx={{ ml: 1 }}
                          >
                            Promote
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Graduate Overview */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Graduate Overview
              </Typography>
            </Box>
            
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Sector</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {graduates.map(graduate => (
                    <TableRow key={graduate.id} hover>
                      <TableCell>{graduate.first_name} {graduate.last_name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{graduate.phone_number || 'N/A'}</TableCell>
                      <TableCell>{graduate.business_sector || 'N/A'}</TableCell>
                      <TableCell>
                        {graduate.has_success_tag ? (
                          <Chip 
                            label="Success Tag" 
                            color="success" 
                            size="small"
                            sx={{ fontWeight: 500, px: 0.5 }}
                          />
                        ) : (
                          <Chip 
                            label="In Progress" 
                            variant="outlined"
                            size="small"
                            sx={{ color: 'text.secondary', borderColor: 'text.disabled' }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Group Chats */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Manage Group Chats
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={handleCreateChat}
                sx={{ textTransform: 'none' }}
              >
                New Chat Group
              </Button>
            </Box>
            
            {chats.length > 0 ? (
              <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                {chats.map(chat => (
                  <Card 
                    key={chat.id} 
                    variant="outlined" 
                    sx={{ 
                      mb: 2, 
                      borderRadius: 2,
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: 'primary.light',
                        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.08)'
                      }
                    }}
                    component={Link}
                    to={`/chat/${chat.id}`}
                  >
                    <ListItem sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                          <GroupIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {chat.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {chat.member_count || 0} members • Last active: {new Date().toLocaleDateString()}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 500, mr: 1 }}>
                          View Chat
                        </Typography>
                        <Box sx={{ color: 'primary.main' }}>→</Box>
                      </Box>
                    </ListItem>
                  </Card>
                ))}
              </List>
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 6, 
                px: 2,
                bgcolor: 'rgba(0, 0, 0, 0.01)',
                borderRadius: 2
              }}>
                <GroupIcon sx={{ fontSize: 48, color: 'action.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No group chats yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                  Create your first group chat to start connecting trainees and graduates.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleCreateChat}
                  sx={{ textTransform: 'none' }}
                >
                  Create Chat Group
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    );
}

export default AdminDashboard;