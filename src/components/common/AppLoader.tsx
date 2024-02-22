import CircularProgress from '@mui/material/CircularProgress';

import { LoaderBackdrop } from './LoaderBackdrop';

interface Props {
    inDrawer?: boolean;
}

export const AppLoader = ({ inDrawer = false }: Props) => {
    return (
        <LoaderBackdrop isFullScreen={!inDrawer}>
            <CircularProgress sx={{ color: 'white' }} />
        </LoaderBackdrop>
    );
};
