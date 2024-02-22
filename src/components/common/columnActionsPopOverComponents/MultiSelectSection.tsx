import React from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {
    type TableFiltersProps,
    type Option,
    type MultiSelectFilterKey
} from 'interfaces';
import _ from 'lodash';
import { FilterOptionsProps } from '../ColumnActionsPopOver';
import { FilterListSkeleton } from './FilterListSkeleton';
import { useGaHelper } from 'hooks';

interface MultiSelectSectionProps {
    id: MultiSelectFilterKey;
    columnId: string;
    optionsState: FilterOptionsProps;
    setOptionsState: (_: FilterOptionsProps) => void;
    tableFiltersState?: TableFiltersProps;
    setTableFiltersState: (_: TableFiltersProps) => void;
}

interface toggleSelectAllOptions {
    modifiedTableFilters: TableFiltersProps;
}

const FilterList = React.lazy(() => import('./FilterList'));
const MultiSelectSection = ({
    id,
    columnId,
    optionsState,
    setOptionsState,
    tableFiltersState,
    setTableFiltersState
}: MultiSelectSectionProps) => {
    const [filteredOptions, setFilteredOptions] =
        React.useState<FilterOptionsProps>(optionsState);
    const [selectAll, setSelectAll] = React.useState<boolean>(false);
    const { captureGaEvent, getFilterColumnGaEvent } = useGaHelper();

    const {
        getFilterCheckBoxEvent,
        filterClearEvent,
        filterSearchFieldEvent,
        filterDeselectAllEvent,
        filterSelectAllEvent
    } = getFilterColumnGaEvent(columnId);

    const toggleSelectAllOptions = ({
        modifiedTableFilters
    }: toggleSelectAllOptions) => {
        const modifiedOptionsState = optionsState?.map((option: Option) => {
            return { ...option, checked: !selectAll };
        });
        const modifiedFilterOptions = filteredOptions?.map((option: Option) => {
            return { ...option, checked: !selectAll };
        });
        setSelectAll(!selectAll);
        setTableFiltersState(modifiedTableFilters);
        setOptionsState(modifiedOptionsState);
        setFilteredOptions(modifiedFilterOptions);
    };

    const onClearClick = () => {
        captureGaEvent(filterClearEvent);
        const modifiedOptionsState = optionsState?.map((option: Option) => {
            return { ...option, checked: false };
        });
        const modifiedFilterOptions = filteredOptions?.map((option: Option) => {
            return { ...option, checked: false };
        });

        setSelectAll(false);
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: []
        };
        setTableFiltersState({ ...modifiedTableFilters } as TableFiltersProps);
        setOptionsState(modifiedOptionsState);
        setFilteredOptions(modifiedFilterOptions);
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            captureGaEvent(filterDeselectAllEvent);
            const modifiedTableFilters = {
                ...tableFiltersState,
                [id]: []
            };
            toggleSelectAllOptions({
                modifiedTableFilters: modifiedTableFilters as TableFiltersProps
            });
        } else {
            captureGaEvent(filterSelectAllEvent);
            const modifiedTableFilters: Partial<TableFiltersProps> = {
                ...tableFiltersState,
                [id]: optionsState?.map((option: Option) => {
                    return option.value;
                })
            };

            toggleSelectAllOptions({
                modifiedTableFilters: modifiedTableFilters as TableFiltersProps
            });
        }
    };

    const getModifiedOptions = (
        options: FilterOptionsProps,
        modifiedTableFilters: Partial<TableFiltersProps>,
        checked: boolean
    ) => {
        return options?.map((option: Option) => {
            const index = modifiedTableFilters[id]?.indexOf(option.value);

            if (index !== undefined && index > -1) {
                return { ...option, checked };
            }
            return { ...option, checked: !checked };
        });
    };

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        const modifiedTableFilters: Partial<TableFiltersProps> =
            tableFiltersState?.[id]
                ? { ...tableFiltersState }
                : { ...tableFiltersState, [id]: [] };

        captureGaEvent(getFilterCheckBoxEvent(event.target.value));
        if (checked) {
            modifiedTableFilters[id] = modifiedTableFilters[id]?.concat([
                event.target.value
            ]);
        } else {
            if (modifiedTableFilters[id]?.length) {
                const index = modifiedTableFilters[id]?.indexOf(
                    event.target.value
                );
                if (index !== undefined && index > -1)
                    modifiedTableFilters[id]?.splice(index, 1);
            }
            setSelectAll(false);
        }

        const modifiedOptionsState = getModifiedOptions(
            optionsState,
            modifiedTableFilters,
            true
        );

        const modifiedFilterOptions = getModifiedOptions(
            filteredOptions,
            modifiedTableFilters,
            true
        );
        setTableFiltersState(modifiedTableFilters as TableFiltersProps);
        setOptionsState(modifiedOptionsState);
        setFilteredOptions(modifiedFilterOptions);
    };

    const onSearchChange = (event: React.BaseSyntheticEvent) => {
        const searchInput = event.target.value;
        let modifiedOptionsState = [...optionsState];
        modifiedOptionsState = _.filter(modifiedOptionsState, o => {
            return _.lowerCase(o.label).includes(_.lowerCase(searchInput));
        });

        setFilteredOptions(modifiedOptionsState);
    };

    return (
        <>
            <Grid item md={12}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item md={selectAll ? 4 : 5}>
                        <Typography variant="body2">Filter</Typography>
                    </Grid>
                    <Grid item md={selectAll ? 5 : 4}>
                        <Button size="small" onClick={toggleSelectAll}>
                            {selectAll ? `De-Select All` : `Select All`}
                        </Button>
                    </Grid>

                    <Grid item md={3}>
                        <Button size="small" onClick={onClearClick}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={12}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Search"
                    onChange={onSearchChange}
                    onClick={() => captureGaEvent(filterSearchFieldEvent)}
                    autoComplete="nope"
                ></TextField>
            </Grid>
            <Grid item md={12} maxHeight={218} overflow="scroll">
                <React.Suspense fallback={<FilterListSkeleton count={6} />}>
                    <FilterList
                        filteredOptions={filteredOptions}
                        onChange={onChange}
                    />
                </React.Suspense>
            </Grid>
        </>
    );
};

export default MultiSelectSection;
