import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { Link } from 'react-router-dom'
import CustomModal from '../../../components/custom-modal/CustomModal';
import serviceApi from '../../../api/serviceApi';
import { getAllService } from '../../../redux/serviceSlice';

export default function ListRoomPage() {
  const dispatch = useDispatch();
  const { services } = useSelector(state => state.service); 
  const [listService, setListService] = useState([]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setListService([...services]);
  }, [services])

  const handleDelete = async (id) => {
    await serviceApi.delete(id);
    alert('Delete service successfully!');
    dispatch(getAllService());
    setOpenConfirmDelete(false);
  }

  return (
    <div className='admin-list'>
      <Sidebar />
      <div className="admin-list__container">
        <Navbar />
        <div className='data-table'>
          <div className="data-table__title">
            <span>List Service</span>
            <Link
              to='/admin/services/new-service'
              className="data-table__title-link"
            >
              Add New Service
            </Link>
          </div>
          <Box sx={{ flex: 6, width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align='left'
                      sx={{ fontWeight: 600, minWidth: '100px' }}
                    >
                      Service ID
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '150px' }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '120px' }}
                    >
                      Service Price
                    </TableCell>
                    {/* <TableCell
                      align='left'
                      sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '130px' }}
                    >
                      Room
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '120px' }}
                    >
                      Room Price
                    </TableCell> */}
                    <TableCell
                      align='left'
                      sx={{ fontWeight: 600, minWidth: '200px' }}
                    >
                      Detail
                    </TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listService.map((item, index) => {
                    return (
                      <TableRow key={index} >
                        <TableCell align='left'>{item?._id}</TableCell>
                        <TableCell align='left'>
                          {item?.name_service}
                        </TableCell>
                        <TableCell align='left'>${item?.cost}</TableCell>
                        {/* <TableCell align='left'>
                          {item?.id_room ? <span>{item?.id_room?.type_of_room}</span> : <span style={{ color: 'red' }}>No room</span>}
                        </TableCell>
                        <TableCell align='left'>
                          {item?.id_room ? `$${item?.id_room?.cost_per_day}` : '$0'}
                        </TableCell> */}
                        <TableCell align='left'>
                          {item?.more_detail}
                        </TableCell>
                        <TableCell align='right' sx={{ display: 'flex', alignItems: 'center' }}>
                          <div className="cellAction">
                            <Link to={`/admin/services/${item?._id}`} style={{ textDecoration: "none" }}>
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
                </TableBody>
              </Table>
            </TableContainer>
            <div>
              {openConfirmDelete && (
                <CustomModal
                  open={openConfirmDelete}
                  content={
                    <Typography variant='body1' component='div'>Do you want to delete this service?</Typography>
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
