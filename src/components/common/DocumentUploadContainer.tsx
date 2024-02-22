import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useDropzone } from 'react-dropzone';
import grey from '@mui/material/colors/grey';

interface DocumentUploadContainerProps {
    onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void;
    documentType: string[];
    dropZoneDescription: string;
    maxSize: { label: string; value: number };
    helpText?: string;
}

export const DocumentUploadContainer = ({
    onDrop,
    documentType,
    dropZoneDescription,
    maxSize = { label: '10 MB', value: 100000000 },
    helpText = ''
}: DocumentUploadContainerProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: documentType,
        maxSize: maxSize.value
    });

    return (
        <Grid item id="document-upload-container" md={12}>
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
                        width: '100%'
                    }
                }}
            >
                <>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
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
                                {!isDragActive && (
                                    <Typography>
                                        {dropZoneDescription}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid
                                item
                                md={12}
                                display="flex"
                                justifyContent="center"
                            >
                                <Typography variant="body2">
                                    {`Max Size: ${maxSize.label}`}
                                </Typography>
                            </Grid>

                            <Grid container justifyContent="center">
                                <CloudUploadIcon
                                    fontSize="large"
                                    color="primary"
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Typography variant="caption" color={grey[700]} mt={1}>
                        {helpText}
                    </Typography>
                </>
            </Grid>
        </Grid>
    );
};
