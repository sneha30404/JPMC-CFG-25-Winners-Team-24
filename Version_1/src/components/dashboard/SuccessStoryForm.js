import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const SuccessStoryForm = ({ open, onClose }) => {
    const { user } = useAuth();
    const { updateUserData } = useData();
    const [formData, setFormData] = useState({
        successStory: user?.successStory || '',
        jobsCreated: user?.metrics?.jobsCreated || 0,
        revenue: user?.metrics?.revenue || '',
        businessGrowth: 50, // Slider value 0-100
        lifeImpact: 50, // Slider value 0-100
        challenges: '',
        advice: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSliderChange = (name) => (event, newValue) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const handleSubmit = () => {
        // Update user data with success story
        const updatedData = {
            successStory: formData.successStory,
            metrics: {
                jobsCreated: formData.jobsCreated,
                revenue: formData.revenue,
                businessGrowth: formData.businessGrowth,
                lifeImpact: formData.lifeImpact
            }
        };
        
        updateUserData(user.id, updatedData);
        onClose(true); // Close with success flag
    };

    return (
        <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h5" component="div" align="center" gutterBottom>
                    Share Your Success Story
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    Your story will inspire other entrepreneurs in our community
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="successStory"
                            label="Your Success Story"
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.successStory}
                            onChange={handleChange}
                            placeholder="Tell us about your entrepreneurial journey and how ICECD helped you succeed..."
                            helperText="This will be featured on our platform to inspire others"
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="jobsCreated"
                            label="Jobs Created"
                            type="number"
                            fullWidth
                            value={formData.jobsCreated}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="revenue"
                            label="Annual Revenue"
                            fullWidth
                            value={formData.revenue}
                            onChange={handleChange}
                            placeholder="e.g. ₹25,00,000/year"
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ width: '100%' }}>
                            <Typography id="business-growth-slider" gutterBottom>
                                Business Growth Rate
                            </Typography>
                            <Slider
                                value={formData.businessGrowth}
                                onChange={handleSliderChange('businessGrowth')}
                                aria-labelledby="business-growth-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                            />
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ width: '100%' }}>
                            <Typography id="life-impact-slider" gutterBottom>
                                Impact on Quality of Life
                            </Typography>
                            <Slider
                                value={formData.lifeImpact}
                                onChange={handleSliderChange('lifeImpact')}
                                aria-labelledby="life-impact-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                            />
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            name="challenges"
                            label="Key Challenges Overcome"
                            multiline
                            rows={2}
                            fullWidth
                            value={formData.challenges}
                            onChange={handleChange}
                            placeholder="What were the biggest challenges you faced and how did you overcome them?"
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            name="advice"
                            label="Advice for New Entrepreneurs"
                            multiline
                            rows={2}
                            fullWidth
                            value={formData.advice}
                            onChange={handleChange}
                            placeholder="What advice would you give to someone just starting their business journey?"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => onClose(false)}>Cancel</Button>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!formData.successStory.trim()}
                >
                    Submit Success Story
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessStoryForm;