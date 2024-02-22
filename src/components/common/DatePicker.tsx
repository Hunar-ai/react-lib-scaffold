import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateView } from '@mui/x-date-pickers';

import { useIsMobile } from 'hooks';
import { FIELD_SIZE } from 'Enum';
import { DateTimeFormat, type DateTimeInputFormat } from 'utils';

interface DatePickerProps {
    name?: string;
    id?: string;
    onChange?: (_: Date | null) => void;
    minDate?: Date;
    value?: string | null;
    label: React.ReactNode;
    inputFormat?: DateTimeInputFormat;
    error?: boolean;
    helperText?: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: FIELD_SIZE;
    placeholder?: string;
    onClick?: (e: React.SyntheticEvent) => void;
}
export const DatePicker = (props: DatePickerProps) => {
    const {
        onChange = () => undefined,
        minDate,
        value = null,
        label,
        inputFormat = DateTimeFormat.DATE_PICKER_FORMAT,
        error = false,
        helperText,
        disabled = false
    } = props;

    const isMobile = useIsMobile();

    const isYear = inputFormat === DateTimeFormat.DATE_PICKER_YEAR_FORMAT;
    const views: readonly DateView[] = isYear ? ['year'] : ['year', 'day'];
    const openTo = isYear ? 'year' : 'day';

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {isMobile ? (
                    <MobileDatePicker
                        label={label}
                        format={inputFormat}
                        onChange={onChange}
                        minDate={minDate}
                        views={views}
                        openTo={openTo}
                        value={value ? new Date(value) : null}
                        disabled={disabled}
                        sx={{ width: '100%' }}
                        slotProps={{ textField: { error } }}
                    />
                ) : (
                    <DesktopDatePicker
                        format={inputFormat}
                        label={label}
                        value={value ? new Date(value) : null}
                        minDate={minDate}
                        onChange={onChange}
                        onMonthChange={onChange}
                        onYearChange={onChange}
                        views={views}
                        openTo={openTo}
                        disabled={disabled}
                        sx={{ width: '100%' }}
                        slotProps={{ textField: { error } }}
                    />
                )}
            </LocalizationProvider>
            {helperText}
        </>
    );
};
