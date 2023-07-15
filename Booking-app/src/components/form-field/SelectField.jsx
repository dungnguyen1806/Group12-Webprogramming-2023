import React from 'react'
import { useController } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material'

export function SelectField({ name, control, label, options }) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
    } = useController({ name, control });

    return (
        <FormControl
            margin='normal'
            variant="outlined"
            size="small"
            fullWidth
            error={error?.message}
        >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={label}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                {
                    options.map(option => {
                        return (
                            <MenuItem key={option?._id || option?.id} value={option?._id || option?.id}>{option?.name}</MenuItem>
                        )
                    })
                }
            </Select>
            {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error?.message}</FormHelperText>}
        </FormControl>
    )
}