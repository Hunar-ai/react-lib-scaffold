import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'interfaces';
import NoDataFoundImage from '../common/NoDataFound.png';

interface NoDataFoundProps {
    cta?: ReactElement;
    image?: string;
    noFoundText: string;
    showCTA: boolean;
    noFoundSubtext?: string;
}

export const NoDataFound = ({
    cta,
    image = NoDataFoundImage,
    noFoundText,
    showCTA,
    noFoundSubtext
}: NoDataFoundProps) => {
    return (
        <Grid item md={12} id="no-data-found">
            <Grid
                container
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item md={12}>
                    <img src={image} />
                </Grid>
                <Grid item md={12} mt={5} fontWeight={700}>
                    {noFoundText}
                </Grid>
                {noFoundSubtext && (
                    <Grid item md={12} mt={2} fontWeight={700}>
                        <Typography variant="body2">
                            {noFoundSubtext}
                        </Typography>
                    </Grid>
                )}
                {showCTA && (
                    <Grid item md={12} mt={2}>
                        {cta}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};
