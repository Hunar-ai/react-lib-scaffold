import Grid from '@mui/material/Grid';

import SuccessIcon from 'components/common/Success.png';
import { ReactElement } from 'interfaces';

export const FormSuccessView = ({
    customMessage
}: {
    customMessage: ReactElement;
}) => {
    return (
        <Grid item md={12}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                rowGap={6}
            >
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
                <Grid
                    item
                    md={5}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    {customMessage}
                </Grid>
            </Grid>
        </Grid>
    );
};
