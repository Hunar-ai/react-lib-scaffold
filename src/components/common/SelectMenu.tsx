import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FIELD_SIZE } from 'Enum';
import type { Options, Option } from 'interfaces';

interface SelectMenuProps {
    displayEmpty?: boolean;
    size?: FIELD_SIZE;
    options: Options;
    value: string;
    onOpen?: (event: React.SyntheticEvent) => void;
    onChange: (e: SelectChangeEvent, child: React.ReactNode) => void;
    renderOption?: (_: Option) => React.ReactNode;
}

export const SelectMenu = ({
    displayEmpty = true,
    size = FIELD_SIZE.medium,
    options,
    value,
    onOpen = undefined,
    onChange,
    renderOption
}: SelectMenuProps) => {
    return (
        <FormControl fullWidth>
            <Select
                onOpen={onOpen}
                displayEmpty={displayEmpty}
                value={value}
                onChange={onChange}
                size={size}
            >
                <MenuItem value="" disabled>
                    Select
                </MenuItem>
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {renderOption ? renderOption(option) : option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
