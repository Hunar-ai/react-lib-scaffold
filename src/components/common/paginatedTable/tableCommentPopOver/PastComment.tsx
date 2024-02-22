import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import { DateTimeFormat, TimeUtils } from 'utils';
import { type CommentProps } from 'interfaces';

interface Props {
    data: CommentProps;
    isPopover?: boolean;
}

export const PastComment = ({ data, isPopover = false }: Props) => {
    const commentDate = TimeUtils.getFormattedLocalDate(
        data?.auditMetadata.createdOn,
        DateTimeFormat.HUMAN_DATE_TIME_FORMAT
    );

    return (
        <>
            <Grid container alignItems="baseline" my={isPopover ? 2 : 1}>
                <Grid item md={isPopover ? 6 : 12}>
                    <Typography
                        variant="subtitle2"
                        fontWeight={isPopover ? undefined : 700}
                    >
                        {data?.commenter?.fullName}
                    </Typography>
                </Grid>
                {isPopover && (
                    <Grid item md={6} display="flex" justifyContent="end">
                        <Typography variant="caption" color={grey[600]}>
                            {commentDate}
                        </Typography>
                    </Grid>
                )}
                <Grid item md={12}>
                    <Typography
                        variant={isPopover ? 'caption' : 'subtitle2'}
                        color={isPopover ? grey[600] : undefined}
                        sx={{ wordWrap: 'break-word' }}
                    >
                        {data?.text}
                    </Typography>
                </Grid>
                {!isPopover && (
                    <Grid item md={12} display="flex" justifyContent="end">
                        <Typography variant="caption" color={grey[600]}>
                            {commentDate}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
};
