import * as React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

import SuccessTickIcon from 'components/common/TickCircleGreen.png';

export interface UploadStatus {
    status: 'loading' | 'success' | 'error' | 'warning';
    message: string;
}

export interface UploadStatusProps {
    uploadStatus: UploadStatus;
    iconSize?: number; // in px
}

export const UploadStatusBox: React.FC<UploadStatusProps> = ({
    uploadStatus,
    iconSize = 40
}) => {
    const getIcon = React.useCallback(() => {
        switch (uploadStatus.status) {
            case 'loading':
                return <CircularProgress />;
            case 'error':
                return <ErrorIcon fontSize="large" color="error" />;
            case 'warning':
                return <WarningIcon fontSize="large" color="warning" />;
            case 'success':
                return (
                    <img
                        src={SuccessTickIcon}
                        alt="success"
                        style={{
                            width: iconSize,
                            height: iconSize
                        }}
                    />
                );
            default:
                return <CircularProgress />;
        }
    }, [uploadStatus.status, iconSize]);

    return (
        <Grid container spacing={2} alignItems="center" direction={'column'}>
            <Grid item>{getIcon()}</Grid>
            <Grid item>
                <Box>
                    <Typography variant="body1" align="center">
                        {uploadStatus?.message}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};
