import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';

import type { SxProps, Theme } from '@mui/material';

import { HelperText } from 'components/common';

interface TimePickerProps {
    sx?: SxProps<Theme>;
    meridiemPlaceholder?: string;
    disabled?: boolean;
    label: React.ReactNode;
    value: Date | string | null;
    hasError?: boolean;
    helperText?: string;
    errorHelperText?: string;
    onChange?: (value: string | Date | null) => void;
    onAccept?: (value: string | Date | null) => void;
}

export const TimePicker = ({
    sx = {},
    meridiemPlaceholder = '',
    disabled = false,
    label,
    value,
    hasError = false,
    helperText = '',
    errorHelperText = '',
    onChange = () => undefined,
    onAccept = () => undefined
}: TimePickerProps) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MuiTimePicker
                    sx={sx}
                    localeText={{
                        fieldMeridiemPlaceholder: ({ format }) => {
                            return meridiemPlaceholder || format;
                        }
                    }}
                    disabled={disabled}
                    label={label}
                    value={value}
                    slotProps={{ textField: { error: hasError } }}
                    onChange={onChange}
                    onAccept={onAccept}
                />
            </LocalizationProvider>
            <HelperText
                msg={helperText}
                errorMsg={errorHelperText}
                hasError={hasError}
            />
        </>
    );
};
