import React from 'react';
import Grid from '@mui/material/Grid';
import grey from '@mui/material/colors/grey';

import { SettingsContext } from 'contexts';
import { useIsMobile } from 'hooks';
import { DASHBOARD_PAGE_HEADER } from 'Constants';

interface PageContainerProps {
    children: JSX.Element;
    isFullSize: boolean;
}

export const PageContainer = ({ children, isFullSize }: PageContainerProps) => {
    const { menuDrawerOpen, showSidebar } = React.useContext(SettingsContext);

    const isMobile = useIsMobile();

    const top = isMobile
        ? DASHBOARD_PAGE_HEADER.Height + 56
        : DASHBOARD_PAGE_HEADER.Height;
    const extraWidth = isMobile || !showSidebar ? 0 : menuDrawerOpen ? 160 : 64;

    return (
        <Grid item md={12}>
            <Grid
                id="page-container"
                container
                sx={{
                    backgroundColor: grey[100],
                    overflow: { xs: 'auto', md: 'hidden' }
                }}
                width={isFullSize ? '100vw' : `calc(100vw - ${extraWidth}px)`}
                height={`calc(100vh - ${top}px)`}
            >
                {children}
            </Grid>
        </Grid>
    );
};
