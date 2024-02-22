import * as React from 'react';
import _ from 'lodash';

import type { AutocompleteChangeReason } from '@mui/material/Autocomplete';

import { useFormUtils } from 'hooks';
import { Options, Option, FormFields } from 'interfaces';
import { Select } from './Select';
import { SxProps } from '@mui/material/styles';

interface StateSelectProps {
    id?: string;
    label: string;
    name: string;
    disabled?: boolean;
    field: 'currentState' | 'state';
    formFields: FormFields;
    selectedState?: string[] | null;
    showSelectAll?: boolean;
    size?: 'small' | 'medium';
    multiple?: boolean;
    freeSolo?: boolean;
    blurOnSelect?: boolean;
    limitTags?: number;
    value?:
        | { value: string; label: string }
        | Option
        | (Option | undefined)[]
        | null;
    disableClearable?: boolean;
    sx?: SxProps;
    onChange: (
        event: React.SyntheticEvent,
        value: string[] | string,
        reason: AutocompleteChangeReason
    ) => void;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const StateSelect = ({
    id,
    label,
    name,
    disabled,
    formFields,
    selectedState,
    showSelectAll = false,
    size,
    freeSolo,
    blurOnSelect,
    limitTags,
    value,
    multiple = true,
    disableClearable,
    sx,
    onChange,
    onBlur
}: StateSelectProps) => {
    const [selectedStates, setSelectedStates] = React.useState<Options>([]);
    const { getMultiSelectedOptions } = useFormUtils(formFields);

    const stateOptions: Options = React.useMemo(() => {
        if (
            showSelectAll &&
            formFields['state'].find(
                (state: Option) => state.value === 'selectAll'
            ) === undefined
        )
            formFields['state'].unshift({
                label: 'Select All',
                value: 'selectAll'
            });
        return formFields['state'];
    }, [formFields, showSelectAll]);

    const getSelectedState = React.useCallback(() => {
        if (
            showSelectAll &&
            _.isEqual(
                stateOptions
                    .map(state => state.value)
                    .filter(value => value !== 'selectAll'),
                selectedState
            )
        ) {
            return stateOptions.filter((option: Option) => {
                return option.value === 'selectAll';
            });
        }

        return getMultiSelectedOptions({
            field: 'state',
            fieldValue: selectedState
        });
    }, [getMultiSelectedOptions, selectedState, showSelectAll, stateOptions]);

    const onStateChange = (
        event: React.SyntheticEvent,
        value: string[],
        reason: AutocompleteChangeReason
    ) => {
        if (showSelectAll && value[value.length - 1] === 'selectAll') {
            if (
                selectedStates.find(
                    (selectedState: Option) =>
                        selectedState.value === 'selectAll'
                )
            )
                setSelectedStates([]);
            else {
                setSelectedStates(stateOptions);
                onChange(
                    event,
                    stateOptions
                        .map((selectedState: Option) => selectedState.value)
                        .filter((state: string) => {
                            return state !== 'selectAll';
                        }),
                    reason
                );
            }
        } else {
            let selectedStateOptions = value.map(
                (selectedState: string) =>
                    stateOptions.filter(
                        state => state.value === selectedState
                    )[0]
            );

            selectedStateOptions = selectedStateOptions.filter(
                (state: Option) => {
                    return state && state.value !== 'selectAll';
                }
            );
            setSelectedStates(selectedStateOptions);
            onChange(
                event,
                selectedStateOptions.map(
                    (selectedState: Option) => selectedState.value
                ),
                reason
            );
        }
    };

    return (
        <Select
            size={size}
            multiple={multiple}
            options={stateOptions}
            variant="outlined"
            label={label}
            name={name}
            id={id}
            disabled={disabled}
            value={value ?? getSelectedState()}
            freeSolo={freeSolo}
            blurOnSelect={blurOnSelect}
            disableClearable={disableClearable}
            limitTags={limitTags}
            sx={sx}
            onChange={(e, selectedOptions: Options | Option, reason) => {
                if (Array.isArray(selectedOptions)) {
                    const selectedOption = selectedOptions.map(
                        (datum: Option) => datum?.value
                    );
                    onStateChange(e, selectedOption, reason);
                } else if (freeSolo) {
                    onChange(e, selectedOptions.value, reason);
                }
            }}
            onBlur={onBlur}
        />
    );
};
