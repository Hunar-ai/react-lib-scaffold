import * as React from 'react';

import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';

import { SettingsContext } from 'contexts';
import { useBaseLogo, useIsMobile } from 'hooks';

const MobileHeaderBgColor = '#001529';

export const CenteredImageBox = styled(Box)({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    '& img': {
        margin: 'auto',
        textAlign: 'center'
    }
});

export const FullWidthLogoHeader = () => {
    const isMobile = useIsMobile();
    const { menuDrawerOpen, handleOpenMenu } =
        React.useContext(SettingsContext);

    const logo = useBaseLogo();

    if (!isMobile) {
        return <></>;
    }

    return (
        <Grid item md={12}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: MobileHeaderBgColor,
                        width: '100vw'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            size="small"
                            edge="start"
                            color="primary"
                            aria-label="open drawer"
                            onClick={handleOpenMenu}
                            sx={{
                                mr: 2,
                                border: '1px solid rgb(19, 47, 76)',
                                borderRadius: '10px',
                                ...(menuDrawerOpen && {
                                    display: 'none'
                                })
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <CenteredImageBox>
                            <img src={logo} />
                        </CenteredImageBox>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
    );
};
