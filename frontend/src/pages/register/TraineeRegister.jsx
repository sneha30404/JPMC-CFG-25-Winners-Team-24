import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser, loginUser } from '../../api/api';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Person as PersonIcon, 
  Phone as PhoneIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

function TraineeRegister() {
    const [name, setName] = useState('');
    const [interest, setInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get phone number from location state
    const phone = location.state?.phone || '';
    
    useEffect(() => {
        if (!phone) {
            navigate('/');
        }
    }, [phone, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await registerUser(phone, name, 'trainee', interest);
            
            // Auto-login after successful registration
            const loginResponse = await loginUser(phone, '0000'); // Default OTP for demo
            
            // Save user data and tokens
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
            localStorage.setItem('access_token', loginResponse.data.access);
            localStorage.setItem('refresh_token', loginResponse.data.refresh);
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
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
                        Create Trainee Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                        Complete your registration
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            value={phone}
                            disabled
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="interest-label">Area of Interest</InputLabel>
                            <Select
                                labelId="interest-label"
                                id="interest"
                                value={interest}
                                label="Area of Interest"
                                onChange={(e) => setInterest(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <CategoryIcon color="action" />
                                    </InputAdornment>
                                }
                                required
                            >
                                <MenuItem value="">
                                    <em>Select an area of interest</em>
                                </MenuItem>
                                <MenuItem value="Agriculture">Agriculture</MenuItem>
                                <MenuItem value="Handicrafts">Handicrafts</MenuItem>
                                <MenuItem value="Retail">Retail</MenuItem>
                                <MenuItem value="Textiles">Textiles</MenuItem>
                                <MenuItem value="Food Processing">Food Processing</MenuItem>
                                <MenuItem value="Beauty & Wellness">Beauty & Wellness</MenuItem>
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                        
                        <Grid container justifyContent="flex-end">
                            <Button
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigate(-1)}
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

export default TraineeRegister;
