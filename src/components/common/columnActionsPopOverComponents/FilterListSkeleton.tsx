import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { DataUtils } from 'utils';

interface FilterListSkeletonProps {
    count: number;
}

export const FilterListSkeleton = ({ count }: FilterListSkeletonProps) => {
    return (
        <>
            {DataUtils.arrayRange(count).map((_, index) => (
                <Grid item xs={12} px={2} key={index}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={false}
                                id={`${index}`}
                                size="small"
                                disabled
                            />
                        }
                        sx={{ width: '100%' }}
                        label={
                            <Typography width="100%">
                                <Skeleton />
                            </Typography>
                        }
                    />
                </Grid>
            ))}
        </>
    );
};
