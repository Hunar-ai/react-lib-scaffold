import * as React from 'react';

import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const fileTypes = {
    all: {
        name: 'all',
        extensions: ['*'],
        uploadText: 'Drag & Drop your files here'
    },
    csv: {
        name: 'csv',
        extensions: ['.csv'],
        uploadText: 'Drag & Drop your CSV file here'
    }
};

interface DropzoneUploadAreaProps {
    onDrop: (acceptedFiles: File[]) => void;
    type?: 'all' | 'csv';
    onClick?: (_: React.BaseSyntheticEvent) => void;
}

export const DropzoneUploadArea = ({
    onDrop,
    type,
    onClick
}: DropzoneUploadAreaProps) => {
    const handleOnDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            onDrop(acceptedFiles);
        },
        [onDrop]
    );

    const uploadType = type ? fileTypes[type] : fileTypes.all;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleOnDrop,
        accept: uploadType.extensions
    });
    return (
        <Box
            id="dropzone-box"
            sx={{
                '.dropzone': {
                    cursor: 'pointer',
                    border: '5px dashed #DDDDDD',
                    p: 8,
                    borderRadius: 3,
                    height: 'inherit !important'
                }
            }}
        >
            <>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps({ onClick })} />
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                    >
                        <CloudUploadIcon fontSize="large" color="primary" />
                        {!isDragActive && (
                            <Typography variant="body1" align="center">
                                {uploadType.uploadText}
                            </Typography>
                        )}
                    </Grid>
                </div>
            </>
        </Box>
    );
};
