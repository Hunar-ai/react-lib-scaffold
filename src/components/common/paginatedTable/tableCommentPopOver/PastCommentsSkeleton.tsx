import React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { DataUtils } from 'utils';

interface PastCommentsSkeletonProps {
    count: number;
}

export const PastCommentsSkeleton = ({ count }: PastCommentsSkeletonProps) => {
    return (
        <>
            {DataUtils.arrayRange(count).map((_, index) => (
                <React.Fragment key={`comment_skeleton_${index}`}>
                    <Grid container alignItems="baseline" my={1}>
                        <Grid item md={5}>
                            <Typography variant="subtitle2">
                                <Skeleton />
                            </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography variant="subtitle2">
                                <Skeleton />
                            </Typography>
                        </Grid>
                        <Grid item md={12} display="flex" justifyContent="end">
                            <Typography variant="caption" width="40%">
                                <Skeleton />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                </React.Fragment>
            ))}
        </>
    );
};
