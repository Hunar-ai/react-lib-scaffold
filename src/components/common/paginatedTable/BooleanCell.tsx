import React from 'react';

import Typography from '@mui/material/Typography';

import { useHelper } from 'useHelper';

interface BooleanCellProps {
    value: boolean | null;
}

export const BooleanCell = ({ value }: BooleanCellProps) => {
    const { getFormattedBooleanField } = useHelper();

    const formattedText = React.useMemo(() => {
        return getFormattedBooleanField(value);
    }, [value, getFormattedBooleanField]);

    return <Typography variant="body2">{formattedText}</Typography>;
};
