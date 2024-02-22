import React from 'react';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppLoader } from '.';
import { SettingsContext } from 'contexts';
import { ReactElement } from 'interfaces';
import { useIsMobile } from 'hooks';

interface Props {
    open: boolean;
    title: ReactElement | string;
    children: ReactElement;
    isLoading: boolean;
    cta?: ReactElement;
    description?: string;
    height?: string | number;
    onClose: VoidFunction;
    window?: () => Window;
    onPrevClick?: VoidFunction;
}
export const FullPageEditDrawer = ({
    open,
    title,
    children,
    isLoading,
    height = 'calc(100vh - 80px)',
    onClose,
    onPrevClick
}: Props) => {
    const { menuDrawerOpen } = React.useContext(SettingsContext);
    const drawerWidth = {
        sm: window.innerWidth,
        md: window.innerWidth - (menuDrawerOpen ? 160 : 64),
        xs: window.innerWidth
    };
    const theme = useTheme();
    const isMobile = useIsMobile();

    const drawer = (
        <Grid id="full-page-drawer-container">
            {isLoading && <AppLoader inDrawer />}

            <Grid
                id="full-page-drawer-title-container"
                container
                height={80}
                px={{ xs: 1, sm: 4 }}
                py={2}
                justifyContent="space-between"
                alignItems="center"
                columnSpacing={1.5}
            >
                {onPrevClick && (
                    <Grid item xs="auto">
                        <IconButton
                            sx={{ p: 0, ml: -1 }}
                            aria-label="delete"
                            onClick={onPrevClick}
                        >
                            <ArrowBackIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                )}
                <Grid item flexGrow={1}>
                    <Typography variant="h5" noWrap fontWeight={600}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <IconButton onClick={onClose} sx={{ p: 0, mr: -1 }}>
                        <ClearIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>

            <Grid
                width="100%"
                sx={{
                    overflow: 'auto',
                    height
                }}
                container
                bgcolor={grey[100]}
                id="form-container"
                p={isMobile ? 1 : 2}
            >
                {children}
            </Grid>
        </Grid>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 }
            }}
        >
            <Drawer
                anchor="right"
                open={open}
                sx={{
                    zIndex: theme.zIndex.drawer + 2,
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        height: window.innerHeight
                    }
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};
