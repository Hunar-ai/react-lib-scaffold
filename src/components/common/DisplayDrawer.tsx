import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material';

import { AppLoader } from './AppLoader';

const drawerWidth = {
    sm: 560,
    md: 560,
    xs: window.innerWidth
};

interface DisplayDrawerProps {
    open: boolean;
    header: React.ReactNode | string;
    children: React.ReactNode;
    isLoading: boolean;
    onClose: VoidFunction;
}

export const DisplayDrawer = ({
    open,
    header,
    children,
    isLoading,
    onClose
}: DisplayDrawerProps) => {
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            open={open}
            sx={{
                zIndex: theme.zIndex.drawer + 2,
                display: { xs: 'block', sm: 'block' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    height: '100vh'
                }
            }}
        >
            <Grid container>
                {isLoading && <AppLoader inDrawer />}
                <Grid
                    item
                    md={12}
                    px={{ xs: 2, md: 8 }}
                    pt={5}
                    pb={2.5}
                    display="flex"
                    position="fixed"
                    zIndex={2}
                    width={drawerWidth}
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item flexGrow={1} xs={10} sm={11} md={11}>
                            {typeof header === 'string' ? (
                                <Typography
                                    variant="h5"
                                    noWrap
                                    fontWeight={600}
                                >
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

                <Grid
                    item
                    px={{ xs: 2, md: 8 }}
                    py={{ xs: 2.5 }}
                    mt={12}
                    maxHeight={'calc(100vh - 136px)'}
                    width="100%"
                    overflow="auto"
                >
                    {children}
                </Grid>
            </Grid>
        </Drawer>
    );
};
