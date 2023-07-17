import { ArrowBack } from '@mui/icons-material'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddNewLocation from '../components/add-new/AddNewLocation'
import AddNewRoom from '../components/add-new/AddNewRoom'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AddRoomPage() {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
      setTabValue(newValue);
    };

    return (
        <div className='add-new'>
            <Sidebar />
            <div className="add-new__container">
                <Navbar />
                <div className='p-2'>
                    <h2 className='add-new__title'>add room</h2>
                    <Box mb={2}
                        sx={{
                            backgroundColor: 'gray',
                            color: '#fff',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/admin/rooms')}
                    >
                        <ArrowBack />
                    </Box>
                    <Box>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Add new room" {...a11yProps(0)} />
                                <Tab label="Add new location" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabValue} index={0}>
                            <AddNewRoom />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <AddNewLocation />
                        </TabPanel>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default (AddRoomPage);