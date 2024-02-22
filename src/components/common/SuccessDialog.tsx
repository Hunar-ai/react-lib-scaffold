import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SuccessIcon from 'components/common/Success.png';

interface SuccessDialogProps {
    showDialog: boolean;
    setShowDialog?: (showDialog: boolean) => void;
    heading: string;
    description: string;
}

export const SuccessDialog = ({
    showDialog,
    heading,
    description,
    setShowDialog
}: SuccessDialogProps) => {
    return (
        <Dialog
            open={showDialog}
            onClose={() => setShowDialog?.(false)}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent>
                <Grid item md={12} display="flex" justifyContent="center">
                    <img
                        src={SuccessIcon}
                        alt="success"
                        style={{
                            width: 136,
                            height: 136
                        }}
                    />
                </Grid>
                <Grid item md={12} display="flex" justifyContent="center">
                    <Typography component="div" variant="h6" fontWeight={700}>
                        {heading}
                    </Typography>
                </Grid>
                <Grid item md={12} display="flex" justifyContent="center">
                    <Typography component="div">{description}</Typography>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
