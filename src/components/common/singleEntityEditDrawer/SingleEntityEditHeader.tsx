import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { type ReactElement } from 'interfaces';

interface SingleEntityEditHeaderProps {
    header: ReactElement | string;
    onClose: VoidFunction;
    onPrevClick?: VoidFunction;
    width: { [key: string]: number };
}

export const SingleEntityEditHeader = ({
    header,
    onClose,
    onPrevClick,
    width
}: SingleEntityEditHeaderProps) => {
    return (
        <Grid
            id="single-entity-edit-header"
            item
            md={12}
            px={{ xs: 2, md: 8 }}
            py={2}
            height={80}
            display="flex"
            position="fixed"
            width={width}
            bgcolor="white"
            zIndex={2}
        >
            <Grid container justifyContent="space-between" alignItems="center">
                {onPrevClick && (
                    <Grid item md={1} xs={1}>
                        <IconButton
                            sx={{ p: 0, ml: -1 }}
                            aria-label="delete"
                            onClick={onPrevClick}
                        >
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                )}
                <Grid
                    item
                    flexGrow={1}
                    ml={onPrevClick ? 1 : 0}
                    xs={onPrevClick ? 9 : 11}
                >
                    {typeof header === 'string' ? (
                        <Typography variant="h5" noWrap fontWeight={600}>
                            {header}
                        </Typography>
                    ) : (
                        header
                    )}
                </Grid>
                <Grid item>
                    <IconButton onClick={onClose} sx={{ p: 0, mr: -1 }}>
                        <ClearIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};
