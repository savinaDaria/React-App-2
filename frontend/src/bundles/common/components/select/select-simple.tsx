import React from 'react';
import { Select as MuiSelect, type SelectProps, MenuItem, FormControl, InputLabel } from '@mui/material';


type CustomSelectProps = SelectProps & {
    options: { value: string | number; label: string }[];
    label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, label, ...selectProps }) => {
    return (
        <FormControl fullWidth>
            {label && <InputLabel>{label}</InputLabel>}
            <MuiSelect {...selectProps}>
                 <MenuItem disabled value="">
                    <em>Move to:</em>
                </MenuItem>
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export { CustomSelect };
