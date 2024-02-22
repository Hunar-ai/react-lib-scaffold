import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

import { AppLoader } from 'components/common';
import { ReactElement } from 'interfaces';
import { SingleEntityEditHeader } from './singleEntityEditDrawer/SingleEntityEditHeader';

const drawerWidth = {
    sm: 574,
    md: 680,
    xs: window.innerWidth
};

const height = window.innerHeight;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */

    window?: () => Window;
    open: boolean;
    header: ReactElement | string;
    children: ReactElement;
    isLoading: boolean;
    footer?: ReactElement;
    description?: string;
    rowGap?: { xs: number; md: number };
    onClose: VoidFunction;
    onPrevClick?: VoidFunction;
}
export const SingleEntityEditDrawer = ({
    open,
    header,
    children,
    isLoading,
    footer,
    rowGap = { xs: 2, md: 3 },
    onClose,
    onPrevClick
}: Props) => {
    const theme = useTheme();

    return (
        <Box
            id="single-entity-edit-box"
            component="nav"
            sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}
        >
            <Drawer
                id="single-entity-edit-drawer"
                anchor="right"
                open={open}
                sx={{
                    zIndex: theme.zIndex.drawer + 2,
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        height
                    }
                }}
            >
                <Grid container>
                    {isLoading && <AppLoader inDrawer />}
                    <SingleEntityEditHeader
                        header={header}
                        onClose={onClose}
                        onPrevClick={onPrevClick}
                        width={drawerWidth}
                    />

                    <Grid
                        id="single-entity-edit-drawer-container"
                        px={{ xs: 2, md: 8 }}
                        py={{ xs: 2 }}
                        width="100%"
                        mt="80px"
                        container
                        rowGap={rowGap}
                        maxHeight={'calc(100vh - 160px)'}
                        overflow="auto"
                    >
                        {children}
                    </Grid>

                    {footer && (
                        <Grid
                            item
                            md={12}
                            height={80}
                            width={drawerWidth}
                            px={{ xs: 2, md: 8 }}
                            sx={{
                                position: 'fixed',
                                bottom: 0,
                                zIndex: theme.zIndex.drawer + 1,
                                borderTopWidth: 1,
                                borderTopColor: grey[200],
                                borderTopStyle: 'solid',
                                backgroundColor: 'white'
                            }}
                        >
                            <Grid
                                container
                                justifyContent="end"
                                alignItems="center"
                                height="100%"
                                columnSpacing={2}
                            >
                                {footer}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Drawer>
        </Box>
    );
};
