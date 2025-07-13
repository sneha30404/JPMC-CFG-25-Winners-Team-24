import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const NewPostForm = ({ onSubmit }) => {
    const { user } = useAuth();
    const [postData, setPostData] = useState({
        title: '',
        query: '',
        sectorTag: user?.tags?.[0] || ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!postData.title.trim() || !postData.query.trim() || !postData.sectorTag) {
            alert('Please fill in all fields');
            return;
        }
        
        // Submit the post
        onSubmit({
            ...postData,
            authorId: user.id,
            createdAt: new Date().toISOString(),
            replies: []
        });
        
        // Reset form
        setPostData({
            title: '',
            query: '',
            sectorTag: user?.tags?.[0] || ''
        });
    };
    
    return (
        <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Share Your Question or Insight
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Ask questions, share resources, or offer advice to the community.
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Title"
                                value={postData.title}
                                onChange={handleChange}
                                fullWidth
                                required
                                placeholder="Summarize your question or topic in a brief title"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                name="query"
                                label="Description"
                                value={postData.query}
                                onChange={handleChange}
                                fullWidth
                                required
                                multiline
                                rows={4}
                                placeholder="Provide details about your question, challenge, or insight..."
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="sector-tag-label">Business Sector</InputLabel>
                                <Select
                                    labelId="sector-tag-label"
                                    id="sectorTag"
                                    name="sectorTag"
                                    value={postData.sectorTag}
                                    onChange={handleChange}
                                    label="Business Sector"
                                >
                                    <MenuItem value="Beauty">Beauty</MenuItem>
                                    <MenuItem value="Groceries">Groceries</MenuItem>
                                    <MenuItem value="Furniture">Furniture</MenuItem>
                                    <MenuItem value="General">General</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                size="large"
                                sx={{ px: 4 }}
                            >
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NewPostForm;