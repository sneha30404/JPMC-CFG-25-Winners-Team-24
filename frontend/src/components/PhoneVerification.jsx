import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPhoneNumber, loginUser } from '../api/api';
import api from '../api/api';
import { 
  Box, 
  Button, 
  Container, 
  CssBaseline, 
  FormControl, 
  InputAdornment, 
  OutlinedInput, 
  Paper, 
  TextField, 
  Typography, 
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { Phone as PhoneIcon, Lock as LockIcon, Person as PersonIcon, AdminPanelSettings as AdminIcon } from '@mui/icons-material';

function PhoneVerification() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userExists, setUserExists] = useState(false);
    const navigate = useNavigate();

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await checkPhoneNumber(phone);
            
            if (response.data.exists) {
                setUserExists(true);
                setStep('otp');
            } else {
                setUserExists(false);
                setStep('register');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Verify OTP with backend
            const response = await loginUser(phone, otp);
            
            // Store the tokens and user data
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Set default authorization header for future requests
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response?.data?.detail || 'Invalid OTP. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (step === 'phone') {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography component="h1" variant="h5" align="center" gutterBottom>
                            Enter Your Phone Number
                        </Typography>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <Box component="form" onSubmit={handlePhoneSubmit} noValidate sx={{ mt: 1 }}>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <OutlinedInput
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setPhone(value);
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PhoneIcon color="action" />
                                        </InputAdornment>
                                    }
                                    placeholder="10-digit mobile number"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]{10}',
                                    }}
                                    required
                                    fullWidth
                                    size="medium"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading || phone.length !== 10}
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Continue'
                                )}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        );
    }

    if (step === 'otp') {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography component="h1" variant="h5" align="center" gutterBottom>
                            Enter OTP
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                            We've sent a 6-digit OTP to +91{phone}
                        </Typography>
                        
                        {error && (
                            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                        
                        <Box component="form" onSubmit={handleOtpSubmit} noValidate sx={{ mt: 1 }}>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <OutlinedInput
                                    id="otp"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setOtp(value);
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockIcon color="action" />
                                        </InputAdornment>
                                    }
                                    placeholder="6-digit OTP"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]{6}',
                                    }}
                                    required
                                    fullWidth
                                    size="medium"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading || otp.length !== 6}
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Verify OTP'
                                )}
                            </Button>
                            <Grid container justifyContent="center">
                                <Button 
                                    onClick={() => setStep('phone')}
                                    color="primary"
                                    size="small"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Change phone number
                                </Button>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        );
    }

    if (step === 'register') {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography component="h1" variant="h5" align="center" gutterBottom>
                            Create an Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                            Choose your account type:
                        </Typography>
                        
                        <Box sx={{ mt: 1 }}>
                            <Button 
                                onClick={() => navigate('/register/trainee', { state: { phone } })}
                                fullWidth
                                variant="contained"
                                sx={{ mb: 2, py: 1.5 }}
                            >
                                Trainee Account
                            </Button>
                            <Button 
                                onClick={() => navigate('/register/admin', { state: { phone } })}
                                fullWidth
                                variant="contained"
                                sx={{ mb: 2, py: 1.5 }}
                            >
                                Admin Account
                            </Button>
                            <Grid container justifyContent="center">
                                <Button 
                                    onClick={() => setStep('phone')}
                                    color="primary"
                                    size="small"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Back
                                </Button>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        );
    }
}

export default PhoneVerification;
