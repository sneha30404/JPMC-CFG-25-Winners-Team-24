import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const TagSelector = ({ tags, selectedTag, onTagSelect }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
                Filter by Business Sector:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        clickable
                        color={selectedTag === tag ? 'primary' : 'default'}
                        onClick={() => onTagSelect(tag)}
                        variant={selectedTag === tag ? 'filled' : 'outlined'}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TagSelector;