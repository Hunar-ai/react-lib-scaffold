import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useGaHelper } from 'hooks';

import type { GA_EVENT_NAME } from 'interfaces';

interface ConfirmationDialogProps {
    title?: string;
    description: string;
    open: boolean;
    setOpen: (_: boolean) => void;
    onSubmit: VoidFunction;
    onCancel?: VoidFunction;
    submitGaEvent?: GA_EVENT_NAME;
    cancelGaEvent?: GA_EVENT_NAME;
}

export const ConfirmationDialog = ({
    title = 'Are you sure?',
    open,
    setOpen,
    onSubmit,
    onCancel,
    description,
    submitGaEvent,
    cancelGaEvent
}: ConfirmationDialogProps) => {
    const { captureGaEvent } = useGaHelper();

    const handleCancel = () => {
        cancelGaEvent && captureGaEvent(cancelGaEvent);
        setOpen(false);
        onCancel?.();
    };

    const handleSubmit = () => {
        submitGaEvent && captureGaEvent(submitGaEvent);
        onSubmit();
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ whiteSpace: 'pre-line' }}>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        CANCEL
                    </Button>
                    <Button onClick={handleSubmit} autoFocus>
                        SURE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
