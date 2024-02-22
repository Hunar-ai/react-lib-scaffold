import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { SORT_ORDER, SORT_TYPE } from 'Enum';
import { Sort } from 'interfaces';

import { useGaHelper } from 'hooks';

interface SortSectionProps {
    sortState?: Sort;
    setSortState: (_: Sort) => void;
    id: string;
    sortType: SORT_TYPE;
}

export const SortSection = ({
    sortState,
    setSortState,
    id,
    sortType
}: SortSectionProps) => {
    const { getSortTypeGaEvent, captureGaEvent } = useGaHelper();

    const { ascEvent, dscEvent } = React.useMemo(
        () => getSortTypeGaEvent(id),
        [getSortTypeGaEvent, id]
    );
    return (
        <Grid item md={12} height="62">
            <Grid container rowSpacing={1}>
                <Grid item md={12}>
                    <Grid container justifyContent="space-between">
                        <Grid item md={10}>
                            <Link
                                component="button"
                                sx={{
                                    justifyContent: 'start'
                                }}
                                color="inherit"
                                onClick={() => {
                                    captureGaEvent(ascEvent);
                                    setSortState({
                                        key: id,
                                        order: SORT_ORDER.ASC
                                    });
                                }}
                                underline="none"
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={
                                        sortState?.key === id &&
                                        sortState?.order === SORT_ORDER.ASC
                                            ? '600'
                                            : '500'
                                    }
                                >
                                    {sortType === SORT_TYPE.NUMERIC
                                        ? `Sort Smallest→Largest`
                                        : sortType === SORT_TYPE.DATE
                                        ? 'Sort Oldest→Newest'
                                        : `Sort A→Z`}
                                </Typography>
                            </Link>
                        </Grid>
                        {sortState?.key === id &&
                            sortState?.order === SORT_ORDER.ASC && (
                                <CheckIcon color="primary" />
                            )}
                    </Grid>
                </Grid>
                <Grid item md={12} height={31}>
                    <Grid container justifyContent="space-between">
                        <Grid item md={10}>
                            <Link
                                component="button"
                                sx={{
                                    justifyContent: 'start'
                                }}
                                color="inherit"
                                onClick={() => {
                                    captureGaEvent(dscEvent);
                                    setSortState({
                                        key: id,
                                        order: SORT_ORDER.DESC
                                    });
                                }}
                                underline="none"
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={
                                        sortState?.key === id &&
                                        sortState?.order === SORT_ORDER.DESC
                                            ? '600'
                                            : '500'
                                    }
                                >
                                    {sortType === SORT_TYPE.NUMERIC
                                        ? `Sort Largest→Smallest`
                                        : sortType === SORT_TYPE.DATE
                                        ? 'Sort Newest→Oldest'
                                        : `Sort Z→A`}
                                </Typography>
                            </Link>
                        </Grid>
                        {sortState?.key === id &&
                            sortState?.order === SORT_ORDER.DESC && (
                                <CheckIcon color="primary" />
                            )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
