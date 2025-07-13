import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    Container, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Card, 
    CardContent, 
    Avatar, 
    CircularProgress,
    InputAdornment,
    Snackbar,
    Alert,
    Paper
} from '@mui/material';
import { 
    Phone as PhoneIcon, 
    VpnKey as VpnKeyIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const LoginPage = () => {
    const { role } = useParams();
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 = Phone number, 2 = OTP
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    
    // Based on our mock data, pre-fill for easy demo
    const placeholderPhone = {
        admin: '7654321098',
        trainee: '9876543210',
        graduate: '8765432109',
    };

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        
        if (!phone) {
            setError('Please enter a phone number');
            return;
        }
        
        // Move to OTP step
        setStep(2);
        
        // In a real app, this would trigger an API call to send OTP
        // For demo, we'll just move to the next step
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        
        if (!otp) {
            setError('Please enter the OTP');
            return;
        }
        
        // Attempt login - any OTP is valid for the prototype
        login(phone || placeholderPhone[role], role, (success, errorMsg) => {
            if (!success) {
                setError(errorMsg || 'Login failed. Please try again.');
            }
        });
    };

    const getRoleTitle = () => {
        switch(role) {
            case 'admin': return 'ICECD Team Member';
            case 'trainee': return 'Trainee';
            case 'graduate': return 'Graduate Entrepreneur';
            default: return 'User';
        }
    };

    const getRoleIcon = () => {
        switch(role) {
            case 'admin': return <PeopleIcon fontSize="large" />;
            case 'trainee': return <SchoolIcon fontSize="large" />;
            case 'graduate': return <WorkspacePremiumIcon fontSize="large" />;
            default: return null;
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            py: 8, 
            backgroundColor: '#f5f7fa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Container component="main" maxWidth="sm">
                <Box sx={{ mb: 4 }}>
                    <Button 
                        startIcon={<ArrowBackIcon />} 
                        onClick={() => navigate('/')}
                        variant="text"
                    >
                        Back to Home
                    </Button>
                </Box>
                
                <Card elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white', 
                        p: 3, 
                        textAlign: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Avatar
                            sx={{ 
                                width: 70, 
                                height: 70, 
                                bgcolor: 'white',
                                color: 'primary.main',
                                mx: 'auto',
                                mb: 2
                            }}
                        >
                            {getRoleIcon()}
                        </Avatar>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Login as {getRoleTitle()}
                        </Typography>
                        <Typography variant="body2">
                            Please verify your phone number to continue
                        </Typography>
                    </Box>
                    
                    <CardContent sx={{ p: 4 }}>
                        {step === 1 ? (
                            <Box component="form" onSubmit={handlePhoneSubmit} noValidate>
                                <Typography variant="subtitle1" gutterBottom>
                                    Enter your phone number
                                </Typography>
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="tel"
                                    autoFocus
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={`Demo: ${placeholderPhone[role]}`}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                                    disabled={isLoading}
                                >
                                    Send OTP
                                </Button>
                                
                                <Typography variant="caption" color="text.secondary" align="center" display="block">
                                    For demo purposes, you can use the pre-filled phone number
                                </Typography>
                            </Box>
                        ) : (
                            <Box component="form" onSubmit={handleOtpSubmit} noValidate>
                                <Typography variant="subtitle1" gutterBottom>
                                    Enter the OTP sent to {phone || placeholderPhone[role]}
                                </Typography>
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="otp"
                                    label="OTP"
                                    type="text"
                                    id="otp"
                                    autoFocus
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="For demo, enter any 4 digits"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setStep(1)}
                                        disabled={isLoading}
                                    >
                                        Back
                                    </Button>
                                    
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isLoading}
                                        sx={{ px: 4 }}
                                    >
                                        {isLoading ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            'Login'
                                        )}
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
                
                <Snackbar 
                    open={!!error} 
                    autoHideDuration={6000} 
                    onClose={() => setError('')}
                >
                    <Alert 
                        onClose={() => setError('')} 
                        severity="error" 
                        variant="filled"
                    >
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default LoginPage;