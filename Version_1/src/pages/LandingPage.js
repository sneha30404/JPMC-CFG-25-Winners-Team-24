import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    CardActionArea, 
    Avatar, 
    Button,
    Grid,
    Paper,
    Divider
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ChatIcon from '@mui/icons-material/Chat';
import FlareIcon from '@mui/icons-material/Flare';
import DevicesIcon from '@mui/icons-material/Devices';

const LandingPage = () => {
    const navigate = useNavigate();

    const roles = [
        { 
            name: 'For Our Team', 
            role: 'admin', 
            icon: <PeopleIcon fontSize="large" />, 
            description: 'Track progress, manage users, and facilitate connections between entrepreneurs.',
            color: '#1e4c78'
        },
        { 
            name: 'For Trainees', 
            role: 'trainee', 
            icon: <SchoolIcon fontSize="large" />, 
            description: 'Access learning materials, track your progress, and connect with experienced mentors.',
            color: '#4caf50'
        },
        { 
            name: 'For Graduates', 
            role: 'graduate', 
            icon: <WorkspacePremiumIcon fontSize="large" />, 
            description: 'Mentor new entrepreneurs, access refresher courses, and share your success story.',
            color: '#ff7043'
        },
    ];

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
            minHeight: '100vh',
            pt: 4,
            pb: 8
        }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box sx={{ 
                    textAlign: 'center', 
                    py: { xs: 4, md: 8 },
                    mb: 6
                }}>
                    <Avatar src="/icecd-logo.png" sx={{ width: 100, height: 100, mx: 'auto', mb: 4 }} />
                    <Typography variant="h2" component="h1" className="hero-title" gutterBottom sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                    }}>
                        ICECD Global Community
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
                        Connecting entrepreneurs across 55 countries to build a sustainable ecosystem for growth and learning
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button 
                            variant="contained" 
                            size="large"
                            sx={{ 
                                borderRadius: '30px', 
                                px: 4, 
                                py: 1.5,
                                fontSize: '1.1rem',
                                boxShadow: '0 8px 20px rgba(30,76,120,0.3)',
                            }}
                            onClick={() => document.getElementById('role-selector').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Join Our Community
                        </Button>
                    </Box>
                </Box>

                {/* Features Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
                        Why Join Our Platform?
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mb: 2 }}>
                                        <ChatIcon fontSize="large" />
                                    </Avatar>
                                    <Typography variant="h6" gutterBottom>
                                        Community Support
                                    </Typography>
                                    <Typography variant="body1">
                                        Connect with other entrepreneurs who understand your challenges and can offer guidance based on their experiences.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', width: 60, height: 60, mb: 2 }}>
                                        <FlareIcon fontSize="large" />
                                    </Avatar>
                                    <Typography variant="h6" gutterBottom>
                                        Continued Learning
                                    </Typography>
                                    <Typography variant="body1">
                                        Access courses, refreshers, and resources to help your business thrive beyond the initial training program.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'success.main', width: 60, height: 60, mb: 2 }}>
                                        <DevicesIcon fontSize="large" />
                                    </Avatar>
                                    <Typography variant="h6" gutterBottom>
                                        Accessible Platform
                                    </Typography>
                                    <Typography variant="body1">
                                        Our mobile-friendly design ensures you can connect, learn, and share from any device, anywhere.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                {/* Role Selection Section */}
                <Box id="role-selector" sx={{ mt: 8 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 5, fontWeight: 600 }}>
                        Select Your Role
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {roles.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.role}>
                                <Card 
                                    className="dashboard-card"
                                    sx={{ 
                                        height: '100%',
                                        borderRadius: 4,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '4px',
                                            backgroundColor: item.color
                                        }
                                    }}
                                >
                                    <CardActionArea 
                                        onClick={() => navigate(`/login/${item.role}`)}
                                        sx={{ height: '100%', p: 1 }}
                                    >
                                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                            <Avatar 
                                                sx={{ 
                                                    bgcolor: `${item.color}15`, 
                                                    color: item.color,
                                                    width: 70, 
                                                    height: 70, 
                                                    mx: 'auto',
                                                    mb: 3
                                                }}
                                            >
                                                {item.icon}
                                            </Avatar>
                                            <Typography variant="h5" component="div" gutterBottom fontWeight={600}>
                                                {item.name}
                                            </Typography>
                                            <Typography sx={{ mt: 1.5 }} color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Impact Stats */}
                <Box sx={{ mt: 10, mb: 6 }}>
                    <Divider sx={{ mb: 6 }} />
                    <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 5, fontWeight: 600 }}>
                        Our Impact
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>55+</Typography>
                                <Typography variant="subtitle1">Countries</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>38+</Typography>
                                <Typography variant="subtitle1">Years Experience</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>10M+</Typography>
                                <Typography variant="subtitle1">People Impacted</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>1000+</Typography>
                                <Typography variant="subtitle1">Success Stories</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default LandingPage;