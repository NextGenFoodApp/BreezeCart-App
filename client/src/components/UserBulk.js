import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Box,
    Avatar,
    Divider,
    Chip,
    useTheme,
    IconButton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import {
    ShoppingBasket as BulkIcon,
    Delete as DeactivateIcon,
    Add as ActivateIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";

const UserBulk = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(0);
    const [currentBulkIds, setCurrentBulkIds] = useState([]);
    const [bulkHistoryIds, setBulkHistoryIds] = useState([]);
    const [bulkDetails, setBulkDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const parsedUser = JSON.parse(storedUser);
                const userId = parsedUser.user_id;
                setUserId(userId);

                const userResponse = await axios.get(`http://localhost:3030/users/${userId}`);
                const userData = userResponse.data;
                setCurrentBulkIds(userData.current_bulk_id || []);
                setBulkHistoryIds(userData.bulk_history || []);

                const bulksResponse = await axios.get('http://localhost:3030/bulks');
                const bulkData = bulksResponse.data.reduce((acc, bulk) => {
                    acc[bulk.bulk_id] = bulk;
                    return acc;
                }, {});
                setBulkDetails(bulkData);
            } catch (error) {
                console.error('Error fetching bulk data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (userId !== 0) {
            axios.post(`http://localhost:3030/users/update-bulks`, {
                userId: userId,
                currentBulks: currentBulkIds,
                bulkHistory: bulkHistoryIds
            }).catch(error => {
                console.error("Failed to sync bulks with server:", error);
            });
        }
    }, [currentBulkIds, bulkHistoryIds]);

    const handleDeactivate = (id) => {
        const newCurrent = currentBulkIds.filter(bulkId => bulkId !== id);
        const newHistory = [...bulkHistoryIds, id];

        setCurrentBulkIds(newCurrent);
        setBulkHistoryIds(newHistory);

        axios.post(`http://localhost:3030/users/deactivate-bulk`, { bulkId: id })
            .catch(error => {
                console.error('Error deactivating bulk:', error);
            });
    };

    const handleActivate = (id) => {
        const newHistory = bulkHistoryIds.filter(bulkId => bulkId !== id);
        const newCurrent = [...currentBulkIds, id];

        setBulkHistoryIds(newHistory);
        setCurrentBulkIds(newCurrent);

        axios.post(`http://localhost:3030/users/activate-bulk`, { bulkId: id })
            .then(() => {
                return axios.post(`http://localhost:3030/users/update-bulks`, {
                    userId,
                    currentBulks: newCurrent,
                    bulkHistory: newHistory
                });
            })
            .catch(error => {
                console.error('Error updating bulks:', error);
                setBulkHistoryIds(bulkHistoryIds);
                setCurrentBulkIds(currentBulkIds);
            });
    };

    const renderBulkItem = (id, isActive) => {
        const details = bulkDetails[id];

        return (
            <Card
                key={id}
                sx={{
                    mb: 2,
                    borderLeft: `4px solid ${isActive ? theme.palette.success.main : theme.palette.error.main}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                        cursor: 'pointer'
                    }
                }}
                onClick={() => {
                    localStorage.setItem('bulk_id', id);
                    navigate('/bulks');
                }}
            >
                <CardContent sx={{ p: 2 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={1}>
                            <Avatar sx={{
                                bgcolor: isActive ? theme.palette.success.light : theme.palette.error.light,
                                color: isActive ? theme.palette.success.contrastText : theme.palette.error.contrastText
                            }}>
                                <BulkIcon />
                            </Avatar>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {details ? details.bulk_name : `Bulk #${id}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {details ? details.description : 'No description available'}
                            </Typography>
                            <Chip
                                icon={
                                    <Box
                                        sx={{
                                            backgroundColor: 'white',
                                            width: 18,           // Adjust background width
                                            height: 18,                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {isActive ? (
                                            <ActiveIcon sx={{ fontSize: 18, color: theme.palette.success.light }} />
                                        ) : (
                                            <InactiveIcon sx={{ fontSize: 18, color: theme.palette.error.light }} />
                                        )}
                                    </Box>
                                }
                                label={isActive ? 'Active' : 'Inactive'}
                                size="small"
                                sx={{
                                    mt: 1,
                                    backgroundColor: isActive ? theme.palette.success.light : theme.palette.error.light,
                                    color: isActive ? theme.palette.success.contrastText : theme.palette.error.contrastText
                                }}
                            />

                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {isActive ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    startIcon={<DeactivateIcon />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeactivate(id);
                                        toast.success('Bulk deactivated');
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 5000);
                                    }}
                                >
                                    Deactivate
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<ActivateIcon />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleActivate(id);
                                        toast.success('Bulk activated');
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 5000);
                                    }}
                                >
                                    Activate
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    return (
        <Card sx={{
            maxWidth: 800,
            margin: 'auto',
            boxShadow: 3,
            borderRadius: 3
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: '27px',
                backgroundColor: theme.palette.primary.main,
                color: 'white'
            }}>
                <BulkIcon fontSize="large" sx={{ mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    My Bulk Purchases
                </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Active Bulks
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            {currentBulkIds.length > 0 ? (
                                currentBulkIds.map(id => renderBulkItem(id, true))
                            ) : (
                                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', p: 2 }}>
                                    No active bulks currently
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Inactive Bulks
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            {bulkHistoryIds.length > 0 ? (
                                bulkHistoryIds.map(id => renderBulkItem(id, false))
                            ) : (
                                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', p: 2 }}>
                                    No inactive bulks available
                                </Typography>
                            )}
                        </Box>
                    </>
                )}
            </CardContent>
            <ToastContainer position="top-center" autoClose={5000} />
        </Card>
    );
};

export default UserBulk;