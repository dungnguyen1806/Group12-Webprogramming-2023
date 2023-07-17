import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { Link } from 'react-router-dom'
import CustomModal from '../../../components/custom-modal/CustomModal';
import roomApi from '../../../api/roomApi';
import { getAllRoom } from '../../../redux/roomSlice';

export default function ListRoomPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { rooms } = useSelector(state => state.room);
    const [listRoom, setListRoom] = useState([]);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [item, setItem] = useState(null);
    const [staffRoom, setStaffRoom] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setListRoom([...rooms]);
    }, [rooms])

    useEffect(() => {
        const getRoomByUser = async () => {
            setIsLoading(true);
            const response = await roomApi.getRoomByUser(user?._id);
            setStaffRoom(response);
            setIsLoading(false);
        }

        getRoomByUser();
    }, [user])

    const handleDelete = async (id) => {
        await roomApi.delete(id);
        alert('Delete room successfully!');
        dispatch(getAllRoom());
        setOpenConfirmDelete(false);
    }

    return (
        <div className='admin-list'>
            <Sidebar />
            <div className="admin-list__container">
                <Navbar />
                <div className='data-table'>
                    <div className="data-table__title">
                        <span>List Room</span>
                        {
                            user?.role === 'admin' && <Link
                                to='/admin/rooms/new-room'
                                className="data-table__title-link"
                            >
                                Add New Room
                            </Link>
                        }
                    </div>
                    <Box sx={{ flex: 6, width: '100%', overflow: 'hidden'}}>
                        <TableContainer>
                            <Table aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, minWidth: '50px' }}
                                        >
                                            Room ID
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '150px' }}
                                        >
                                            Destination
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '100px' }}
                                        >
                                            Type
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, minWidth: '100px' }}
                                        >
                                            Max people
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, width: '100px' }}
                                        >
                                            Price
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, width: '120px' }}
                                        >
                                            Manager
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, minWidth: '150px' }}
                                        >
                                            Other information
                                        </TableCell>
                                        <TableCell align='right'>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user?.role === 'admin' && listRoom.map((item, index) => {
                                        return (
                                            <TableRow key={index} >
                                                <TableCell align='left'>{item?._id}</TableCell>
                                                <TableCell align='left'>
                                                    {item?.id_location?.name_location}
                                                </TableCell>
                                                <TableCell align='left'>{item?.type_of_room}</TableCell>
                                                <TableCell align='left'>{item?.max_people}</TableCell>
                                                <TableCell align='left'>${item?.cost_per_day}</TableCell>
                                                <TableCell align='left'>{item?.id_user?.username ? item?.id_user?.username : "Not yet"}</TableCell>
                                                <TableCell align='left'>
                                                    {item?.other_information}
                                                </TableCell>
                                                <TableCell align='right' sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="cellAction">
                                                        <Link to={`/admin/rooms/${item?._id}`} style={{ textDecoration: "none" }}>
                                                            <div className="viewButton">Update</div>
                                                        </Link>
                                                        <div
                                                            className="deleteButton"
                                                            onClick={() => { setOpenConfirmDelete(true); setItem(item?._id) }}
                                                        >
                                                            Delete
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    {isLoading ? <CircularProgress size={30} color='primary' style={{ margin: '10px auto' }} /> :
                                        (user?.role === 'staff' && staffRoom.map((item, index) => { 
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell align='left'>{item?._id}</TableCell>
                                                    <TableCell align='left'>
                                                        {item?.id_location?.name_location}
                                                    </TableCell>
                                                    <TableCell align='left'>{item?.type_of_room}</TableCell>
                                                    <TableCell align='left'>{item?.max_people}</TableCell>
                                                    <TableCell align='left'>{item?.cost_per_day && '$' + item?.cost_per_day }</TableCell>
                                                    <TableCell align='left'>{item?.id_user?.username ? item?.id_user?.username : "Not yet"}</TableCell>
                                                    <TableCell align='left'>
                                                        {item?.other_information}
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {item?._id ? <div className="cellAction">
                                                            <Link to={`/admin/rooms/${item?._id}`} style={{ textDecoration: "none" }}>
                                                                <div className="viewButton">Update</div>
                                                            </Link>
                                                        </div> : ''}
                                                    </TableCell>
                                                </TableRow>
                                            )}))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div>
                            {openConfirmDelete && (
                                <CustomModal
                                    open={openConfirmDelete}
                                    content={
                                        <Typography variant='body1' component='div'>Do you want to delete this room?</Typography>
                                    }
                                    actions={
                                        <Box width='100%' ml={2} mr={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Button
                                                variant='contained'
                                                size='small'
                                                sx={{ marginRight: '1rem' }}
                                                onClick={() => handleDelete(item)}
                                            >
                                                yes
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                size='small'
                                                onClick={() => setOpenConfirmDelete(false)}
                                            >
                                                no
                                            </Button>
                                        </Box>
                                    }
                                />
                            )}
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}
