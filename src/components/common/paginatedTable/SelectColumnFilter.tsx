import React from 'react';

import { Select } from 'components/common';
import { type Option, type Options } from 'interfaces';

type TableFiltersProps = Record<string, string | null>;
interface SelectColumnFilterProps {
    column: {
        filterOptions: Options;
        filters: {
            tableFilters: TableFiltersProps;
            setTableFilters: (_: TableFiltersProps) => void;
        };
        id: string;
    };
}

export const SelectColumnFilter = ({ column }: SelectColumnFilterProps) => {
    const {
        filterOptions,
        filters: { tableFilters, setTableFilters },
        id
    } = column;

    const getSelectedValue = () => {
        const selectedOption = filterOptions.find(
            (option: Option) => option.value === tableFilters[id]
        );
        if (selectedOption === undefined) return null;
        return selectedOption;
    };

    const onFilterChange = (selectedOption: Option) => {
        let modifiedTableFilters = { ...tableFilters };
        if (!selectedOption) {
            delete modifiedTableFilters[id];
        } else {
            modifiedTableFilters = {
                ...tableFilters,
                [id]: selectedOption.value
            };
        }
        setTableFilters({ ...modifiedTableFilters });
    };

    return (
        <Select
            sx={{
                width: '100%'
            }}
            ListboxProps={{
                style: {
                    fontSize: 14
                }
            }}
            size="small"
            options={filterOptions}
            variant="outlined"
            label="Select"
            name="select"
            value={getSelectedValue()}
            onChange={(__, selectedOption) => {
                onFilterChange(selectedOption);
            }}
        />
    );
};
