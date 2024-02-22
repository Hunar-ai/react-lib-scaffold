import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

import { ALERT_SEVERITY } from 'Enum';

interface TableHeaderAlertProps {
    children: React.ReactNode;
    severity?: ALERT_SEVERITY;
}

export const TableHeaderAlert = ({
    children,
    severity = ALERT_SEVERITY.INFO
}: TableHeaderAlertProps) => {
    return (
        <Grid container columnSpacing={1} justifyContent="center">
            <Grid
                item
                sx={{
                    '.MuiAlert-icon': {
                        fontSize: 18
                    },
                    '.MuiAlert-root': {
                        padding: '0px 6px'
                    }
                }}
            >
                <Alert
                    severity={severity}
                    aria-setsize={1}
                    sx={{
                        '.MuiAlert-message': {
                            padding: '6px 0',
                            fontSize: '0.8125rem'
                        }
                    }}
                >
                    {children}
                </Alert>
            </Grid>
        </Grid>
    );
};
