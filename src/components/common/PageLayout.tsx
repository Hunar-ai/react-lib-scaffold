import Grid from '@mui/material/Grid';
import type { SxProps, Theme } from '@mui/material/styles';

import { PageHeader } from './PageHeader';
import { PageContainer } from './PageContainer';
import { ReactElement } from 'interfaces';
import { FullWidthLogoHeader } from './FullWidthLogoHeader';

interface PageLayoutProps {
    children: JSX.Element;
    title: string | JSX.Element;
    headerCTA?: ReactElement;
    headerSx?: SxProps<Theme>;
    subtitle?: ReactElement;
    search?: string;
    isFullSize?: boolean;
    setSearch?: (_: string) => void;
    isLoading?: boolean;
}
export const PageLayout = ({
    children,
    title,
    headerCTA,
    headerSx = {},
    subtitle,
    isFullSize = false
}: PageLayoutProps) => {
    return (
        <>
            <Grid item xs={12} md={12}>
                <Grid container id="page-layout">
                    <FullWidthLogoHeader />
                    <PageHeader
                        title={title}
                        headerCTA={headerCTA}
                        subtitle={subtitle}
                        isFullSize={isFullSize}
                        sx={headerSx}
                    />
                    <PageContainer isFullSize={isFullSize}>
                        {children}
                    </PageContainer>
                </Grid>
            </Grid>
        </>
    );
};
