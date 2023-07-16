import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import InputField from '../../../components/form-field/InputField'
import * as Yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomModal from '../../../components/custom-modal/CustomModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import statisticalApi from '../../../api/statisticalApi'
import { SelectField } from '../../../components/form-field/SelectField'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import roomApi from '../../../api/roomApi';
import { calDiffDates } from '../../../utils/calDiffDates';

export default function Booking(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const { services } = useSelector(state => state.service);
    const [otp, setOtp] = useState('');
    const [statisticalId, setStatisticalId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const numNight = calDiffDates(props.dates[0].startDate, props.dates[0].endDate);

    const selectService = [...services].map(item => {
        return { id: item?._id, name: item?.name_service }
    })

    const initialValues = {
        fullname: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        id_room: '',
        id_service: ''
    }

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required("Fullname is required."),
        age: Yup.number()
            .typeError("Age must be a number.")
            .required("Age is required.")
            .min(18, "Age min is 18.")
            .max(100, "Age max is 100."),
        gender: Yup.string()
            .required("Gender is required."),
        phone: Yup.string()
            .required("Phone number is required.")
            .matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, "Invalid phone number."),
        email: Yup.string()
            .required('Email is required.')
            .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email is invalid."),
    })

    const { control, handleSubmit, setValue, formState: { isValid, isDirty } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    });

    useEffect(() => {
        const getRoom = async() => {
            const response = await roomApi.getRoomById(location?.state?.id_room);
            if (response) {
                setValue("id_room", response?.type_of_room);
            }
        }

        getRoom();
    }, [setValue, location])

    const onsubmit = async (value) => {
        const data = {
            ...value,
            id_room: location?.state?.id_room,
            total: location?.state?.price
        }
        setIsLoading(true);
        const response = await statisticalApi.create(data);
        if (response?.statusCode === 401) {
            alert(response?.message + ", please choose another room.");
            return;
        }
        setStatisticalId(response?._id);
        setIsLoading(false);
        setOpenConfirmModal(true);
    }

    const handleConfirmOtp = async (otp) => {
        const response = await statisticalApi.confirmOtp(statisticalId, otp);
        console.log('res', response);
        if (response?.statusCode === 404) {
            alert(response?.message);
        } else {
            alert("Order successfully!");
            setOpenConfirmModal(false);
            navigate('/');
        }
    }

    return (
        <div className='booking'>
            <Header />
            <div className='container' style={{ padding: '30px 0'}}>
                <div className='row booking-row'>
                    <div className='col-8 col-sm-12'>
                        <div className='booking-info'>
                            <h3>Enter your details</h3>
                            <Box>
                                <InputField
                                    name='fullname'
                                    label='Fullname'
                                    control={control}
                                />
                                <Controller
                                    name='age'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            variant='outlined'
                                            fullWidth
                                            margin='normal'
                                            size='small'
                                            type='number'
                                            label='Age'
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            error={fieldState.error?.message}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                {...field}
                                            >
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            </RadioGroup>
                                            {fieldState.error && <FormHelperText error={fieldState.error?.message}>{fieldState.error?.message}</FormHelperText>}
                                        </FormControl>
                                    )}
                                />
                                <InputField
                                    label='Phone number'
                                    name='phone'
                                    control={control}
                                />
                                <InputField
                                    label='Email'
                                    name='email'
                                    control={control}
                                />
                                <InputField
                                    label='Address'
                                    name='address'
                                    control={control}
                                />
                                <InputField
                                    label='Type of room'
                                    name='id_room'
                                    control={control}
                                    disabled={true}
                                />
                                <SelectField
                                    label='Service'
                                    name='id_service'
                                    control={control}
                                    options={selectService}
                                />
                                <Button
                                    variant='contained'
                                    color='success'
                                    sx={{ margin: '10px 0', width: '100%' }}
                                    disabled={!isValid || !isDirty}
                                    onClick={handleSubmit(onsubmit)}
                                >
                                    {isLoading ? <CircularProgress size={20} color='inherit' /> : 'confirm'} 
                                </Button>
                            </Box>
                        </div>
                    </div>
                    <div className='col-4 col-sm-12'>
                        <div className='booking-info'>
                            <h4>Your booking detail</h4>
                            <div className="booking-info__detail">
                                <div className="checkin">
                                    <p className='bi-title'>Check-in</p>
                                    <h6>{format(props.dates[0].startDate, "MM/dd/yyyy")}</h6>
                                    <p className='from-until'>From 13:00</p>
                                </div>
                                <div className="checkout">
                                    <p className='bi-title'>Check-out</p>
                                    <h6>{format(props.dates[0].endDate, "MM/dd/yyyy")}</h6>
                                    <p className='from-until'>Until 12:00</p>
                                </div>
                            </div>
                            <div className='stay-date'>Total length of stay: {numNight} night</div>
                            <hr style={{ margin: '15px 0'}}/>
                            <h4>Your select</h4>
                            <p className='your-select'>1 room</p>
                            <hr style={{ margin: '15px 0'}}/>
                            <h4>Total: ${location.state?.price * numNight}</h4>
                        </div>
                    </div>
                </div>
            </div>

            {openConfirmModal && (
                <CustomModal
                    open={openConfirmModal}
                    content={
                        <>
                            <Typography variant='h6' component='div'>Enter OTP</Typography>
                            <TextField
                                variant='outlined'
                                fullWidth
                                margin='normal'
                                size='small'
                                type='number'
                                label='OTP'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Typography variant='body2'>We have sent you an email please check and confirm and enter the OTP here!</Typography>
                        </>
                    }
                    actions={
                        <Box width='100%' mr={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Button
                                variant='contained'
                                size='small'
                                color='success'
                                sx={{ marginRight: '1rem' }}
                                onClick={() => handleConfirmOtp(otp)}
                            >
                                confirm
                            </Button>
                            <Button
                                variant='outlined'
                                size='small'
                                color='success'
                                onClick={() => setOpenConfirmModal(false)}
                            >
                                cancel
                            </Button>
                        </Box>
                    }
                />
            )}
            <Footer />
        </div>
    )
}
