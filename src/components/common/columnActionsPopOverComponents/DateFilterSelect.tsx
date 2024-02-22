import React from 'react';

import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {
    type DateRangeFilterKey,
    type TableFiltersProps,
    DateRangeFilterOptionProps,
    DateFilterState
} from 'interfaces';
import { TimeUtils } from 'utils';
import { DATE_FILTER_SELECT_TYPE } from 'Enum';

interface DateFilterSelectProps {
    tableFiltersState?: TableFiltersProps;
    setTableFiltersState: (_: TableFiltersProps) => void;
    id: DateRangeFilterKey;
    setSelectedDateFilter: (_: string) => void;
    selectedDateFilter: string;
    setFilterState: (_: DateFilterState) => void;
}

const filterOptions: DateRangeFilterOptionProps = {
    yesterday: {
        label: 'Yesterday',
        value: DATE_FILTER_SELECT_TYPE.yesterday,
        extraProps: {
            startDate: {
                period: 1
            },
            endDate: {
                period: 1
            }
        }
    },
    today: {
        label: 'Today',
        value: DATE_FILTER_SELECT_TYPE.today,
        extraProps: {
            startDate: {
                period: 0
            },
            endDate: {
                period: 0
            }
        }
    },
    past7Days: {
        label: 'Past 7 days',
        value: DATE_FILTER_SELECT_TYPE.past7Days,
        extraProps: {
            startDate: {
                period: 7
            },
            endDate: {
                period: 0
            }
        }
    },
    lastMonth: {
        label: 'Last One Month',
        value: DATE_FILTER_SELECT_TYPE.lastMonth,
        extraProps: {
            startDate: {
                period: 1,
                unit: 'months'
            },
            endDate: {
                period: 0
            }
        }
    },
    dateRange: {
        label: 'Date Range',
        value: DATE_FILTER_SELECT_TYPE.dateRange,
        extraProps: {
            startDate: {
                period: 0
            },
            endDate: {
                period: 0
            }
        }
    }
};

interface FilterOptionsExtraProps {
    date: Date | string;
    period: string | number;
    unit: 'days' | 'months' | 'years';
}

export const DateFilterSelect = ({
    tableFiltersState,
    setTableFiltersState,
    id,
    setSelectedDateFilter,
    selectedDateFilter,
    setFilterState
}: DateFilterSelectProps) => {
    const calculateDate = ({ period, unit, date }: FilterOptionsExtraProps) => {
        const exactDate = TimeUtils.subtract({
            date: date,
            period: period,
            unit: unit
        });

        return TimeUtils.getISOString(exactDate);
    };

    const setModifiedFilters = React.useCallback(
        (startDate?: string, endDate?: string) => {
            const modifiedTableFilters: Partial<TableFiltersProps> = {
                ...tableFiltersState,
                [id]: {
                    ...tableFiltersState?.[id],
                    startDate,
                    endDate
                }
            };
            setTableFiltersState({
                ...modifiedTableFilters
            } as TableFiltersProps);
        },
        [id, setTableFiltersState, tableFiltersState]
    );

    const onFilterChange = (event: SelectChangeEvent) => {
        setSelectedDateFilter(event.target.value);
        if (event.target.value !== DATE_FILTER_SELECT_TYPE.dateRange) {
            const selectedFilter =
                filterOptions?.[
                    event.target.value as keyof typeof filterOptions
                ];
            const extraProps = { ...selectedFilter?.extraProps };

            const startDate = calculateDate({
                date: TimeUtils.getUTCStartOfTheDay(),
                unit: extraProps.startDate.unit
                    ? extraProps?.startDate?.unit
                    : 'days',
                period: extraProps.startDate.period
            });

            const endDate = calculateDate({
                date: TimeUtils.getUTCEndOfTheDay(),
                unit: extraProps.endDate.unit
                    ? extraProps?.endDate?.unit
                    : 'days',
                period: extraProps.endDate.period
            });
            setModifiedFilters(startDate, endDate);
        } else {
            setFilterState({});
            const modifiedTableFilters: Partial<TableFiltersProps> = {
                ...tableFiltersState,
                [id]: {}
            };

            setTableFiltersState({
                ...modifiedTableFilters
            } as TableFiltersProps);
        }
    };

    const onClearClick = () => {
        setSelectedDateFilter('');
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: {}
        };

        setTableFiltersState({
            ...modifiedTableFilters
        } as TableFiltersProps);
    };

    return (
        <>
            <FormControl sx={{ width: '100%' }}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                >
                    <Typography variant="body2">Select Filter</Typography>
                    <Button size="small" onClick={onClearClick}>
                        Clear
                    </Button>
                </Grid>
                {/* <InputLabel size="small" id="select">
                    Select Filter
                </InputLabel> */}
                <Select
                    labelId="select"
                    id="select"
                    size="small"
                    sx={{ width: '100%' }}
                    value={selectedDateFilter}
                    onChange={onFilterChange}
                    // label="Select Filter"
                >
                    {Object.values(filterOptions).map(option => {
                        return (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};
