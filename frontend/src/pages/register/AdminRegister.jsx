import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser } from '../../api/api';
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
  InputAdornment
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Person as PersonIcon, Phone as PhoneIcon } from '@mui/icons-material';

function AdminRegister() {
    const [name, setName] = useState('');
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
            const response = await registerUser(phone, name, 'admin');
            navigate('/');
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
                        Create Admin Account
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
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Submit for Approval'
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

export default AdminRegister;
