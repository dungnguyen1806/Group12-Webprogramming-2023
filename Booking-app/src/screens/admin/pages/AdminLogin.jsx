import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../components/form-field/InputField'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Typography, CircularProgress } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import authApi from '../../../api/authApi'
import { useDispatch } from 'react-redux'
import { getDataManager } from '../redux/authSlice'

export default function AdminLogin() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required.'),
        password: Yup.string()
            .required('Username is required.')
    })

    const { control, formState: { isDirty, isValid }, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    });

    const onSubmit = async (value) => {
        setIsLoading(true);
        const response = await authApi.login(value);
        setIsLoading(false);
        
        if (response?.statusCode === 403 || response?.statusCode === 404) {
            setErrorMessage("Username or password incorrect")
        } else {
            localStorage.setItem('managerInfo', JSON.stringify(response));
            navigate('/admin');
            setErrorMessage("");
            dispatch(getDataManager());
        }
    }

    return (
        <Box sx={{
            width: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '25vh auto',
            backgroundColor: '#dfe4ea'
        }}>
            <Box my={3} mx={2} sx={{ width: '100%'}}>
                <Typography mb={2} sx={{ textAlign: 'center', fontSize: 32 }}>Login</Typography>
                <InputField
                    label='Username'
                    name='username'
                    control={control}
                />
                <InputField
                    label='Password'
                    name='password'
                    type='password'
                    control={control}
                />
                <span style={{ color: 'red' }}>{errorMessage}</span>
                <Button
                    disabled={!isValid || !isDirty}
                    variant='contained'
                    startIcon={<LoginIcon />}
                    fullWidth
                    color='success'
                    size='small'
                    sx={{ marginTop: 2 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    {isLoading ? <CircularProgress size={24} color='inherit' /> : 'Login'}
                </Button>
            </Box>
        </Box>
    )
}
