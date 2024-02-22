import * as React from 'react';

import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { StringUtils } from 'utils';

interface TagsInputProps {
    options: string[];
    setOptions: (_: string[]) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
    onClick?: (
        e:
            | React.MouseEvent<Element, MouseEvent>
            | React.SyntheticEvent<Element, Event>
    ) => void;
    onOpen?: (_: React.BaseSyntheticEvent) => void;
}

export const TagsInput = ({
    options,
    setOptions,
    label = 'Tags ( maximum 10 )',
    placeholder = 'Press enter to create tags',
    helperText = 'Press enter to create tags',
    required = false,
    onClick,
    onOpen
}: TagsInputProps) => {
    const [inputValue, setInputValue] = React.useState<string>();
    // const [options, setOptions] = React.useState<string[]>(value);

    return (
        <Box
            sx={{
                '.MuiAutocomplete-endAdornment': {
                    display: 'none'
                },
                '.MuiAutocomplete-popper': {
                    display: 'none'
                }
            }}
        >
            <Autocomplete
                id="tags-outlined"
                multiple
                freeSolo={true}
                options={options}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (
                        e.code === 'Enter' &&
                        inputValue &&
                        options.indexOf(inputValue) === -1
                    ) {
                        const newArr: string[] = [...options, inputValue];
                        setOptions(newArr);
                        // onChange(newArr);
                    }
                }}
                onOpen={onOpen}
                onInputChange={(
                    __: React.BaseSyntheticEvent,
                    newval: string,
                    reason: string
                ) => {
                    if (
                        StringUtils.trimWhiteSpacesFrontAndLast(newval) &&
                        reason === 'input'
                    ) {
                        setInputValue(
                            StringUtils.trimWhiteSpacesFrontAndLast(newval)
                        );
                    }
                }}
                disablePortal
                autoComplete={false}
                value={options}
                getOptionLabel={(option: string) => option}
                onChange={(
                    e: React.SyntheticEvent,
                    value: string[],
                    reason: string
                ) => {
                    if (reason === 'removeOption' && e.type === 'click') {
                        setOptions(value);
                        // onChange(value);
                    }
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        helperText={helperText}
                        required={required}
                        onClick={onClick}
                    />
                )}
            />
        </Box>
    );
};
