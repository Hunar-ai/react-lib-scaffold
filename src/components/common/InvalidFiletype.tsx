import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const InvalidFileType = () => {
    return (
        <Grid item xs={12}>
            <Typography textAlign="center" variant="h4" color="red">
                Invalid Filetype
            </Typography>
        </Grid>
    );
};
