import React from 'react';
import _ from 'lodash';

import Grid from '@mui/material/Grid';

import { DateFilterSelect } from './DateFilterSelect';
import { DateRangePicker } from '../DateRangePicker';

import { TimeUtils } from 'utils';
import { DATE_FILTER_SELECT_TYPE, FIELD_SIZE } from 'Enum';

import {
    type DateFilterState,
    type DateRangeFilterKey,
    type TableFiltersProps
} from 'interfaces';

interface DateRangeTypeSelectProps {
    id: DateRangeFilterKey;
    tableFiltersState?: TableFiltersProps;
    setTableFiltersState: (_: TableFiltersProps) => void;
    setSelectedDateFilter: (_: string) => void;
    selectedDateFilter: string;
}

export const DateRangeTypeSelect = ({
    id,
    tableFiltersState,
    setTableFiltersState,
    setSelectedDateFilter,
    selectedDateFilter
}: DateRangeTypeSelectProps) => {
    const [filterState, setFilterState] = React.useState<DateFilterState>({
        startDate: _.get(tableFiltersState, `${id}.startDate`, ''),
        endDate: _.get(tableFiltersState, `${id}.endDate`, '')
    });

    const onChangeDates = (fieldName: string, selectedDate: Date | null) => {
        setFilterState({
            ...filterState,
            ...filterState,
            [fieldName]: selectedDate ? selectedDate : ''
        });
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: {
                ...tableFiltersState?.[id],
                [fieldName]: selectedDate
                    ? TimeUtils.getUtcISOString(selectedDate)
                    : ''
            }
        };
        setTableFiltersState({ ...modifiedTableFilters } as TableFiltersProps);
    };

    const onClearFilter = React.useCallback(() => {
        setFilterState({
            startDate: null,
            endDate: null
        });
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: {}
        };
        setTableFiltersState({ ...modifiedTableFilters } as TableFiltersProps);
    }, [id, setFilterState, setTableFiltersState, tableFiltersState]);

    return (
        <Grid width="100%">
            <Grid item xs={12} mt={3}>
                <DateFilterSelect
                    id={id}
                    setTableFiltersState={setTableFiltersState}
                    tableFiltersState={tableFiltersState}
                    setSelectedDateFilter={setSelectedDateFilter}
                    selectedDateFilter={selectedDateFilter}
                    setFilterState={setFilterState}
                />
            </Grid>
            {selectedDateFilter === DATE_FILTER_SELECT_TYPE.dateRange && (
                <Grid item>
                    <DateRangePicker
                        filterState={filterState}
                        onChangeDates={onChangeDates}
                        onClearFilter={onClearFilter}
                        size={FIELD_SIZE.small}
                    />
                </Grid>
            )}
        </Grid>
    );
};
