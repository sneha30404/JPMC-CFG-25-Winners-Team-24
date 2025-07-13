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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip  
} from '@mui/material';
import {
    People as PeopleIcon,
    PersonAdd as PersonAddIcon,
    EmojiEvents as SuccessIcon,
    Chat as ChatIcon,
    School as SchoolIcon,
    Dashboard as DashboardIcon
} from '@mui/icons-material';
import { generateTraineeReport, generateGraduateReport } from '../utils/reportGenerator';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useChat } from '../context/ChatContext';
import UserTable from '../components/dashboard/UserTable';
import GroupChatModal from '../components/dashboard/GroupChatModal';
import StatCard from '../components/dashboard/StatCard';

const AdminDashboard = () => {
    const { user } = useAuth();
    const { users, awardSuccessTag } = useData();
    const { chats } = useChat();
    const navigate = useNavigate();
    
    const [tabValue, setTabValue] = useState(0);
    const [groupChatModalOpen, setGroupChatModalOpen] = useState(false);
    const [selectedTraineeId, setSelectedTraineeId] = useState(null);
    const [graduateDetailsOpen, setGraduateDetailsOpen] = useState(false);
    const [selectedGraduate, setSelectedGraduate] = useState(null);
    
    const trainees = users.filter(u => u.role === 'trainee');
    const graduates = users.filter(u => u.role === 'graduate');
    const successStories = graduates.filter(g => g.tags.includes('Success'));
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    
    const handleCreateGroup = (traineeId) => {
        setSelectedTraineeId(traineeId);
        setGroupChatModalOpen(true);
    };
    
    const handleAwardSuccess = (graduateId) => {
        const graduate = graduates.find(g => g.id === graduateId);
        
        // Using window.confirm instead of global confirm to avoid ESLint warning
if (window.confirm(`Award "Success" tag to ${graduate.name}? This will certify their success story and make it visible to the community.`)) {
    awardSuccessTag(graduateId);
    alert(`Success tag awarded to ${graduate.name}!`);
}
    };
    
    const handleViewGraduateDetails = (graduateId) => {
        const graduate = graduates.find(g => g.id === graduateId);
        setSelectedGraduate(graduate);
        setGraduateDetailsOpen(true);
    };

    return (
        <Container maxWidth="lg">
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Admin Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome, {user.name} | {user.title || 'Administrator'}
                </Typography>
            </Box>
            
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title="Total Trainees" 
                        value={trainees.length}
                        icon={<PeopleIcon />}
                        color="primary"
                        subtext="Current program participants"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title="Total Graduates" 
                        value={graduates.length}
                        icon={<SchoolIcon />}
                        color="secondary"
                        subtext="Completed program entrepreneurs"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title="Success Stories" 
                        value={successStories.length}
                        icon={<SuccessIcon />}
                        color="success"
                        subtext="Certified successful ventures"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title="Active Groups" 
                        value={chats.length}
                        icon={<ChatIcon />}
                        color="info"
                        subtext="Mentorship connections"
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
                        <Tab label="Trainee Management" />
                        <Tab label="Graduate Management" />
                    </Tabs>
                </Box>
                
                {/* Trainee Management Tab */}
                <Box sx={{ p: 3, display: tabValue === 0 ? 'block' : 'none' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">
                            Current Trainees
                        </Typography>
                        <Button 
                            variant="contained"
                            startIcon={<PersonAddIcon />}
                            onClick={() => alert('This would open a form to add a new trainee in a full implementation.')}
                        >
                            Add New Trainee
                        </Button>
                    </Box>
                    
                    <UserTable 
                        users={trainees} 
                        type="trainee"
                        onCreateGroup={handleCreateGroup}
                    />
                </Box>
                
                {/* Graduate Management Tab */}
                <Box sx={{ p: 3, display: tabValue === 1 ? 'block' : 'none' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">
                            Graduate Entrepreneurs
                        </Typography>
                        <Button 
                            variant="contained"
                            color="secondary"
                            startIcon={<PersonAddIcon />}
                            onClick={() => alert('This would open a form to add a new graduate in a full implementation.')}
                        >
                            Add New Graduate
                        </Button>
                    </Box>
                    
                    <UserTable 
                        users={graduates} 
                        type="graduate"
                        onAwardSuccess={handleAwardSuccess}
                        onViewDetails={handleViewGraduateDetails}
                    />
                </Box>
            </Paper>
            
            {/* Quick Actions Card */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    backgroundImage: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0fd 100%)'
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Quick Actions
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button 
                            fullWidth
                            variant="outlined" 
                            color="primary"
                            startIcon={<ChatIcon />}
                            onClick={() => setGroupChatModalOpen(true)}
                        >
                            Create New Group
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button 
                            fullWidth
                            variant="outlined" 
                            color="secondary"
                            startIcon={<DashboardIcon />}
                            onClick={() => navigate('/community')}
                        >
                            View Community
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button 
    fullWidth
    variant="outlined" 
    color="success"
    startIcon={<SuccessIcon />}
    onClick={() => {
        // Show a small menu to choose report type
        const reportType = window.prompt("Select report type (1: Trainee Progress, 2: Graduate Success):", "1");
        
        if (reportType === "1") {
            const doc = generateTraineeReport(trainees, graduates);
            doc.save('ICECD_Trainee_Progress_Report.pdf');
        } else if (reportType === "2") {
            const doc = generateGraduateReport(graduates);
            doc.save('ICECD_Graduate_Success_Report.pdf');
        }
    }}
>
    Generate Reports
</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button 
                            fullWidth
                            variant="outlined" 
                            color="info"
                            startIcon={<PeopleIcon />}
                            onClick={() => alert('This would open a bulk SMS form in a full implementation.')}
                        >
                            Send Follow-up SMS
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            
            {/* Group Chat Modal */}
            <GroupChatModal 
                open={groupChatModalOpen} 
                onClose={() => {
                    setGroupChatModalOpen(false);
                    setSelectedTraineeId(null);
                }}
                traineeId={selectedTraineeId}
            />
            
            {/* Graduate Details Dialog */}
            {selectedGraduate && (
                <Dialog
                    open={graduateDetailsOpen}
                    onClose={() => setGraduateDetailsOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6">
                                {selectedGraduate.name}
                            </Typography>
                            {selectedGraduate.tags.includes('Success') && (
                                <Chip 
                                    icon={<SuccessIcon />} 
                                    label="Success Story" 
                                    color="success" 
                                    size="small"
                                />
                            )}
                        </Box>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Business
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {selectedGraduate.business || 'Not specified'}
                                </Typography>
                                
                                <Typography variant="subtitle2" color="text.secondary">
                                    Sector
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {selectedGraduate.tags.filter(t => t !== 'Success').join(', ')}
                                </Typography>
                                
                                <Typography variant="subtitle2" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {selectedGraduate.location || 'Not specified'}
                                </Typography>
                                
                                <Typography variant="subtitle2" color="text.secondary">
                                    Join Date
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {selectedGraduate.joinDate || 'Not specified'}
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Follow-up Status
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {selectedGraduate.followUpStatus || 'Not started'}
                                </Typography>
                                
                                {selectedGraduate.metrics && (
                                    <>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Jobs Created
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {selectedGraduate.metrics.jobsCreated || 0}
                                        </Typography>
                                        
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Annual Revenue
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {selectedGraduate.metrics.revenue || 'Not reported'}
                                        </Typography>
                                        
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Business Sustainability
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {selectedGraduate.metrics.sustainabilityDays || 0} days
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Success Story
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {selectedGraduate.successStory || 'No success story submitted yet.'}
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Mentoring Trainees
                                </Typography>
                                {selectedGraduate.mentoring && selectedGraduate.mentoring.length > 0 ? (
                                    <Box sx={{ mt: 1 }}>
                                        {selectedGraduate.mentoring.map(traineeId => {
                                            const trainee = trainees.find(t => t.id === traineeId);
                                            return trainee ? (
                                                <Chip 
                                                    key={traineeId}
                                                    label={trainee.name}
                                                    variant="outlined"
                                                    sx={{ mr: 1, mb: 1 }}
                                                />
                                            ) : null;
                                        })}
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Not currently mentoring any trainees.
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setGraduateDetailsOpen(false)}>Close</Button>
                        {!selectedGraduate.tags.includes('Success') && (
                            <Button 
                                variant="contained" 
                                color="success"
                                onClick={() => {
                                    setGraduateDetailsOpen(false);
                                    handleAwardSuccess(selectedGraduate.id);
                                }}
                                disabled={!selectedGraduate.followUpStatus.includes('34/34')}
                            >
                                Award Success Tag
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default AdminDashboard;