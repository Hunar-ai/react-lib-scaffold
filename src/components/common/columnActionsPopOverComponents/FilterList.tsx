import React from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

import { FilterOptionProps } from '../ColumnActionsPopOver';
import { FilterListSkeleton } from './FilterListSkeleton';

interface Props {
    filteredOptions: FilterOptionProps[];
    onChange: (_: React.ChangeEvent<HTMLInputElement>, __: boolean) => void;
}

const FilterList = ({ filteredOptions, onChange }: Props) => {
    const [filterUi, setFilterUi] = React.useState<JSX.Element[]>();
    const [, startTransition] = React.useTransition();

    React.useEffect(() => {
        startTransition(() => {
            setFilterUi(
                filteredOptions.map((option: FilterOptionProps) => (
                    <Grid item xs={12} px={2} key={option.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={option.checked}
                                    id={option.value}
                                    onChange={onChange}
                                    size="small"
                                    value={option.value}
                                />
                            }
                            label={option.label}
                        />
                    </Grid>
                ))
            );
        });
    }, [filteredOptions]);
    return <>{filterUi ? filterUi : <FilterListSkeleton count={6} />}</>;
};

export default FilterList;
