import React from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

interface Props {
    children?: React.ReactNode;
    isFullScreen?: boolean;
}

export const LoaderBackdrop = ({ children, isFullScreen = true }: Props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                zIndex: theme.zIndex.drawer + 10,
                position: isFullScreen ? 'fixed' : 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            id="sheen"
        >
            {children}
        </Box>
    );
};
