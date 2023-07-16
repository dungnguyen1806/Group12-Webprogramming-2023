import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import InputField from '../../../../components/form-field/InputField'
import { Button, FormControl, FormHelperText, InputAdornment, OutlinedInput } from '@mui/material'
import { SelectField } from '../../../../components/form-field/SelectField'
import { useSelector } from 'react-redux'
import roomApi from '../../../../api/roomApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllRoom } from '../../../../redux/roomSlice'

export default function AddNewRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { destinations } = useSelector(state => state.destination);
    const { managers } = useSelector(state => state.manager);
    const [listDestinations, setListDestinations] = useState([]);
    const [listManager, setListManager] = useState([]);

    useEffect(() => {
        setListDestinations([...destinations]);
        setListManager([...managers]);
    }, [destinations, managers])

    const selectDestination = listDestinations.map(item => {
        return { id: item?._id, name: item?.name_location }
    })

    const selectManager = listManager.map(item => {
        return { id: item?._id, name: item?.username }
    })

    const initialValues = {
        id_user: '',
        id_location: '',
        type_of_room: '',
        max_people: 0,
        cost_per_day: 0,
        other_information: ''
    }
    
    const validationSchema = Yup.object().shape({
        id_location: Yup.string()
            .required("Destination is required."),
        id_user: Yup.string()
            .required("Manager room is required."),
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

    const { control, formState: { isDirty, isValid }, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const onsubmit = async (value) => {
        await roomApi.create(value);
        alert('Add room successfully!');
        dispatch(getAllRoom());
        navigate('/admin/homestays');
    }
    
    return (
        <div className='form-data'>
            <div className="form-item">
                <p className="form-item__name">Destination <span>*</span></p>
                <div className='form-item__input'>
                    <SelectField
                        name='id_location'
                        control={control}
                        options={selectDestination}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Manger room <span>*</span></p>
                <div className='form-item__input'>
                    <SelectField
                        name='id_user'
                        control={control}
                        options={selectManager}
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
                            { id: 'Grand Suite', name: 'Grand Suite' },
                            { id: 'Deluxe Twin', name: 'Deluxe Twin' },
                            { id: 'Superior Triple', name: 'Superior Triple' },
                            { id: 'Executive Suite', name: 'Executive Suite' },
                            { id: 'Premium Triple', name: 'Premium Triple' },
                            { id: 'Presidential Suite', name: 'Presidential Suite' },
                            { id: 'Apartment', name: 'Apartment' }
                        ]}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Max people <span>*</span></p>
                <div className='form-item__input'>
                    <InputField
                        name='max_people'
                        type='number'
                        control={control}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Cost <span>*</span></p>
                <div className='form-item__input'>
                    <Controller
                        name='cost_per_day'
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
                        disabled={!isValid || !isDirty}
                        onClick={handleSubmit(onsubmit)}
                    >
                        create room
                    </Button>
                </div>
            </div>
        </div>
    )
}
