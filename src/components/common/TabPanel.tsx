import React from 'react';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material';

import { useIsMobile } from 'hooks';
import { SettingsContext } from 'contexts';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    style?: React.CSSProperties;
    panelSx?: SxProps<Theme>;
    id?: string;
}

export const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, style, id, panelSx, ...other } = props;

    const isMobile = useIsMobile();
    const { menuDrawerOpen } = React.useContext(SettingsContext);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={id || `tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={style}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        p: { xs: 1, sm: 1.5 },
                        width: isMobile
                            ? '100%'
                            : `calc(100vw - ${menuDrawerOpen ? 160 : 64}px)`,
                        ...panelSx
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
};
