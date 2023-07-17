import React from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-field/InputField'
import { Button } from '@mui/material'
import destinationApi from '../../../../api/destinationApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllDestination } from '../../../../redux/destinationSlice'
export default function AddNewLocation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        name_location: '',
        address: '',
        more_detail: ''
    }
    
    const validationSchema = Yup.object().shape({
        name_location: Yup.string()
            .required("Location name is required."),
        address: Yup.string()
            .required("Address is required."),
    })

    const { control, formState: { isDirty, isValid }, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const onsubmit = async (value) => {
        try {
            await destinationApi.create(value);
            dispatch(getAllDestination());
            alert('Add destination successfully!');
            navigate('/admin/rooms');
        } catch (error) {
            alert('Error');
        }
    }
    
    return (
        <div className='form-data'>
            <div className="form-item">
                <p className="form-item__name">Location name <span>*</span></p>
                <div className='form-item__input'>
                    <InputField
                        name='name_location'
                        control={control}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Address <span>*</span></p>
                <div className='form-item__input'>
                    <InputField
                        name='address'
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
                        disabled={!isValid || !isDirty}
                        onClick={handleSubmit(onsubmit)}
                    >
                        create location
                    </Button>
                </div>
            </div>
        </div>
    )
}
