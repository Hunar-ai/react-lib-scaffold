import React from 'react';

import TextField from '@mui/material/TextField';

interface NumberFieldProps {
    label?: string;
    name: string;
    id?: string;
    onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (_: React.MouseEvent<HTMLInputElement>) => void;
    value?: string | number | null;
    required?: boolean;
    isExponentAllowed?: boolean;
    helperText?: React.ReactNode;
    fullWidth?: boolean;
    error?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export const NumberField = ({
    label,
    name,
    id,
    onChange,
    onClick,
    value,
    required = false,
    isExponentAllowed = false,
    helperText = '',
    fullWidth = false,
    error = false,
    disabled = false,
    placeholder = ''
}: NumberFieldProps) => {
    return (
        <TextField
            InputProps={{
                inputProps: {
                    min: 0
                }
            }}
            fullWidth={fullWidth}
            required={required}
            type="number"
            label={label}
            name={name}
            id={id}
            onChange={onChange}
            onClick={onClick}
            onKeyDown={e => {
                if (!isExponentAllowed) {
                    ['E', 'e'].includes(e.key) && e.preventDefault();
                }
            }}
            value={value || value === 0 ? value : ''}
            helperText={helperText}
            error={error}
            disabled={disabled}
            placeholder={placeholder}
        />
    );
};
