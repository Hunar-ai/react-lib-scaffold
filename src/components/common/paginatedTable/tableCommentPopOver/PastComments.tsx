import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { PastComment } from './PastComment';
import { PastCommentsSkeleton } from './PastCommentsSkeleton';

import { type CommentProps } from 'interfaces';
import { useGaHelper } from 'hooks';

interface Props {
    data: CommentProps[];
    expanded: boolean;
    isPopover?: boolean;
    isLoading?: boolean;
}

const HEIGHT_WITH_ADD_COMMENT = 107.34;
const HEIGHT = 274;

export const PastComments = ({
    data,
    expanded,
    isPopover = false,
    isLoading = false
}: Props) => {
    const { captureGaScroll, commentGaEvent } = useGaHelper();
    const [scrollContainerRef, setScrollContainerRef] =
        React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const { elem, handleScroll } = captureGaScroll(
            scrollContainerRef,
            commentGaEvent.scrollEvent,
            commentGaEvent.scrollArea
        );
        elem?.addEventListener('scrollend', handleScroll);
        return () => {
            elem?.removeEventListener('scrollend', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        commentGaEvent.scrollArea,
        commentGaEvent.scrollEvent,
        scrollContainerRef
    ]);

    return (
        <Grid container height="100%">
            {isPopover && (
                <Grid item xs={12}>
                    <Typography variant="subtitle2" fontWeight="700">
                        Past Comments
                    </Typography>
                </Grid>
            )}
            <Grid
                ref={ref => setScrollContainerRef(ref)}
                item
                xs={12}
                maxHeight={
                    isPopover
                        ? expanded
                            ? HEIGHT_WITH_ADD_COMMENT
                            : HEIGHT
                        : 'none'
                }
                height={'calc(100% - 32px)'}
                overflow="auto"
            >
                {data?.map((item: CommentProps, index) => (
                    <React.Fragment key={index}>
                        <PastComment data={item} isPopover={isPopover} />
                        {!isPopover && <Divider />}
                    </React.Fragment>
                ))}
                {isLoading && <PastCommentsSkeleton count={5} />}
            </Grid>
        </Grid>
    );
};
