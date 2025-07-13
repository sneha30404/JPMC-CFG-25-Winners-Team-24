import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    CardActions, 
    Button, 
    Avatar, 
    Box, 
    Chip,
    Collapse,
    Divider,
    TextField,
    IconButton,
    Paper,
    Grid
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Reply as ReplyIcon,
    Send as SendIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';

const StyledReplyBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    borderLeft: `3px solid ${theme.palette.primary.main}`,
}));

const ExpandButton = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PostCard = ({ post, onRequestHelp, onReply }) => {
    const { user } = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [replyText, setReplyText] = useState('');
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const handleReplySubmit = () => {
        if (replyText.trim()) {
            onReply(post.id, replyText);
            setReplyText('');
        }
    };

    return (
        <Card elevation={2} className="dashboard-card" sx={{ mb: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                        src={post.authorAvatar} 
                        alt={post.authorName}
                        sx={{ width: 40, height: 40, mr: 1.5 }}
                    />
                    <Box>
                        <Typography variant="subtitle1" component="div">
                            {post.authorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {post.authorRole.charAt(0).toUpperCase() + post.authorRole.slice(1)} • {formatDate(post.createdAt)}
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <Chip 
                            label={post.sectorTag} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                        />
                    </Box>
                </Box>
                
                <Typography variant="h6" component="div" gutterBottom>
                    {post.title}
                </Typography>
                
                <Typography variant="body1" color="text.primary" paragraph>
                    {post.query}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        {post.replies ? `${post.replies.length} replies` : 'No replies yet'}
                    </Typography>
                    {post.replies && post.replies.length > 0 && (
                        <ExpandButton
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show replies"
                            size="small"
                        >
                            <ExpandMoreIcon />
                        </ExpandButton>
                    )}
                </Box>
            </CardContent>
            
            <Divider />
            
            <CardActions>
                <Button 
                    size="small" 
                    startIcon={<ReplyIcon />}
                    onClick={() => setExpanded(true)}
                >
                    Reply
                </Button>
                
                {user?.role === 'trainee' && post.authorId === user.id && (
                    <Button 
                        size="small" 
                        color="secondary"
                        variant="outlined"
                        onClick={() => onRequestHelp(post.id)}
                    >
                        Request Admin Help
                    </Button>
                )}
                
                {user?.role === 'admin' && (
                    <Button 
                        size="small" 
                        color="primary"
                        variant="outlined"
                        onClick={() => onRequestHelp(post.id, post.authorId)}
                    >
                        Create Mentor Group
                    </Button>
                )}
            </CardActions>
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Replies
                    </Typography>
                    
                    {post.replies && post.replies.length > 0 ? (
                        post.replies.map((reply) => (
                            <StyledReplyBox key={reply.id}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <Avatar 
                                        src={reply.authorAvatar} 
                                        alt={reply.authorName}
                                        sx={{ width: 32, height: 32, mr: 1.5 }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="subtitle2">
                                                {reply.authorName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {formatDate(reply.createdAt)}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2">
                                            {reply.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            </StyledReplyBox>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                            No replies yet. Be the first to respond!
                        </Typography>
                    )}
                    
                    <Grid container spacing={1} alignItems="flex-start">
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Write your reply..."
                                variant="outlined"
                                size="small"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton 
                                color="primary" 
                                onClick={handleReplySubmit}
                                disabled={!replyText.trim()}
                                sx={{ mt: 1 }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </Card>
    );
};

export default PostCard;