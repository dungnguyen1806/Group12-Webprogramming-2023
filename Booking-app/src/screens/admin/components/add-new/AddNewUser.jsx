import React from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-field/InputField'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { SelectField } from '../../../../components/form-field/SelectField'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import authApi from '../../../../api/authApi'
import { useDispatch } from 'react-redux'
import { getAllManager } from '../../../../redux/userSlice'

export default function AddNewUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        username: '',
        password: '',
        role: '',
        more_detail: ''
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Mininum of 6 characters.')
            .max(20, 'Maximum of 20 characters.'),
        role: Yup.string()
            .required('Type is required')
        
    })

    const { control, formState: {isDirty,isValid}, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const onsubmit = async (value) => {
        await authApi.register(value);
        alert("Add user successfully!");
        dispatch(getAllManager());
        navigate('/admin/users');
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
                onClick={() => navigate('/admin/users')}
            >
                <ArrowBack />
            </Box>
            <div className="form-item">
                <p className="form-item__name">Username <span>*</span></p>
                <div className='form-item__input'>
                    <InputField
                        name='username'
                        control={control}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Password <span>*</span></p>
                <div className='form-item__input'>
                    <InputField
                        name='password'
                        type='password'
                        control={control}
                    />
                </div>
            </div>
            <div className="form-item">
                <p className="form-item__name">Role <span>*</span></p>
                <div className='form-item__input'>
                    <SelectField
                        name='role'
                        control={control}
                        options={[
                            { id: 'admin', name: 'Admin' },
                            {id: 'staff', name: 'Staff'}
                        ]}
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
                        create user</Button>
                </div>
            </div>
        </div>
    )
}
