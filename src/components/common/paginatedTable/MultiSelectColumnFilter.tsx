import React from 'react';

import { Select } from 'components/common';
import { Options, type Option } from 'interfaces';

type TableFiltersProps = Record<string, string[] | null>;

interface MultiSelectColumnFilterProps {
    column: {
        filterOptions: Options;
        filters: {
            tableFilters: TableFiltersProps;
            setTableFilters: (_: TableFiltersProps) => void;
        };
        id: string;
    };
}

export const MultiSelectColumnFilter = ({
    column
}: MultiSelectColumnFilterProps) => {
    const {
        filterOptions,
        filters: { tableFilters, setTableFilters },
        id
    } = column;

    const getSelectedValue = () => {
        const tableFiltersLength = tableFilters[id]?.length || 0;
        const selectedOptions =
            tableFiltersLength > 0
                ? tableFilters[id]?.map((value: string) => {
                      return filterOptions.find(
                          (option: Option) => option.value === value
                      );
                  })
                : [];
        return selectedOptions;
    };

    const onFilterChange = (selectedOptions: Option[]) => {
        setTableFilters({
            ...tableFilters,
            [id]:
                selectedOptions.length > 0
                    ? selectedOptions.map(
                          (selectedOption: Option) => selectedOption.value
                      )
                    : null
        });
    };

    return (
        <Select
            multiple
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
            onChange={(__, selectedOptions) => {
                onFilterChange(selectedOptions);
            }}
        />
    );
};
