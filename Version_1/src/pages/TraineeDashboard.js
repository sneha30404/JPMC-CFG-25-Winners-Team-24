import React, { useState } from 'react';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { 
    Box, 
    Typography, 
    Grid, 
    Paper, 
    Container, 
    Button, 
    Divider, 
    Tabs, 
    Tab
} from '@mui/material';
import {
    School as SchoolIcon,
    Chat as ChatIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useChat } from '../context/ChatContext';
import CourseCard from '../components/dashboard/CourseCard';
import ChatPreview from '../components/dashboard/ChatPreview';
import ProgressCircle from '../components/dashboard/ProgressCircle';
import StatCard from '../components/dashboard/StatCard';

const TraineeDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const { courses, userProgress, updateProgress } = useData();
    const { getUserChats } = useChat();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    
    const userChats = getUserChats();
    const completedCourses = Object.values(userProgress).filter(Boolean).length;
    const progressPercentage = (completedCourses / courses.trainee.length) * 100;
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    
    const toggleChatbot = () => {
  setIsOpen(!isOpen);
};
    const getMentorName = () => {
    if (!user.assignedMentorId) return 'Not assigned yet';
    
    // Import the mockUsers array directly
    const { mockUsers } = require('../data/mockUsers');
    
    // Find the mentor in the mockUsers array
    const mentor = mockUsers.find(u => u.id === user.assignedMentorId);
    return mentor ? mentor.name : 'Unknown';
};

    return (
        <Container maxWidth="lg">
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Welcome, {user.name}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Your Business Sector: <b>{user.tags.join(', ')}</b> | Mentor: <b>{getMentorName()}</b>
                </Typography>
            </Box>
            
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard 
                        title="Course Progress" 
                        value={`${completedCourses}/${courses.trainee.length}`}
                        icon={<SchoolIcon />}
                        color="primary"
                        subtext={`${Math.round(progressPercentage)}% complete`}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard 
                        title="Mentor Groups" 
                        value={userChats.length}
                        icon={<ChatIcon />}
                        color="secondary"
                        subtext="Active mentorship connections"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard 
                        title="Days in Program" 
                        value={calculateDaysInProgram(user.joinDate)}
                        icon={<TrendingUpIcon />}
                        color="success"
                        subtext="Keep going strong!"
                    />
                </Grid>
            </Grid>
            
            {/* Main Content with Tabs */}
            <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange} 
                        aria-label="dashboard tabs"
                        variant="fullWidth"
                    >
                        <Tab label="My Learning Path" />
                        <Tab label="My Mentor Groups" />
                    </Tabs>
                </Box>
                
                {/* Learning Path Tab */}
                <Box sx={{ p: 3, display: tabValue === 0 ? 'block' : 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <ProgressCircle 
                            value={progressPercentage} 
                            size={120} 
                            thickness={5}
                            label="Overall Progress"
                        />
                        <Box sx={{ ml: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Your Learning Journey
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Track your progress through essential business skills modules. Mark courses as complete when you finish them.
                            </Typography>
                            <Button 
                                variant="outlined" 
                                size="small"
                            >
                                Download Resources
                            </Button>
                        </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 4 }} />
                    
                    <Grid container spacing={3}>
                        {courses.trainee.map((course) => (
                            <Grid item xs={12} sm={6} md={4} key={course.id}>
                                <CourseCard 
                                    course={course}
                                    isCompleted={userProgress[course.id] || false}
                                    onToggleComplete={updateProgress}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                
                {/* Mentor Groups Tab */}
                <Box sx={{ p: 3, display: tabValue === 1 ? 'block' : 'none' }}>
                    {userChats.length > 0 ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Your Mentor Connections
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                These are your personalized mentorship groups. Click on any chat to continue your conversation.
                            </Typography>
                            <Grid container spacing={3}>
                                {userChats.map((chat) => (
                                    <Grid item xs={12} sm={6} key={chat.id}>
                                        <ChatPreview 
                                            chat={chat} 
                                            hasUnread={Math.random() > 0.7} // Simulated unread messages
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                No mentor groups yet
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Post a question in the community to get connected with a mentor
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => navigate('/community')}
                            >
                                Go to Community
                            </Button>
                        </Box>
                    )}
                </Box>
            </Paper>
            
            {/* Community CTA */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    backgroundImage: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0fd 100%)',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                    <Typography variant="h6" gutterBottom>
                        Have a question or need guidance?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Our community of experienced entrepreneurs is here to help!
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => navigate('/community')}
                    sx={{ px: 4 }}
                >
                    Ask the Community
                </Button>
            </Paper>
            <button
  onClick={toggleChatbot}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    padding: "10px 15px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  }}
  aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
>
  {isOpen ? "×" : "💬"}
</button>

<ErrorBoundary>
  {isOpen && (
    <iframe
      src="https://www.chatbase.co/chatbot-iframe/cUpTcZOZfuHgsAtcosdJN"
      width="350px"
      height="500px"
      style={{
        position: "fixed",
        bottom: "70px",
        right: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 999,
        backgroundColor: "white",
      }}
      frameBorder="0"
    ></iframe>
  )}
</ErrorBoundary>
        </Container>
    );
};

// Helper function to calculate days in program
const calculateDaysInProgram = (joinDate) => {
    if (!joinDate) return "N/A";
    const joined = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - joined);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export default TraineeDashboard;