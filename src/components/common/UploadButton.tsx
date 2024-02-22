import React from 'react';

import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { ALLOWED_EXTENSION } from 'Enum';

interface UploadButtonProps {
    size?: 'small' | 'medium';
    isLoading?: boolean;
    name: string;
    value?: string;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
    acceptFileType?: Array<ALLOWED_EXTENSION>;
    fullWidth?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove?: (_: string) => void;
    onClick?: (
        e:
            | React.MouseEvent<Element, MouseEvent>
            | React.SyntheticEvent<Element, Event>
    ) => void;
}

export const UploadButton = ({
    size = 'medium',
    isLoading = false,
    name,
    value,
    required = false,
    error = false,
    disabled = false,
    acceptFileType,
    fullWidth = true,
    onChange,
    onRemove,
    onClick
}: UploadButtonProps) => {
    const theme = useTheme();
    const getFormattedValue = (value: string, requiredLength: number) => {
        const firstPart = value?.slice(
            value?.lastIndexOf('/') + 1,
            value?.lastIndexOf('/') + requiredLength
        );
        const shortOfFirstPart = firstPart?.length || 0;
        let formattedFirstPart =
            shortOfFirstPart < requiredLength - 1 && shortOfFirstPart > 0
                ? `${requiredLength - 1 - shortOfFirstPart}`
                : firstPart;
        if (shortOfFirstPart < requiredLength - 1 && shortOfFirstPart > 0) {
            for (let i = 0; i < requiredLength - 1 - shortOfFirstPart; i++) {
                formattedFirstPart += '.';
            }
        }
        const extension = value?.slice(value?.lastIndexOf('.'), value?.length);
        const formattedValue = `${formattedFirstPart}...${extension}`;
        return formattedValue;
    };

    return (
        <>
            {isLoading ? (
                <LoadingButton
                    variant="contained"
                    loading
                    fullWidth={fullWidth}
                    size={size}
                >
                    UPLOAD
                </LoadingButton>
            ) : value ? (
                required ? (
                    <Button
                        component="label"
                        fullWidth={fullWidth}
                        onClick={onClick}
                    >
                        {getFormattedValue(value, 15)}
                        <input
                            type="file"
                            hidden
                            onChange={onChange}
                            name={`${name}`}
                            accept={acceptFileType?.join(',')}
                        />
                    </Button>
                ) : (
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        columnGap={1}
                    >
                        <Grid item xs={9} display="flex" justifyContent="end">
                            <Typography
                                variant="body2"
                                noWrap
                                component="div"
                                gutterBottom
                            >
                                {getFormattedValue(value, 9)}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} display="flex" justifyContent="end">
                            <IconButton
                                onClick={() => onRemove?.(name)}
                                size="small"
                            >
                                <ClearIcon fontSize="small" color="error" />
                            </IconButton>
                        </Grid>
                    </Grid>
                )
            ) : (
                <Button
                    fullWidth={fullWidth}
                    variant="outlined"
                    component="label"
                    disabled={disabled}
                    sx={
                        error
                            ? { borderColor: theme.palette.error.main }
                            : undefined
                    }
                    color={error ? 'error' : undefined}
                    onClick={onClick}
                >
                    UPLOAD
                    <input
                        type="file"
                        hidden
                        onChange={onChange}
                        name={`${name}`}
                        accept={acceptFileType?.join(',')}
                    />
                </Button>
            )}
        </>
    );
};
