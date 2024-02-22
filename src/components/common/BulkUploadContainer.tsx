import React from 'react';

import Papa, { ParseResult } from 'papaparse';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from '@mui/material/styles';

import { useDropzone } from 'react-dropzone';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

interface BulkUploadContainerProps {
    onDrop: (_: ParseResult<{ data: string[][] }>, __: File) => void;
    onDropzoneClick?: (_: React.BaseSyntheticEvent) => void;
    onReUploadClick?: VoidFunction;
    onSampleClick?: VoidFunction;
    error: string;
    setError: (_: string) => void;
}

export const BulkUploadContainer = ({
    onDrop,
    onDropzoneClick,
    onReUploadClick,
    onSampleClick,
    error,
    setError
}: BulkUploadContainerProps) => {
    const theme = useTheme();
    const handleOnDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            acceptedFiles.forEach((file: File) => {
                Papa.parse(file, {
                    complete: (
                        parsedData: ParseResult<{ data: string[][] }>
                    ) => {
                        onDrop(parsedData, file);
                    }
                });
            });
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: handleOnDrop,
        accept: ['.csv']
    });
    return (
        <Grid item>
            <Grid py={2}>
                {error && (
                    <>
                        <Alert severity="error">{error}</Alert>
                        <Button
                            onClick={() => {
                                onReUploadClick?.();
                                open();
                                setError('');
                            }}
                        >
                            RE-UPLOAD
                        </Button>
                    </>
                )}
            </Grid>

            <Grid
                container
                height={256}
                sx={{
                    '.dropzone': {
                        height: 256,
                        cursor: 'pointer',
                        border: '5px dashed #DDDDDD',
                        p: { md: 13, xs: 10 },
                        borderRadius: 3,
                        width: {
                            sm: 574 - 128,
                            md: 680 - 128,
                            xs: window.innerWidth - 32
                        }
                    },
                    '.dropzone:hover': {
                        border: `5px dashed ${theme.palette.primary.main}`,
                        width: {
                            sm: 574 - 128,
                            md: 680 - 128,
                            xs: window.innerWidth - 32
                        }
                    }
                }}
            >
                <>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input
                            {...getInputProps({ onClick: onDropzoneClick })}
                        />
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                md={12}
                                display="flex"
                                justifyContent="center"
                            >
                                {isDragActive ? (
                                    <Typography></Typography>
                                ) : (
                                    <Typography>{`Drag & Drop your CSV file here`}</Typography>
                                )}
                            </Grid>
                            <Grid item md={12}>
                                <Grid container justifyContent="center">
                                    <CloudUploadIcon
                                        fontSize="large"
                                        color="primary"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </>
            </Grid>
            <Button
                variant="text"
                size="small"
                target="_blank"
                href="https://storage.googleapis.com/hunar-trial/data/bulk-referral-contacts.csv"
                download
                onClick={onSampleClick}
            >
                <Grid container rowSpacing={4} mt={1}>
                    <DownloadIcon fontSize="small" />
                    <Typography variant="caption" ml={1}>
                        Download Sample CSV
                    </Typography>
                </Grid>
            </Button>
        </Grid>
    );
};
