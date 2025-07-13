import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, color }) => ({
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '5px',
        backgroundColor: theme.palette[color || 'primary'].main,
    }
}));

const StatCard = ({ title, value, icon, color = 'primary', subtext }) => {
    return (
        <StyledCard color={color} className="dashboard-card">
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            {value}
                        </Typography>
                        {subtext && (
                            <Typography variant="caption" color="text.secondary">
                                {subtext}
                            </Typography>
                        )}
                    </Box>
                    <Avatar
                        sx={{
                            backgroundColor: theme => `${theme.palette[color].main}15`,
                            color: theme => theme.palette[color].main,
                        }}
                    >
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default StatCard;