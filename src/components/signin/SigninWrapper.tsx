import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import signinBGImage from './signin_bg.png';

import { useIsMobile } from 'hooks';

interface SigninWrapperProps {
    children: React.ReactNode;
}

export const SigninWrapper = ({ children }: SigninWrapperProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <Box pt={2}>{children}</Box>;
    }

    return (
        <Grid
            container
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${signinBGImage})`,
                backgroundSize: 'cover'
            }}
            justifyContent="center"
            alignItems="center"
        >
            <Grid
                item
                xs={12}
                sm={9}
                md={4}
                lg={3.5}
                bgcolor="white"
                borderRadius={4}
                sx={{ clear: 'both' }}
            >
                {children}
            </Grid>
        </Grid>
    );
};
