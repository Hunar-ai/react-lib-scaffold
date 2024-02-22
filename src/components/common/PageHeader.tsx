import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { AppTooltip } from './AppTooltip';

import { SettingsContext } from 'contexts';
import { useIsMobile } from 'hooks';

import { ReactElement } from 'interfaces';
import { DASHBOARD_PAGE_HEADER } from 'Constants';

interface PageHeaderProps {
    title: string | JSX.Element;
    headerCTA?: ReactElement;
    subtitle?: ReactElement;
    isFullSize: boolean;
    sx?: SxProps<Theme>;
}

export const PageHeader = ({
    title,
    headerCTA,
    subtitle,
    isFullSize,
    sx = {}
}: PageHeaderProps) => {
    const isMobile = useIsMobile();
    const { menuDrawerOpen, showSidebar } = React.useContext(SettingsContext);

    const extraWidth = isMobile || !showSidebar ? 0 : menuDrawerOpen ? 160 : 64;

    return (
        <Grid item md={12}>
            <Grid
                id="page-header"
                container
                width={isFullSize ? '100vw' : `calc(100vw - ${extraWidth}px)`}
                alignItems="center"
                p={{ xs: 1, sm: 2 }}
                zIndex={3}
                bgcolor="white"
                height={DASHBOARD_PAGE_HEADER.Height}
                justifyContent="space-between"
                mt={isMobile ? '56px' : 0}
                sx={sx}
            >
                <Grid
                    item
                    md={4}
                    sm={6}
                    xs={6}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid container justifyItems="center" alignItems="center">
                        <Grid item md={12} xs={headerCTA ? 12 : undefined}>
                            <AppTooltip title={title}>
                                <>
                                    <Typography
                                        noWrap
                                        variant={'h6'}
                                        fontWeight={700}
                                        component="div"
                                        gutterBottom={false}
                                        width="100%"
                                    >
                                        {title}
                                    </Typography>
                                </>
                            </AppTooltip>
                        </Grid>
                        <Grid item md={12}>
                            {subtitle}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    md={8}
                    sm={6}
                    xs={6}
                    alignItems="center"
                    justifyContent={isMobile ? 'start' : 'end'}
                >
                    {headerCTA}
                </Grid>
            </Grid>
        </Grid>
    );
};
