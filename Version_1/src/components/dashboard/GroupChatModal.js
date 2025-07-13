import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Box,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider
} from '@mui/material';
import { useData } from '../../context/DataContext';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GroupChatModal = ({ open, onClose, traineeId = null }) => {
    const { users } = useData();
    const { createChat } = useChat();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [groupName, setGroupName] = useState('');
    const [selectedTrainees, setSelectedTrainees] = useState(traineeId ? [traineeId] : []);
    const [selectedGraduates, setSelectedGraduates] = useState([]);
    const [sector, setSector] = useState('');
    
    const trainees = users.filter(u => u.role === 'trainee');
    const graduates = users.filter(u => u.role === 'graduate');
    
    // If traineeId is provided, pre-select the sector based on that trainee
    useEffect(() => {
        if (traineeId) {
            const trainee = trainees.find(t => t.id === traineeId);
            if (trainee) {
                setSector(trainee.tags[0]);
                setGroupName(`Support: ${trainee.name}`);
                
                // If the trainee has a sector tag, filter graduates by that sector
                if (trainee.tags.length > 0) {
                    const recommendedGraduate = graduates.find(g => 
                        g.tags.includes(trainee.tags[0]) && g.tags.includes('Success')
                    );
                    if (recommendedGraduate) {
                        setSelectedGraduates([recommendedGraduate.id]);
                    }
                }
            }
        }
    }, [traineeId, trainees, graduates]);
    
    const handleCreate = () => {
        // Create the chat group
        const members = [
            ...selectedTrainees,
            ...selectedGraduates,
            user.id // Always include the admin
        ];
        
        const chatId = createChat(groupName, members);
        onClose();
        
        // Navigate to the new chat
        if (chatId) {
            navigate(`/chat/${chatId}`);
        }
    };
    
    const handleSectorChange = (e) => {
        setSector(e.target.value);
        // Reset selections when sector changes
        setSelectedTrainees([]);
        setSelectedGraduates([]);
    };
    
    const filteredTrainees = sector 
        ? trainees.filter(t => t.tags.includes(sector))
        : trainees;
        
    const filteredGraduates = sector 
        ? graduates.filter(g => g.tags.includes(sector))
        : graduates;
    
    const getName = (id) => {
        const person = users.find(u => u.id === id);
        return person ? person.name : 'Unknown';
    };
    
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create a New Group Chat</DialogTitle>
            <DialogContent dividers>
                <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Group Name"
                    fullWidth
                    variant="outlined"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                
                <FormControl fullWidth margin="normal">
                    <InputLabel id="sector-label">Filter by Business Sector</InputLabel>
                    <Select
                        labelId="sector-label"
                        id="sector"
                        value={sector}
                        label="Filter by Business Sector"
                        onChange={handleSectorChange}
                    >
                        <MenuItem value="">All Sectors</MenuItem>
                        <MenuItem value="Beauty">Beauty</MenuItem>
                        <MenuItem value="Groceries">Groceries</MenuItem>
                        <MenuItem value="Furniture">Furniture</MenuItem>
                    </Select>
                </FormControl>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>Add Trainees</Typography>
                    <List dense sx={{ bgcolor: 'background.paper' }}>
                        {filteredTrainees.map((trainee) => (
                            <React.Fragment key={trainee.id}>
                                <ListItem
                                    button
                                    selected={selectedTrainees.includes(trainee.id)}
                                    onClick={() => {
                                        const newSelected = selectedTrainees.includes(trainee.id)
                                            ? selectedTrainees.filter(id => id !== trainee.id)
                                            : [...selectedTrainees, trainee.id];
                                        setSelectedTrainees(newSelected);
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={trainee.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={trainee.name} 
                                        secondary={`Sector: ${trainee.tags.join(', ')}`} 
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>Add Graduates (Mentors)</Typography>
                    <List dense sx={{ bgcolor: 'background.paper' }}>
                        {filteredGraduates.map((graduate) => (
                            <React.Fragment key={graduate.id}>
                                <ListItem
                                    button
                                    selected={selectedGraduates.includes(graduate.id)}
                                    onClick={() => {
                                        const newSelected = selectedGraduates.includes(graduate.id)
                                            ? selectedGraduates.filter(id => id !== graduate.id)
                                            : [...selectedGraduates, graduate.id];
                                        setSelectedGraduates(newSelected);
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={graduate.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={graduate.name} 
                                        secondary={`${graduate.tags.includes('Success') ? '⭐ Success Story' : ''}`} 
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Selected Participants:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedTrainees.map((id) => (
                            <Chip 
                                key={id} 
                                label={getName(id)} 
                                color="primary" 
                                variant="outlined" 
                                onDelete={() => setSelectedTrainees(selectedTrainees.filter(i => i !== id))}
                            />
                        ))}
                        {selectedGraduates.map((id) => (
                            <Chip 
                                key={id} 
                                label={getName(id)} 
                                color="secondary" 
                                variant="outlined" 
                                onDelete={() => setSelectedGraduates(selectedGraduates.filter(i => i !== id))}
                            />
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCreate}
                    disabled={!groupName || (selectedTrainees.length === 0 && selectedGraduates.length === 0)}
                >
                    Create Group
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupChatModal;