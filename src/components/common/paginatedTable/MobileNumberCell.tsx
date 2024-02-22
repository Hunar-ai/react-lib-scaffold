import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useWhatsapp } from 'hooks';

import { WhatsappIconButton } from 'components/common';

interface MobileNumberCellProps {
    value: string;
}

export const MobileNumberCell = ({ value }: MobileNumberCellProps) => {
    const { sendToNumber } = useWhatsapp();

    return (
        <Grid container alignItems="center">
            <Typography variant="body2" width={100}>
                {value}
            </Typography>
            <WhatsappIconButton
                size="small"
                iconFontSize="small"
                link={sendToNumber({
                    mobileNumber: value
                })}
            />
        </Grid>
    );
};
