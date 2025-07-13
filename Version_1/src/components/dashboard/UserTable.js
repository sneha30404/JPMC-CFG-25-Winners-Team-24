import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    Avatar,
    Box,
    IconButton,
    Tooltip,
    Typography,
    TablePagination
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    PersonAdd as PersonAddIcon,
    Info as InfoIcon
} from '@mui/icons-material';

const UserTable = ({ 
    users, 
    type, 
    onCreateGroup, 
    onAwardSuccess, 
    onViewDetails 
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Columns for trainees
    const traineeColumns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'sector', label: 'Sector', minWidth: 120 },
        { id: 'progress', label: 'Course Progress', minWidth: 150 },
        { id: 'mentor', label: 'Assigned Mentor', minWidth: 150 },
        { id: 'actions', label: 'Actions', minWidth: 120 },
    ];

    // Columns for graduates
    const graduateColumns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'sector', label: 'Sector', minWidth: 120 },
        { id: 'followup', label: 'Follow-up Status', minWidth: 150 },
        { id: 'success', label: 'Success Tag', minWidth: 120 },
        { id: 'actions', label: 'Actions', minWidth: 150 },
    ];

    const columns = type === 'trainee' ? traineeColumns : graduateColumns;
    
    // Get mentor name from user id
    const getMentorName = (mentorId) => {
        if (!mentorId) return 'Not Assigned';
        const mentor = users.find(u => u.id === mentorId);
        return mentor ? mentor.name : 'Unknown';
    };

    // Display rows with pagination
    const visibleRows = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="user table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {column.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row) => (
                            <TableRow hover key={row.id}>
                                {/* Name column with avatar */}
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={row.avatar} sx={{ mr: 1, width: 32, height: 32 }} />
                                        <Typography variant="body2">{row.name}</Typography>
                                    </Box>
                                </TableCell>
                                
                                {/* Sector column with tags */}
                                <TableCell>
                                    {row.tags.filter(tag => tag !== 'Success').map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{ mr: 0.5, mb: 0.5 }}
                                        />
                                    ))}
                                </TableCell>
                                
                                {type === 'trainee' ? (
                                    <>
                                        {/* Progress column for trainees */}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box sx={{ width: '100%', mr: 1 }}>
                                                    <Box sx={{ 
                                                        width: '100%', 
                                                        height: 8, 
                                                        borderRadius: 5, 
                                                        bgcolor: 'grey.300',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <Box sx={{ 
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                            width: `${(row.courseProgress / 5) * 100}%`,
                                                            bgcolor: 'primary.main',
                                                            borderRadius: 5
                                                        }} />
                                                    </Box>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {row.courseProgress}/5
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        
                                        {/* Mentor column for trainees */}
                                        <TableCell>
                                            {getMentorName(row.assignedMentorId)}
                                        </TableCell>
                                        
                                        {/* Actions column for trainees */}
                                        <TableCell>
                                            <Button
                                                size="small"
                                                startIcon={<PersonAddIcon />}
                                                variant="outlined"
                                                onClick={() => onCreateGroup(row.id)}
                                            >
                                                Group
                                            </Button>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        {/* Follow-up column for graduates */}
                                        <TableCell>
                                            {row.followUpStatus}
                                        </TableCell>
                                        
                                        {/* Success tag column for graduates */}
                                        <TableCell>
                                            {row.tags.includes('Success') ? (
                                                <Chip 
                                                    icon={<CheckCircleIcon />} 
                                                    label="Yes" 
                                                    color="success" 
                                                    size="small" 
                                                />
                                            ) : (
                                                <Chip 
                                                    label="No" 
                                                    size="small" 
                                                    variant="outlined"
                                                />
                                            )}
                                        </TableCell>
                                        
                                        {/* Actions column for graduates */}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    startIcon={<CheckCircleIcon />}
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={() => onAwardSuccess(row.id)}
                                                    disabled={row.tags.includes('Success')}
                                                >
                                                    Award
                                                </Button>
                                                <Tooltip title="View Details">
                                                    <IconButton 
                                                        size="small"
                                                        onClick={() => onViewDetails(row.id)}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default UserTable;