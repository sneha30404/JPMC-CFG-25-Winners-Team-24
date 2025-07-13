import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Container, 
    Paper, 
    Divider,
    Snackbar,
    Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import NewPostForm from '../components/community/NewPostForm';
import PostCard from '../components/community/PostCard';
import TagSelector from '../components/community/TagSelector';
import GroupChatModal from '../components/dashboard/GroupChatModal';

const CommunityPage = () => {
    const { user } = useAuth();
    const { communityPosts, addCommunityPost } = useData();
    const navigate = useNavigate();
    
    const [selectedTag, setSelectedTag] = useState('All');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [groupChatModalOpen, setGroupChatModalOpen] = useState(false);
    const [selectedTraineeId, setSelectedTraineeId] = useState(null);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    
    // All unique tags from posts
    const allTags = ['All', ...new Set(communityPosts.map(post => post.sectorTag))];
    
    // Filter posts when selected tag changes
    useEffect(() => {
        const filtered = selectedTag === 'All' 
            ? communityPosts 
            : communityPosts.filter(post => post.sectorTag === selectedTag);
        setFilteredPosts(filtered);
    }, [selectedTag, communityPosts]);
    
    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };
    
    const handlePostSubmit = (newPost) => {
        addCommunityPost(newPost);
        setAlert({
            open: true,
            message: 'Your post has been successfully added to the community!',
            severity: 'success'
        });
    };
    
    const handleReply = (postId, replyText) => {
        // In a real app, this would call an API
        // For the prototype, we'll just show an alert
        setAlert({
            open: true,
            message: 'Your reply has been added!',
            severity: 'success'
        });
    };
    
    const handleRequestHelp = (postId, authorId) => {
        if (user.role === 'admin') {
            // Admin creates a mentor group
            setSelectedTraineeId(authorId);
            setGroupChatModalOpen(true);
        } else {
            // Trainee requests admin help
            setAlert({
                open: true,
                message: 'An admin has been notified about your request. They will create a mentor group for you soon.',
                severity: 'info'
            });
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Community Forum
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Connect with entrepreneurs, ask questions, and share your knowledge.
                </Typography>
            </Box>
            
            {/* New Post Form */}
            <NewPostForm onSubmit={handlePostSubmit} />
            
            <Divider sx={{ my: 4 }} />
            
            {/* Post Filtering */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Community Posts
                </Typography>
                <TagSelector 
                    tags={allTags}
                    selectedTag={selectedTag}
                    onTagSelect={handleTagSelect}
                />
                
                {/* Post List */}
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            onRequestHelp={handleRequestHelp}
                            onReply={handleReply}
                        />
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            No posts found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Be the first to post in this category!
                        </Typography>
                    </Box>
                )}
            </Paper>
            
            {/* Group Chat Modal for admin */}
            {user.role === 'admin' && (
                <GroupChatModal
                    open={groupChatModalOpen}
                    onClose={() => {
                        setGroupChatModalOpen(false);
                        setSelectedTraineeId(null);
                    }}
                    traineeId={selectedTraineeId}
                />
            )}
            
            {/* Alert Snackbar */}
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={() => setAlert({ ...alert, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setAlert({ ...alert, open: false })} 
                    severity={alert.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CommunityPage;