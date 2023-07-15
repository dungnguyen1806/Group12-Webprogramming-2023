import { ArrowBack } from '@mui/icons-material';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import roomApi from '../../../../api/roomApi';
import InputField from '../../../../components/form-field/InputField';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { SelectField } from '../../../../components/form-field/SelectField';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoom } from '../../../../redux/roomSlice';

function EditRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { managers } = useSelector(state => state.manager);
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getRoom = async () => {
            setLoading(true)
            const response = await roomApi.getRoomById(id);
            setRoom(response);
            setLoading(false);
        }

        getRoom();
    }, [id])

    const initialValues = {
        type_of_room: room?.type_of_room,
        max_people: room?.max_people,
        cost_per_day: room?.cost_per_day,
        other_information: room?.other_information || '',
        id_user: room?.id_user
    }

    const validationSchema = Yup.object().shape({
        type_of_room: Yup.string()
            .required("Type is required."),
        max_people: Yup.number()
            .typeError("Max people must be a number.")
            .required("Max people is required."),
        cost_per_day: Yup.number()
            .typeError("Cost must be a number.")
            .required("Cost is required.")
            .min(1, "The smallest is 1.")
    })

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const selectManager = [...managers].map(item => {
        return { id: item?._id, name: item?.username }
    })

    useEffect(() => {
        setValue('cost_per_day', room?.cost_per_day);
        setValue('max_people', room?.max_people);
        setValue('other_information', room?.other_information);
        setValue('type_of_room', room?.type_of_room);
        setValue('id_user', room?.id_user);
    }, [room, setValue])

    const handleUpdate = async (value) => {
        await roomApi.update(room?._id, value);
        alert("Update room successfully!");
        dispatch(getAllRoom());
        navigate('/admin/homestays');
    };

    return (
        <div className='add-new'>
            <Sidebar />
            <div className="add-new__container">
                <Navbar />
                <div className='p-2'>
                    <h2 className='add-new__title'>Update room</h2>
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
                        onClick={() => navigate('/admin/homestays')}
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
                                        <p className="form-item__name">Room ID</p>
                                        <div className='form-item__input'>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                margin='normal'
                                                size='small'
                                                value={room?._id}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Type of room <span>*</span></p>
                                        <div className='form-item__input'>
                                            <SelectField
                                                name='type_of_room'
                                                control={control}
                                                options={[
                                                    { id: 'hotel', name: 'Hotels' },
                                                    { id: 'apartment', name: 'Apartments' },
                                                    { id: 'resort', name: 'Resorts' },
                                                    { id: 'villa', name: 'Villas' },
                                                    { id: 'cabin', name: 'Cabins' },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Manager</p>
                                        <div className='form-item__input'>
                                            <SelectField
                                                name='id_user'
                                                control={control}
                                                options={selectManager}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Max people</p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='max_people'
                                                control={control}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Cost(1 day)</p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='cost_per_day'
                                                control={control}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-item__name">Other information</p>
                                        <div className='form-item__input'>
                                            <InputField
                                                name='other_information'
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

export default EditRoom;