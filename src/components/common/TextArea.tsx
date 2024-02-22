import React from 'react';
import { useTheme } from '@mui/material/styles';

import { grey } from '@mui/material/colors';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import { asteriskStyle } from 'App';

interface TextAreaProps {
    minRows?: number;
    maxRows?: number;
    name: string;
    placeholder: string;
    onChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (_: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (_: React.FocusEvent<HTMLTextAreaElement>) => void;
    onClick?: (e: React.MouseEvent | React.SyntheticEvent) => void;
    required?: boolean;
    value?: string;
    showCharHelpText?: boolean;
    maxLength?: number;
    minLength?: number;
    error?: boolean;
    helperText?: React.ReactNode;
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
    disabled?: boolean;
}

export const TextArea = ({
    minRows = 2,
    maxRows = 3,
    name,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    onClick,
    required = false,
    value = '',
    showCharHelpText = false,
    maxLength = 200,
    minLength,
    error = false,
    helperText = '',
    resize = 'both',
    disabled = false
}: TextAreaProps) => {
    const theme = useTheme();

    const getHelperText = React.useCallback(() => {
        const numberOfCharacters = value ? value.length : 0;
        const remainingCharacters = maxLength - numberOfCharacters;
        if (minLength && numberOfCharacters < minLength) {
            const requiredCharacters = minLength - numberOfCharacters;
            const textPostFix = numberOfCharacters
                ? 'more character required'
                : 'characters required';
            return `${requiredCharacters} ${textPostFix}`;
        }
        const textPostFix = numberOfCharacters
            ? 'characters remaining'
            : 'characters';
        return numberOfCharacters > 1
            ? `${remainingCharacters} ${textPostFix}`
            : '';
    }, [value, maxLength, minLength]);

    return (
        <Box
            sx={{
                position: 'relative',
                '.textarea': {
                    borderColor: error ? theme.palette.error.main : grey[400]
                },
                '.textarea:hover': {
                    borderColor: error ? undefined : grey[900]
                }
            }}
        >
            <TextareaAutosize
                className="textarea"
                minRows={minRows}
                maxRows={maxRows}
                disabled={disabled}
                style={{
                    width: '100%',
                    outlineColor: error ? theme.palette.error.main : undefined,
                    borderRadius: 4,
                    padding: '16px 13px',
                    fontFamily: 'Lato',
                    fontSize: 16,
                    marginBottom: '-6px',
                    resize
                }}
                name={name}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onClick}
                value={value}
            />
            <Typography
                aria-hidden="true"
                sx={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                    display: value ? 'none' : 'inherit',
                    position: 'absolute',
                    top: 11,
                    left: 13,
                    color: error ? theme.palette.error.main : grey['A700'],
                    opacity: 1,
                    fontFamily: 'Lato',
                    fontSize: 16
                }}
            >
                {placeholder}
                <Typography component="span" sx={{ ...asteriskStyle }}>{`${
                    required ? ' *' : ''
                }`}</Typography>
            </Typography>
            <Grid container justifyContent="space-between">
                {helperText && (
                    <Typography
                        component="span"
                        align="left"
                        variant="caption"
                        mt="3px"
                        mr="14px"
                        ml="14px"
                        color={
                            error || maxLength - value.length < 0
                                ? theme.palette.error.main
                                : ''
                        }
                    >
                        {helperText}
                    </Typography>
                )}
                {showCharHelpText && (
                    <Typography
                        component="div"
                        align="right"
                        variant="caption"
                        mt="3px"
                        color={
                            maxLength - value.length < 0 ||
                            (minLength &&
                                value.length > 3 &&
                                value.length < minLength)
                                ? theme.palette.error.main
                                : ''
                        }
                    >
                        {value.length > 3 && getHelperText()}
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};
