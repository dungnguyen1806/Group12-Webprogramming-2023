import React from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import InputField from '../../../../components/form-field/InputField'
import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { SelectField } from '../../../../components/form-field/SelectField'
import { useSelector, useDispatch } from 'react-redux'
import serviceApi from '../../../../api/serviceApi'
import { getAllService } from '../../../../redux/serviceSlice'

export default function AddNewService() {
    const dispatch = useDispatch();
    const { rooms } = useSelector(state => state.room);
    const navigate = useNavigate();

    const initialValues = {
        name_service: '',
        cost: 0,
        id_room: '',
        more_detail: ''
    }

    const selectRoom = [...rooms].map(item => {
        return { id: item?._id, name: item?.type_of_room };
    })
    
    const validationSchema = Yup.object().shape({
        name_service: Yup.string()
            .required("Service name is required."),
        id_room: Yup.string()
            .required("Room is required."),
        cost: Yup.number()
            .typeError("Cost must be a number.")
            .required("Cost is required.")
            .min(1, "The smallest is 1.")
    })

    const { control, formState: { isDirty, isValid }, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const onsubmit = async (value) => {
        const response = await serviceApi.create(value);
        if (response?.statusCode === 404 || response?.statusCode === 403) {
            alert("Error");
        } else {
            alert('Add service successfully!');
            dispatch(getAllService());
            navigate('/admin/services');
        }
    }

    return (
        <div className='form-data'>
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
            <div className="form-item">
                <p className="form-item__name">Service name <span>*</span></p>
                <div className='form-item__input'>
                    <InputField
                        name='name_service'
                        control={control}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Room <span>*</span></p>
                <div className='form-item__input'>
                    <SelectField
                        name='id_room'
                        control={control}
                        options={selectRoom}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Cost <span>*</span></p>
                <div className='form-item__input'>
                    <Controller
                        name='cost'
                        control={control}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <FormControl fullWidth size='small' margin='normal'>
                                    <OutlinedInput
                                        type='number'
                                        id="outlined-adornment-amount"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        error={error?.message}
                                    />
                                    {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error?.message}</FormHelperText>}
                                </FormControl>
                            )
                        }}
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
                        disabled={!isValid || !isDirty}
                        onClick={handleSubmit(onsubmit)}
                    >
                        create service
                    </Button>
                </div>
            </div>
        </div>
    )
}
