import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface LinkCellProps {
    value: string;
    link: string;
    target?: string;
}

export const LinkCell = ({ value, link, target }: LinkCellProps) => {
    return (
        <Link href={link} underline="hover" target={target}>
            <Typography variant="body2">{value}</Typography>
        </Link>
    );
};
