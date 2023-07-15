import { ArrowBack } from '@mui/icons-material';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InputField from '../../../../components/form-field/InputField';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authApi from '../../../../api/authApi';
import { getAllManager } from '../../../../redux/userSlice';

export default function EditUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [userItem, setUserItem] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            const response = await authApi.getById(id);
            setUserItem(response);
            setLoading(false);
        }

        getUser();
    }, [id])

    const initialValues = {
        username: userItem?.username,
        role: userItem?.role,
        more_detail: userItem?.more_detail
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Service name is required."),
        role: Yup.string()
            .required("Role is required.")
            .oneOf([["admin", "staff"], null]).required("Role must be admin or staff.")
        
    })

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    useEffect(() => {
        setValue('username', userItem?.username);
        setValue('role', userItem?.role);
        setValue('more_detail', userItem?.more_detail);
    }, [userItem, setValue])

    const handleUpdate = async (value) => {
        await authApi.update(id, value);
        alert("Update user successfully!");
        dispatch(getAllManager());
        navigate('/admin/users');
    }

    return (
        <div className='add-new'>
            <Sidebar />
            <div className="add-new__container">
                <Navbar />
                <div className='p-2'>
                    <h2 className='add-new__title'>Update user</h2>
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
                        onClick={() => navigate('/admin/users')}
                    >
                        <ArrowBack />
                    </Box>
                    <>
                        {
                            loading ? <Box mt={2}>
                                <CircularProgress size={30} color='primary' />
                            </Box> : (
                                <div className="form-data">
                                    <div className="form-item">
                                        <p className="form-item__name">Service ID</p>
                                        <div className='form-item__input'>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                margin='normal'
                                                size='small'
                                                value={userItem?._id}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">username<span>*</span></p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='username'
                                                control={control}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Role <span>*</span></p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='role'
                                                control={control}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">More detail</p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='more_detail'
                                                control={control}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name"></p>
                                        <div className="form-item__input">
                                            <Button
                                                sx={{ marginTop: '1rem' }}
                                                variant='contained'
                                                onClick={handleSubmit(handleUpdate)}
                                            >
                                                update
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                </div>
            </div>
        </div>
    )
}