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
import { useDispatch } from 'react-redux'
import serviceApi from '../../../../api/serviceApi';
import { getAllService } from '../../../../redux/serviceSlice';

export default function EditService() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [serviceItem, setServiceItem] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getService = async () => {
            setLoading(true)
            const response = await serviceApi.getById(id);
            setServiceItem(response);
            setLoading(false);
        }

        getService();
    }, [id])

    const initialValues = {
        name_service: serviceItem?.name_service,
        cost: serviceItem?.cost,
        more_detail: serviceItem?.more_detail
    }

    const validationSchema = Yup.object().shape({
        name_service: Yup.string()
            .required("Service name is required."),
        cost: Yup.number()
            .typeError("Cost must be a number.")
            .required("Cost is required.")
            .min(1, "The smallest is 1.")
    })

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    useEffect(() => {
        setValue('name_service', serviceItem?.name_service);
        setValue('cost', serviceItem?.cost);
        setValue('more_detail', serviceItem?.more_detail);
    }, [serviceItem, setValue])

    const handleUpdate = async (value) => {
        await serviceApi.update(serviceItem?._id, value);
        alert("Update service successfully!");
        dispatch(getAllService());
        navigate('/admin/services');
    }

    return (
        <div className='add-new'>
            <Sidebar />
            <div className="add-new__container">
                <Navbar />
                <div className='p-2'>
                    <h2 className='add-new__title'>Update service</h2>
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
                        onClick={() => navigate('/admin/services')}
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
                                                value={serviceItem?._id}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Service name<span>*</span></p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='name_service'
                                                control={control}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Cost<span>*</span></p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='cost'
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