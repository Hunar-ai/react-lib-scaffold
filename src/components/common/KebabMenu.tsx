import React from 'react';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { AppTooltip } from 'components/common';
import { ReactElement } from 'interfaces';
import { useGaHelper } from 'hooks';

type MenuOption = {
    label: string | ReactElement;
    onClick: (_: unknown) => void;
    meta?: Record<string, unknown>;
};

interface Props {
    options: MenuOption[];
    disabled?: boolean;
    meta?: { type: string; disabled?: boolean };
    size?: 'large' | 'medium' | 'small';
    outlined?: boolean;
    color?: 'primary' | 'info' | 'secondary';
}

export const KebabMenu = ({
    options,
    meta,
    size = 'medium',
    outlined = true,
    color = 'primary'
}: Props) => {
    // const theme = useTheme();
    const { getKebabMenuEvent, captureGaEvent } = useGaHelper();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.BaseSyntheticEvent) => {
        event.stopPropagation();
        captureGaEvent(getKebabMenuEvent(meta?.type));
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const iconButtonOutlineStyles = {
        borderRadius: 1,
        border: '1px solid'
    };

    return (
        <>
            <AppTooltip title="More actions">
                <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color={color}
                    size={size}
                    sx={outlined ? iconButtonOutlineStyles : undefined}
                >
                    <MoreVertIcon />
                </IconButton>
            </AppTooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {options.map((option: MenuOption, index: number) => (
                    <MenuItem
                        dense
                        key={index}
                        onClick={() => {
                            option.onClick(meta);
                            handleClose();
                        }}
                        {...option.meta}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
