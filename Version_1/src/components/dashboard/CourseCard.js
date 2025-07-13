import React, { useState } from 'react';
import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions, 
    Button, 
    Checkbox, 
    FormControlLabel,
    Collapse,
    IconButton,
    Box,
    LinearProgress,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    VideoLibrary as VideoIcon,
    QuestionAnswer as QuizIcon,
    Assignment as AssignmentIcon,
    Group as WorkshopIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useData } from '../../context/DataContext';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const getIconForContentType = (type) => {
    switch(type) {
        case 'video': return <VideoIcon />;
        case 'quiz': return <QuizIcon />;
        case 'exercise':
        case 'project': return <AssignmentIcon />;
        case 'workshop':
        case 'webinar': return <WorkshopIcon />;
        default: return <VideoIcon />;
    }
};

const CourseCard = ({ course, isCompleted, onToggleComplete }) => {
    const [expanded, setExpanded] = useState(false);
    const { userProgress } = useData();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className="dashboard-card" sx={{ mb: 2, overflow: 'visible' }}>
            <CardMedia
                component="img"
                height="140"
                image={course.image || `/images/courses/course${Math.floor(Math.random() * 5) + 1}.jpg`}
                alt={course.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {course.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Chip 
                        label={course.duration} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={isCompleted} 
                                onChange={() => onToggleComplete(course.id, !isCompleted)}
                                color="success"
                            />
                        }
                        label={isCompleted ? "Completed" : "Mark as complete"}
                    />
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" color="primary">
                    Start Learning
                </Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph variant="h6">Course Content:</Typography>
                    <List dense>
                        {course.chapters && course.chapters.map((chapter, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    {getIconForContentType(chapter.type)}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={chapter.title} 
                                    secondary={chapter.duration ? `Duration: ${chapter.duration}` : ''}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default CourseCard;