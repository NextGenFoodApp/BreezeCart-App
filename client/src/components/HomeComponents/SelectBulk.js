import React, {useState, useEffect} from "react";
import { Fab, Drawer, Box, Typography, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const SelectBulk = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [currentBulks, setCurrentBulks] = useState([]);
    const [storedBulkId, setStoredBulkId] = useState(JSON.parse(localStorage.getItem('bulk_id')));

    useEffect(() => {
        setStoredBulkId(JSON.parse(localStorage.getItem('bulk_id')));
    }, []);

    const fetchUserData = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log('Parsed user:', parsedUser);

                if (parsedUser && parsedUser.user_id) {
                    try {
                        const response = await axios.get(`http://localhost:3030/users/${parsedUser.user_id}`);
                        setCurrentBulks(response.data.current_bulk_id);
                        console.log('Current Bulks:', response.data.current_bulk_id);
                    } catch (error) {
                        console.error('Error fetching user data from API:', error);
                    }
                } else {
                    console.error('No user ID found in the parsed user object');
                }
            } else {
                console.error('No user found in localStorage');
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredBulkId(localStorage.getItem('bulk_id'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleButtonClick = (bulk_id) => {
        localStorage.setItem('bulk_id', bulk_id);
        setStoredBulkId(bulk_id);
    };

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleDrawerOpen}
                    style={{ position: 'fixed', right: 20, bottom: '70%', transform: 'translateY(50%)' }}
                >
                    <AddIcon />
                </Fab>

                <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={handleDrawerClose}
                >
                    <Box
                        sx={{ width: 250, padding: 2 }}
                        role="presentation"
                    >
                        <IconButton onClick={handleDrawerClose}>
                            <CloseIcon />
                        </IconButton>
                        <div>
                            <Typography variant='h4' align='center' gutterBottom>Bulks</Typography>
                            <Box display='flex' alignItems='center' justifyContent='center'>
                                {
                                    currentBulks.map((bulk_id)=>(
                                        <Button key={bulk_id} onClick={() => handleButtonClick(bulk_id)}
                                                variant= {storedBulkId === bulk_id ? 'contained' : 'outlined'}>
                                            Bulk {bulk_id}
                                        </Button>
                                    ))
                                }
                            </Box>
                        </div>
                    </Box>
                </Drawer>
            </div>
        </div>
    )
}

export default SelectBulk