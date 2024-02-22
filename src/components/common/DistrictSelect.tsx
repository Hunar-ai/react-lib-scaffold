import * as React from 'react';
import _ from 'lodash';

import type { AutocompleteChangeReason } from '@mui/material/Autocomplete';

import { useFormUtils } from 'hooks';
import { Options, Option, FormFields } from 'interfaces';
import { Select } from './Select';
import { SxProps } from '@mui/material/styles';

interface DistrictSelectProps {
    id?: string;
    label: string;
    name: string;
    disabled?: boolean;
    field: 'location' | 'district' | 'currentDistrict';
    formFields: FormFields;
    selectedDistrict?: string[] | null;
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

export const DistrictSelect = ({
    id,
    label,
    name,
    disabled,
    formFields,
    selectedDistrict,
    showSelectAll = true,
    size,
    multiple = true,
    freeSolo,
    blurOnSelect,
    limitTags,
    value,
    disableClearable,
    sx,
    onChange,
    onBlur
}: DistrictSelectProps) => {
    const [selectedDistricts, setSelectedDistricts] = React.useState<Options>(
        []
    );
    const { getMultiSelectedOptions } = useFormUtils(formFields);

    const stateOptions: Options = React.useMemo(() => {
        const updatedFormFields = { ...formFields };
        if (
            showSelectAll &&
            updatedFormFields['district'].find(
                (state: Option) => state.value === 'selectAll'
            ) === undefined
        )
            updatedFormFields['district'].unshift({
                label: 'Select All',
                value: 'selectAll'
            });
        return updatedFormFields['district'];
    }, [formFields, showSelectAll]);

    const getSelectedDistrict = React.useCallback(() => {
        if (
            showSelectAll &&
            _.isEqual(
                stateOptions
                    .map(state => state.value)
                    .filter(value => value !== 'selectAll'),
                selectedDistrict
            )
        ) {
            return stateOptions.filter((option: Option) => {
                return option.value === 'selectAll';
            });
        }

        return getMultiSelectedOptions({
            field: 'district',
            fieldValue: selectedDistrict
        });
    }, [
        getMultiSelectedOptions,
        selectedDistrict,
        showSelectAll,
        stateOptions
    ]);

    const onDistrictChange = (
        event: React.SyntheticEvent,
        value: string[],
        reason: AutocompleteChangeReason
    ) => {
        if (showSelectAll && value[value.length - 1] === 'selectAll') {
            if (
                selectedDistricts.find(
                    (selectedDistrict: Option) =>
                        selectedDistrict.value === 'selectAll'
                )
            )
                setSelectedDistricts([]);
            else {
                setSelectedDistricts(stateOptions);
                onChange(
                    event,
                    stateOptions
                        .map(
                            (selectedDistrict: Option) => selectedDistrict.value
                        )
                        .filter((state: string) => {
                            return state !== 'selectAll';
                        }),
                    reason
                );
            }
        } else {
            let selectedDistrictOptions = value.map(
                (selectedDistrict: string) =>
                    stateOptions.filter(
                        state => state.value === selectedDistrict
                    )[0]
            );

            selectedDistrictOptions = selectedDistrictOptions.filter(
                (state: Option) => {
                    return state && state.value !== 'selectAll';
                }
            );
            setSelectedDistricts(selectedDistrictOptions);
            onChange(
                event,
                selectedDistrictOptions.map(
                    (selectedDistrict: Option) => selectedDistrict.value
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
            value={value ?? getSelectedDistrict()}
            freeSolo={freeSolo}
            blurOnSelect={blurOnSelect}
            disableClearable={disableClearable}
            limitTags={limitTags}
            sx={sx}
            onChange={(e, selectedOptions: Options | Option, reason) => {
                if (Array.isArray(selectedOptions)) {
                    const selectedOption = selectedOptions.map(
                        (datum: Option) => datum.value
                    );
                    onDistrictChange(e, selectedOption, reason);
                } else if (freeSolo) {
                    onChange(e, selectedOptions.value, reason);
                }
            }}
            onBlur={onBlur}
        />
    );
};
