import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    Paper, 
    Container, 
    Button, 
    Divider, 
    Tabs, 
    Tab,
    Card,
    CardContent,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import {
    BusinessCenter as BusinessIcon,
    EmojiEvents as SuccessIcon,
    Chat as ChatIcon,
    School as SchoolIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useChat } from '../context/ChatContext';
import CourseCard from '../components/dashboard/CourseCard';
import ChatPreview from '../components/dashboard/ChatPreview';
import SuccessStoryForm from '../components/dashboard/SuccessStoryForm';
import StatCard from '../components/dashboard/StatCard';

const GraduateDashboard = () => {
    const { user } = useAuth();
    const { courses, userProgress, updateProgress, users } = useData();
    const { getUserChats } = useChat();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [successStoryDialogOpen, setSuccessStoryDialogOpen] = useState(false);
    
    const userChats = getUserChats();
    const isSuccess = user.tags.includes('Success');
    const myMentees = users.filter(u => u.role === 'trainee' && user.mentoring && user.mentoring.includes(u.id));
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg">
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Welcome back, {user.name}!
                    </Typography>
                    {isSuccess && (
                        <Chip 
                            icon={<SuccessIcon />} 
                            label="Certified Success Story" 
                            color="success"
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                        />
                    )}
                </Box>
                <Typography variant="body1" color="text.secondary">
                    Business: <b>{user.business || 'Your Business'}</b> | Sector: <b>{user.tags.filter(t => t !== 'Success').join(', ')}</b>
                </Typography>
            </Box>
            
            {/* Success Story Card (if applicable) */}
            {isSuccess && (
                <Card 
                    elevation={3} 
                    sx={{ 
                        mb: 4, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ 
                        position: 'absolute', 
                        right: -20, 
                        top: -20, 
                        opacity: 0.1,
                        transform: 'rotate(15deg)'
                    }}>
                        <SuccessIcon sx={{ fontSize: 150 }} />
                    </Box>
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Your Success Story
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', my: 2 }}>
                            "{user.successStory}"
                        </Typography>
                        
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            {user.metrics && (
                                <>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Jobs Created
                                        </Typography>
                                        <Typography variant="h6">
                                            {user.metrics.jobsCreated}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Revenue
                                        </Typography>
                                        <Typography variant="h6">
                                            {user.metrics.revenue}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Days Sustained
                                        </Typography>
                                        <Typography variant="h6">
                                            {user.metrics.sustainabilityDays || 'N/A'}
                                        </Typography>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    onClick={() => setSuccessStoryDialogOpen(true)}
                                >
                                    Update Story
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
            
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard 
                        title="Business Days" 
                        value={user.metrics?.sustainabilityDays || calculateDaysInBusiness(user.joinDate)}
                        icon={<BusinessIcon />}
                        color="primary"
                        subtext={`${user.metrics?.sustainabilityDays > 1000 ? 'Beyond' : 'Working towards'} 1000-day milestone`}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard 
                        title="Mentees" 
                        value={myMentees.length}
                        icon={<ChatIcon />}
                        color="secondary"
                        subtext="Entrepreneurs you're mentoring"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {!isSuccess ? (
                        <StatCard 
                            title="Follow-up Status" 
                            value={user.followUpStatus || "Tracking..."}
                            icon={<SuccessIcon />}
                            color="success"
                            subtext="Keep sharing monthly updates to earn Success tag"
                        />
                    ) : (
                        <StatCard 
                            title="Success Status" 
                            value="Certified"
                            icon={<SuccessIcon />}
                            color="success"
                            subtext="You've achieved the Success certification!"
                        />
                    )}
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
                        <Tab label="Mentor Center" />
                        <Tab label="Skill Refreshers" />
                    </Tabs>
                </Box>
                
                {/* Mentor Center Tab */}
                <Box sx={{ p: 3, display: tabValue === 0 ? 'block' : 'none' }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Trainees You're Mentoring
                        </Typography>
                        
                        {myMentees.length > 0 ? (
                            <List sx={{ bgcolor: 'background.paper' }}>
                                {myMentees.map((mentee) => (
                                    <ListItem key={mentee.id} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar src={mentee.avatar} alt={mentee.name} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={mentee.name}
                                            secondary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {mentee.tags.join(', ')}
                                                    </Typography>
                                                    {` — Progress: ${mentee.courseProgress}/5 modules`}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                                <Typography variant="body2" color="text.secondary">
                                    You're not mentoring any trainees yet. The ICECD team will assign mentees based on your expertise.
                                </Typography>
                            </Paper>
                        )}
                    </Box>
                    
                    <Divider sx={{ my: 4 }} />
                    
                    <Typography variant="h6" gutterBottom>
                        Your Mentor Groups
                    </Typography>
                    {userChats.length > 0 ? (
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
                    ) : (
                        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                            <Typography variant="body2" color="text.secondary">
                                You don't have any active mentorship groups yet.
                            </Typography>
                        </Paper>
                    )}
                </Box>
                
                {/* Skill Refreshers Tab */}
                <Box sx={{ p: 3, display: tabValue === 1 ? 'block' : 'none' }}>
                    <Typography variant="h6" gutterBottom>
                        Skill Refresher Courses
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Stay updated with the latest business trends and techniques with these advanced courses.
                    </Typography>
                    
                    <Grid container spacing={3}>
                        {courses.refresher.map((course) => (
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
            </Paper>
            
            {/* Success Story Button (if not already a success) */}
            {!isSuccess && (
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
                            Ready to share your success?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.followUpStatus === 'Month 34/34' ? 
                                "You've reached the milestone! Share your story to inspire others." : 
                                `Continue your monthly check-ins (${user.followUpStatus}). The Success tag will be awarded after 1000 days.`}
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="success"
                        onClick={() => setSuccessStoryDialogOpen(true)}
                        disabled={!user.followUpStatus.includes('34/34')}
                        sx={{ px: 4 }}
                    >
                        {user.followUpStatus.includes('34/34') ? 'Share Success Story' : 'Keep Going!'}
                    </Button>
                </Paper>
            )}
            
            {/* Community Button */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button 
                    variant="outlined" 
                    size="large" 
                    startIcon={<ChatIcon />}
                    onClick={() => navigate('/community')}
                >
                    Visit Community Forum
                </Button>
            </Box>
            
            {/* Success Story Dialog */}
            <SuccessStoryForm 
                open={successStoryDialogOpen} 
                onClose={(success) => {
                    setSuccessStoryDialogOpen(false);
                    // Show confirmation if success
                    if (success) {
                        alert('Thank you for sharing your success story! It will inspire other entrepreneurs in our community.');
                    }
                }} 
            />
        </Container>
    );
};

// Helper function to calculate days in business
const calculateDaysInBusiness = (joinDate) => {
    if (!joinDate) return "N/A";
    const joined = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - joined);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export default GraduateDashboard;