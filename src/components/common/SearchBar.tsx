import React from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import grey from '@mui/material/colors/grey';

import { useIsMobile, useGaHelper } from 'hooks';

interface SearchBarProps {
    placeholder?: string;
    setSearchKey?: (_: string) => void;
}
export const SearchBar = ({
    placeholder = 'Search',
    setSearchKey
}: SearchBarProps) => {
    const [searchInput, setSearchInput] = React.useState('');

    const isMobile = useIsMobile();
    const { getSearchBarGAEvent, captureGaEvent } = useGaHelper();

    const { clearEvent, enterEvent } = React.useMemo(
        () => getSearchBarGAEvent(),
        [getSearchBarGAEvent]
    );

    /**
     * do not pass the value directly. always pass reference to the event, or else the setTimeout
     * trick will not work
     */
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setTimeout(() => setSearchKey?.(e.target.value.trim()), 2000);
    };

    const onSearchClear = () => {
        captureGaEvent(clearEvent);
        setSearchInput('');
        setTimeout(() => setSearchKey?.(''), 2000);
    };

    const onClearMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        // this prevents focus loss on textfield
        e.preventDefault();
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            captureGaEvent(enterEvent);
        }
    };

    return (
        <TextField
            size="small"
            InputProps={{
                startAdornment: isMobile ? undefined : (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <IconButton
                        onClick={onSearchClear}
                        onMouseDown={onClearMouseDown}
                        sx={{ p: 0 }}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                )
            }}
            fullWidth
            sx={{
                backgroundColor: grey[200],
                height: '36.45px',
                '.MuiOutlinedInput-root': {
                    height: 'inherit'
                }
            }}
            value={searchInput}
            placeholder={placeholder}
            onChange={onSearchChange}
            onKeyDown={onKeyPress}
        />
    );
};
