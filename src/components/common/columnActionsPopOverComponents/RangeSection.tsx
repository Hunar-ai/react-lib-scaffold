import React from 'react';
import _ from 'lodash';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { type RangeFilterKey, type TableFiltersProps } from 'interfaces';
import { useGaHelper } from 'hooks';

interface RangeSectionProps {
    id: RangeFilterKey;
    columnId: string;
    tableFiltersState?: TableFiltersProps;
    setTableFiltersState: (_: TableFiltersProps) => void;
}
export const RangeSection = ({
    id,
    columnId,
    tableFiltersState,
    setTableFiltersState
}: RangeSectionProps) => {
    const { captureGaEvent, getRangeFilterColumnGaEvent } = useGaHelper();
    const { minFieldEvent, maxFieldEvent, blankCheckboxEvent } =
        getRangeFilterColumnGaEvent(columnId);

    const [filterState, setFilterState] = React.useState({
        [id]: {
            min: _.get(tableFiltersState, `${id}.min`, ''),
            max: _.get(tableFiltersState, `${id}.max`, ''),
            none: _.get(tableFiltersState, `${id}.none`, false)
        }
    });

    const isRangeError = React.useMemo(() => {
        return (
            filterState[id].min !== '' &&
            filterState[id].max !== '' &&
            Number(filterState[id].max) < Number(filterState[id].min)
        );
    }, [filterState, id]);

    const onBlanksChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        captureGaEvent(blankCheckboxEvent);
        setFilterState({
            ...filterState,
            [id]: {
                ...filterState[id],
                none: checked
            }
        });

        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: { ...(tableFiltersState?.[id] || {}), none: checked }
        };

        setTableFiltersState({ ...modifiedTableFilters } as TableFiltersProps);
    };

    const onInputChange = (event: React.BaseSyntheticEvent) => {
        const filterName = event.target.name;
        const filterValue = event.target.value;
        setFilterState({
            ...filterState,
            [id]: {
                ...filterState[id],
                [filterName]: filterValue
            }
        });

        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: {
                ...tableFiltersState?.[id],
                [filterName]:
                    isNaN(Number(filterValue)) || filterValue === ''
                        ? ''
                        : Number(filterValue)
            }
        };
        setTableFiltersState({ ...modifiedTableFilters } as TableFiltersProps);
    };

    return (
        <Grid item md={12} height={194}>
            <Grid container rowSpacing={1}>
                <Grid item md={12}>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item md={5}>
                            <Typography variant="body2">
                                Filter by Range
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <TextField
                        name="min"
                        size="small"
                        fullWidth
                        placeholder="Min Value"
                        value={filterState[id].min}
                        onChange={onInputChange}
                        onClick={() => captureGaEvent(minFieldEvent)}
                        error={isRangeError}
                        type="number"
                    ></TextField>
                </Grid>
                <Grid item md={12}>
                    <TextField
                        name="max"
                        size="small"
                        fullWidth
                        placeholder="Max value"
                        value={filterState[id].max}
                        onChange={onInputChange}
                        onClick={() => captureGaEvent(maxFieldEvent)}
                        error={isRangeError}
                        type="number"
                        helperText={
                            isRangeError
                                ? 'Max value should be greater than min value'
                                : ''
                        }
                    ></TextField>
                </Grid>
                <Grid item md={12}>
                    <FormControlLabel
                        sx={{ fontSize: '1.4rem' }}
                        control={
                            <Checkbox
                                checked={filterState[id].none}
                                onChange={onBlanksChange}
                            />
                        }
                        label={'Blanks'}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};
