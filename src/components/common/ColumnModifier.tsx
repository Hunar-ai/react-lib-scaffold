import React from 'react';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import grey from '@mui/material/colors/grey';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

import { type Column } from 'components/common';
import { useGaHelper } from 'hooks';

interface Props {
    window?: () => Window;
    open: boolean;
    columns: Column[];
    onColumnModifierChange: (_: Column[]) => void;
    handleCloseColumnModifier: VoidFunction;
    top?: number;
    contentHeight?: number;
    anchorEl?: null | HTMLElement;
}
export const ColumnModifier = ({
    top = 110,
    anchorEl,
    open,
    columns,
    onColumnModifierChange,
    handleCloseColumnModifier
}: Props) => {
    const [updatedDisplayColumns, setUpdatedDisplayColumns] = React.useState<
        Column[]
    >([]);
    const [searchKey, setSearchKey] = React.useState('');
    const { captureGaEvent, getColumnModifierGAEvent } = useGaHelper();

    React.useEffect(() => {
        setUpdatedDisplayColumns(columns);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns.length]);

    React.useEffect(() => {
        if (open) {
            setSearchKey('');
        }
    }, [open]);

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        const selectedColumnIndex = updatedDisplayColumns.findIndex(
            (column: Column) => {
                return column.id === event.target.id;
            }
        );
        const updatedColumns = [...updatedDisplayColumns];
        if (updatedColumns[selectedColumnIndex])
            updatedColumns[selectedColumnIndex].isVisible = checked;
        setUpdatedDisplayColumns(updatedColumns);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
    };

    const filteredDisplayColumns = React.useMemo(() => {
        return updatedDisplayColumns.filter(col => {
            return col.headerText
                .toLowerCase()
                .includes(searchKey.toLowerCase());
        });
    }, [searchKey, updatedDisplayColumns]);

    const selectedColumnCount = React.useMemo(
        () =>
            updatedDisplayColumns.filter(column =>
                column.id !== 'id' && !('isVisible' in column)
                    ? true
                    : column.isVisible
            ).length,
        [updatedDisplayColumns]
    );

    const totalColumnCount = React.useMemo(
        () => updatedDisplayColumns.filter(column => column.id !== 'id').length,
        [updatedDisplayColumns]
    );

    const { changeEvent } = React.useMemo(
        () => getColumnModifierGAEvent(),
        [getColumnModifierGAEvent]
    );

    return (
        <Popover
            id={'column-modifier'}
            open={open}
            elevation={10}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <Grid container width={300}>
                <Grid item xs={12} position="relative" top={0}>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            variant="h6"
                            fontSize={`1.1rem`}
                            component="span"
                            fontWeight={600}
                            px={1.5}
                        >
                            Modify columns
                        </Typography>

                        <IconButton onClick={handleCloseColumnModifier}>
                            <ClearIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item md={12} px={1.5}>
                    <Typography variant="subtitle2" mb={1}>
                        Select columns to customise your table view
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12} px={1.5} py={1}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Search"
                        onChange={onSearchChange}
                        value={searchKey}
                        InputProps={{
                            sx: { px: 1 },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>

                <Grid
                    item
                    md={12}
                    maxHeight={`calc(100vh - 245px - ${top}px)`}
                    position="relative"
                    overflow="scroll"
                    id={'column-modifier-content'}
                >
                    <Grid container px={1.5}>
                        {filteredDisplayColumns
                            .filter((column: Column) => column.id !== 'id')
                            .map((column: Column) => (
                                <Grid item xs={12} key={column.id}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            mx: -1,
                                            px: 1,
                                            my: 0.25,
                                            ':hover': {
                                                bgcolor: grey[200]
                                            }
                                        }}
                                    >
                                        <FormControlLabel
                                            sx={{
                                                width: '100%',
                                                '.MuiFormControlLabel-label': {
                                                    color: grey[800],
                                                    fontSize: '0.875rem'
                                                }
                                            }}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    id={column.id}
                                                    checked={
                                                        !('isVisible' in column)
                                                            ? true
                                                            : column.isVisible
                                                    }
                                                    onChange={onChange}
                                                    disabled={
                                                        !('isVisible' in column)
                                                    }
                                                />
                                            }
                                            label={column.headerText}
                                        />
                                    </Paper>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent="space-between"
                alignItems="end"
                position="sticky"
                bottom={0}
                px={1.5}
                pb={1}
            >
                <Typography
                    variant="caption"
                    color={grey[600]}
                    component="span"
                >
                    {selectedColumnCount} of {totalColumnCount} selected
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {
                        captureGaEvent(changeEvent);
                        onColumnModifierChange(updatedDisplayColumns);
                        handleCloseColumnModifier();
                    }}
                >
                    SAVE
                </Button>
            </Grid>
        </Popover>
    );
};
