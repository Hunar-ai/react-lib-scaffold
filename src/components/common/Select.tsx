import * as React from 'react';

import _ from 'lodash';

import { type OutlinedInputProps } from '@mui/material/OutlinedInput';
import { type FilledInputProps } from '@mui/material/FilledInput';
import { type InputProps } from '@mui/material/Input';
import Autocomplete, {
    type AutocompleteInputChangeReason,
    type AutocompleteChangeReason,
    type AutocompleteRenderGetTagProps
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { type Options, type Option } from 'interfaces';
import { useWidth } from 'hooks';

interface Props {
    id?: string;
    options: Options;
    defaultValue?: any;
    variant?: 'standard' | 'filled' | 'outlined' | undefined;
    multiple?: boolean;
    label: string;
    name: string;
    placeholder?: string;
    value?: any;
    required?: boolean;
    error?: boolean;
    helperText?: React.ReactNode;
    autoFocus?: boolean;
    disabledOptions?: Options;
    fixedOptions?: Options;
    disableClearable?: boolean;
    clearOnBlur?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    size?: 'small' | 'medium';
    sx?: SxProps;
    ListboxProps?: Record<string, unknown>;
    optionType?: 'textfield' | 'checkbox';
    isFilterable?: boolean;
    freeSolo?: boolean;
    blurOnSelect?: boolean;
    inputValue?: string;
    limitTags?: number;
    onInputChange?: (
        __: React.BaseSyntheticEvent,
        newval: string,
        reason?: AutocompleteInputChangeReason
    ) => void;
    onNewClick?: VoidFunction;
    onOpen?: (event: React.SyntheticEvent<Element, Event>) => void;
    onChange?: (
        _: React.SyntheticEvent,
        __: any,
        reason: AutocompleteChangeReason
    ) => void; //type to be refactored
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    inputProps?:
        | Partial<FilledInputProps>
        | Partial<OutlinedInputProps>
        | Partial<InputProps>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Select = ({
    size = 'medium',
    defaultValue = undefined,
    variant = 'outlined',
    required = false,
    error = false,
    helperText = '',
    options = [],
    multiple = false,
    label,
    placeholder = '',
    value,
    id = '',
    name = '',
    autoFocus = false,
    disabledOptions = [],
    fixedOptions = [],
    disableClearable = false,
    clearOnBlur = true,
    disabled = false,
    autoComplete = '',
    sx = {},
    ListboxProps = {},
    isFilterable = true,
    freeSolo = false,
    blurOnSelect = false,
    inputValue,
    limitTags = 1,
    optionType = 'checkbox',
    onInputChange = () => undefined,
    onChange = () => undefined,
    onBlur = () => undefined,
    onNewClick = () => undefined,
    onOpen = () => undefined,
    inputProps = {}
}: Props) => {
    const [open, setOpen] = React.useState(false);
    const closePopper = () => setOpen(false);
    const openPopper = (event: React.SyntheticEvent<Element, Event>) => {
        onOpen(event);
        setOpen(true);
    };

    const renderTags = React.useCallback(
        (tags: Options, getTagProps: AutocompleteRenderGetTagProps) =>
            tags.map((tag, index) => {
                const { key, ...restProps } = getTagProps({
                    index
                });
                const allowDelete = !!fixedOptions.find(
                    fixedTagOption => fixedTagOption.value === tag.value
                );
                return (
                    <Chip
                        key={key}
                        label={tag.label}
                        {...restProps}
                        deleteIcon={allowDelete ? <></> : undefined}
                    />
                );
            }),
        [fixedOptions]
    );

    const getDisabledOption = React.useCallback(
        (option: Option) =>
            !![...fixedOptions, ...disabledOptions].find(
                element => element.value === option.value
            ),
        [disabledOptions, fixedOptions]
    );

    const onSelectChange = React.useCallback(
        (
            e: React.SyntheticEvent,
            value: Options | Option | null,
            reason: AutocompleteChangeReason
        ) => {
            if (
                fixedOptions.length &&
                (reason === 'clear' || reason === 'removeOption') &&
                Array.isArray(value)
            ) {
                const selectedOptions = _.uniqBy(
                    [...fixedOptions, ...value],
                    option => option.value
                );
                onChange(e, selectedOptions, reason);
            } else {
                onChange(e, value, reason);
            }
        },
        [fixedOptions, onChange]
    );

    return (
        <Autocomplete
            open={open}
            onOpen={openPopper}
            onClose={closePopper}
            sx={
                size === 'small'
                    ? {
                          ...sx,
                          '.MuiAutocomplete-tag': {
                              margin: '1px 2px'
                          },
                          '.MuiChip-root': {
                              height: '20px',
                              fontSize: '0.75rem'
                          }
                      }
                    : sx
            }
            disablePortal={useWidth() === 'xs' ? true : false}
            size={size}
            autoComplete={false}
            disableCloseOnSelect={multiple}
            limitTags={limitTags}
            id={id}
            defaultValue={defaultValue}
            disableClearable={disableClearable}
            multiple={multiple}
            options={options}
            onInputChange={onInputChange}
            onChange={onSelectChange}
            onBlur={onBlur}
            getOptionLabel={(option: any) => option?.label || ''}
            value={value}
            freeSolo={freeSolo}
            clearOnBlur={clearOnBlur}
            disabled={disabled}
            ListboxProps={ListboxProps}
            blurOnSelect={blurOnSelect}
            renderTags={fixedOptions.length ? renderTags : undefined}
            getOptionDisabled={getDisabledOption}
            filterOptions={!isFilterable ? options => options : undefined}
            renderOption={(props: any, option, { selected }) => (
                <React.Fragment key={option.value}>
                    <>
                        {/* //To be refactored */}
                        {props?.['data-option-index'] === 0 &&
                            options[0].value === 'NEW' &&
                            option.value !== 'NEW' && (
                                <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => {
                                        closePopper();
                                        onNewClick();
                                    }}
                                    sx={{
                                        px: 3,
                                        py: 1.5,
                                        justifyContent: 'start',
                                        fontWeight: 600
                                    }}
                                    startIcon={<AddIcon fontSize="small" />}
                                >
                                    {options[0].label}
                                </Button>
                            )}
                        {option.value === 'NEW' ? (
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => {
                                    closePopper();
                                    onNewClick();
                                }}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    justifyContent: 'start',
                                    fontWeight: 600
                                }}
                                startIcon={<AddIcon fontSize="small" />}
                            >
                                {option.label}
                            </Button>
                        ) : (
                            <li {...props}>
                                {optionType === 'checkbox' ? (
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                        autoFocus={autoFocus}
                                        id={id}
                                    />
                                ) : (
                                    <></>
                                )}

                                <Box>
                                    <Typography>{option.label}</Typography>
                                    {option.labelHelperText && (
                                        <Typography
                                            variant="caption"
                                            color={grey[600]}
                                        >
                                            {option.labelHelperText}
                                        </Typography>
                                    )}
                                </Box>
                            </li>
                        )}
                    </>
                </React.Fragment>
            )}
            inputValue={inputValue}
            renderInput={params => {
                return (
                    <TextField
                        {...params}
                        InputProps={{ ...params.InputProps, ...inputProps }}
                        autoComplete={autoComplete}
                        id={id}
                        error={error}
                        helperText={helperText}
                        required={required}
                        variant={variant}
                        placeholder={placeholder}
                        fullWidth
                        label={label}
                        autoFocus={autoFocus}
                        size={size}
                        name={name}
                    />
                );
            }}
        />
    );
};
