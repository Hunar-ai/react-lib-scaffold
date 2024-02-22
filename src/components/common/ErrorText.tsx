import React from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface ErrorTextProps {
    children: React.ReactNode;
}

export const ErrorText = ({ children }: ErrorTextProps) => {
    const theme = useTheme();

    return (
        <Grid
            container
            alignItems="center"
            columnGap={1}
            color={theme.palette.error.main}
            component="span"
        >
            <ErrorOutlineIcon fontSize="small" />
            <Grid item xs component="span">
                <Typography component="span" variant="caption">
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
};
