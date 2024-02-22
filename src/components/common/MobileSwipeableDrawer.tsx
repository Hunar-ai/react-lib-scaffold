import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useWidth } from 'hooks';

const drawerBleeding = 56;

interface Props {
    open: boolean;
    window?: () => Window;
    children: React.ReactElement;
}

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light'
            ? grey[100]
            : theme.palette.background.default
}));

export const MobileSwipeableDrawer = (props: Props) => {
    const { open, children } = props;
    const width = useWidth();
    const drawerWidth =
        width === 'sm'
            ? 574
            : width === 'md'
            ? 680
            : width === 'lg'
            ? 680
            : window.innerWidth;

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        width: drawerWidth,
                        overflow: 'visible',
                        left: `calc(100vw - ${drawerWidth}px)`
                    }
                }}
            />

            <SwipeableDrawer
                style={{
                    zIndex: 1251
                }}
                anchor="bottom"
                open={open}
                onClose={() => undefined}
                onOpen={() => undefined}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true
                }}
            >
                {children}
            </SwipeableDrawer>
        </Root>
    );
};
