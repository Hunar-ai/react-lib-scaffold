import React from 'react';
import _ from 'lodash';

import FilterListIcon from '@mui/icons-material/FilterList';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import {
    SortSection,
    RangeSection,
    DateRangeTypeSelect
} from './columnActionsPopOverComponents';
import MultiSelectSection from './columnActionsPopOverComponents/MultiSelectSection';

import {
    type Option,
    type Sort,
    type TableFiltersProps,
    type FilterKey,
    type MultiSelectFilterKey,
    type RangeFilterKey,
    type ColumnFilterProps,
    type DateRangeFilterKey
} from 'interfaces';
import { FILTER_TYPE, SORT_TYPE } from 'Enum';
import { useHelper } from 'useHelper';
import { useGaHelper } from 'hooks';

export interface FilterOptionProps extends Option {
    checked: boolean;
}

export type FilterOptionsProps = FilterOptionProps[];

export const ColumnActionsPopOver = ({ column }: ColumnFilterProps) => {
    const {
        isMultiSelect: getIsMultiSelect,
        isRangeSelect,
        isDateRangeSelect
    } = useHelper();
    const { getColumnActionGaEvent, captureGaEvent } = useGaHelper();

    const {
        id: columnId,
        columnActionsProps,
        columnActionsProps: {
            sortProps: { sort, handleSort, sortType = SORT_TYPE.DEFAULT }
        }
    } = column;

    const { clickIconEvent, applyEvent, cancelEvent } = React.useMemo(
        () => getColumnActionGaEvent(columnId),
        [columnId, getColumnActionGaEvent]
    );

    const id: FilterKey =
        columnId.split('.').length > 1
            ? (columnId.split('.')[1] as FilterKey)
            : (columnId.split('.')[0] as FilterKey);

    const isMultiSelect = getIsMultiSelect(id);

    const isRange = isRangeSelect(id);
    const isDateRange = isDateRangeSelect(id);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [optionsState, setOptionsState] = React.useState<FilterOptionsProps>(
        []
    );

    const [tableFiltersState, setTableFiltersState] =
        React.useState<TableFiltersProps>();
    const [selectedDateFilter, setSelectedDateFilter] = React.useState('');
    const [selectedDateFilterCopy, setSelectedDateFilterCopy] =
        React.useState<string>('');
    const [isDateFilterApplied, setIsDateFilterApplied] =
        React.useState<boolean>(false);
    const [showColumnActions, setShowColumnActions] =
        React.useState<boolean>(false);
    const [sortState, setSortState] = React.useState<Sort | undefined>(sort);

    React.useEffect(() => {
        if (columnActionsProps.filterProps) {
            if (isMultiSelect) {
                const {
                    options = [],
                    filters: { tableFilters, hideBlanks }
                } = columnActionsProps.filterProps;
                const modifiedOptionsState = (
                    hideBlanks ? [] : [{ value: 'NONE', label: 'Blanks' }]
                )
                    .concat(options)
                    ?.map((option: Option) => {
                        const filterValueArray = tableFilters[id]
                            ? tableFilters[id]
                            : [];
                        if (
                            Array.isArray(filterValueArray) &&
                            filterValueArray.indexOf(option.value) > -1
                        ) {
                            return { ...option, checked: true };
                        }
                        return { ...option, checked: false };
                    });

                setOptionsState(
                    _.orderBy(modifiedOptionsState, ['checked'], 'desc')
                );
                setTableFiltersState(tableFilters);
            } else {
                const {
                    filters: { tableFilters }
                } = columnActionsProps.filterProps;
                setTableFiltersState(tableFilters);
            }
            setSortState(sort);
        }
    }, [
        id,
        columnActionsProps.filterProps,
        showColumnActions,
        isMultiSelect,
        sort
    ]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        captureGaEvent(clickIconEvent);
        setAnchorEl(event.currentTarget);
        setShowColumnActions(true);
        if (!isDateFilterApplied) {
            setSelectedDateFilter('');
        }
    };

    const handleClose = () => {
        captureGaEvent(cancelEvent);
        setAnchorEl(null);
        setShowColumnActions(false);
        setSelectedDateFilter(selectedDateFilterCopy);
    };

    const applyColumnActions = (id: FilterKey) => {
        setIsDateFilterApplied(false);
        setSelectedDateFilterCopy(selectedDateFilter);
        if (isRange) {
            const min = _.get(tableFiltersState, `${id}.min`, '');
            const max = _.get(tableFiltersState, `${id}.max`, '');
            if (min !== '' && max !== '' && Number(max) < Number(min)) {
                return;
            }
        }
        if (sortState) handleSort(sortState);
        if (columnActionsProps.filterProps && tableFiltersState) {
            const modifiedTableFiltersState: Partial<TableFiltersProps> = {
                ...tableFiltersState
            };
            if (
                isMultiSelect &&
                [modifiedTableFiltersState[id] || []]?.length === 0
            )
                delete modifiedTableFiltersState[id];
            else if (
                isRange &&
                Object.keys(modifiedTableFiltersState?.[id] || {}).length === 0
            ) {
                delete modifiedTableFiltersState[id];
            }
            columnActionsProps.filterProps.filters.setTableFilters(
                modifiedTableFiltersState as TableFiltersProps
            );
        }
        if (isDateRange && selectedDateFilter !== '') {
            setIsDateFilterApplied(true);
        }
        setAnchorEl(null);
        setShowColumnActions(false);
    };

    const popoverId = showColumnActions
        ? `column-actions-popover-${id}`
        : undefined;

    const multiSelectValues = _.get(
        columnActionsProps,
        `filterProps.filters.tableFilters.${id}`,
        []
    );

    const handleApplyClick = () => {
        captureGaEvent(applyEvent);
        applyColumnActions(id);
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                type="button"
                color={
                    (isMultiSelect &&
                        Array.isArray(multiSelectValues) &&
                        multiSelectValues.length) ||
                    (isRange &&
                        Object.keys(
                            columnActionsProps.filterProps?.filters
                                .tableFilters[id] || {}
                        ).length) ||
                    sort?.key === columnId
                        ? 'primary'
                        : 'default'
                }
            >
                <FilterListIcon fontSize="small" />
            </IconButton>
            <Popover
                anchorEl={anchorEl}
                id={popoverId}
                open={showColumnActions}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Grid container width={258} p={2} rowSpacing={2}>
                    <SortSection
                        sortType={sortType}
                        sortState={sortState}
                        setSortState={setSortState}
                        id={columnId}
                    />

                    {columnActionsProps.filterProps?.filterType ===
                        FILTER_TYPE.MULTI_SELECT && isMultiSelect ? (
                        <MultiSelectSection
                            id={id as MultiSelectFilterKey}
                            columnId={columnId}
                            optionsState={optionsState}
                            setOptionsState={setOptionsState}
                            tableFiltersState={tableFiltersState}
                            setTableFiltersState={setTableFiltersState}
                        />
                    ) : columnActionsProps.filterProps?.filterType ===
                          FILTER_TYPE.RANGE && isRange ? (
                        <RangeSection
                            id={id as RangeFilterKey}
                            columnId={columnId}
                            tableFiltersState={tableFiltersState}
                            setTableFiltersState={setTableFiltersState}
                        />
                    ) : columnActionsProps.filterProps?.filterType ===
                          FILTER_TYPE.DATE_RANGE && isDateRange ? (
                        <DateRangeTypeSelect
                            id={id as DateRangeFilterKey}
                            tableFiltersState={tableFiltersState}
                            setTableFiltersState={setTableFiltersState}
                            setSelectedDateFilter={setSelectedDateFilter}
                            selectedDateFilter={selectedDateFilter}
                        />
                    ) : (
                        <></>
                    )}
                    <Grid item md={12}>
                        <Grid
                            height="100%"
                            container
                            justifyContent="end"
                            alignItems="end"
                            columnSpacing={1}
                        >
                            <Grid item>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleApplyClick}
                                >
                                    APPLY
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={handleClose}
                                    type="button"
                                >
                                    CANCEL
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Popover>
        </>
    );
};
