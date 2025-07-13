import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const ProgressCircle = ({ value, size = 100, thickness = 6, label, color = "primary" }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={size}
                    thickness={thickness}
                    sx={{ color: theme => theme.palette.grey[200] }}
                />
                <CircularProgress
                    variant="determinate"
                    value={value}
                    size={size}
                    thickness={thickness}
                    color={color}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        },
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h6" component="div" color="text.primary">
                        {`${Math.round(value)}%`}
                    </Typography>
                </Box>
            </Box>
            {label && (
                <Typography variant="body2" component="div" color="text.secondary" sx={{ mt: 1 }}>
                    {label}
                </Typography>
            )}
        </Box>
    );
};

export default ProgressCircle;