import React from 'react';
import {
    useTable,
    useBlockLayout,
    useFilters,
    HeaderGroup,
    Column
} from 'react-table';

import { useSticky } from 'react-table-sticky';

import Grid from '@mui/material/Grid';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import useTheme from '@mui/material/styles/useTheme';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import grey from '@mui/material/colors/grey';

import {
    PaginatedTableHeader,
    PaginatedTableSkeleton,
    TextOverFlow
} from 'components/common';

import type { ReactElement } from 'interfaces';
import { useGaHelper, useWidth } from 'hooks';

export interface PaginationInfo {
    currentPage: number;
    numberOfPages: number;
    total: number;
    itemsPerPage: number;
    page?: number;
}

export interface Cell {
    row: {
        original: never;
    };
    value: never;
}

const paginationInfoInitialState: PaginationInfo = {
    currentPage: 1,
    numberOfPages: 1,
    total: 0,
    itemsPerPage: 25,
    page: 1
};

interface Props<TData extends object> {
    NoDataFound?: ReactElement;
    activeSortColumn?: string;
    activeFilterColumns?: string[];
    data: TData[];
    title?: ReactElement | string | null;
    columns: ReadonlyArray<Column<TData>>;
    rowsPerPageOptions?: number[];
    paginationInfo?: PaginationInfo;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (_: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    selectedRows?: string[];
    size?: 'small' | 'medium';
    tableHeaderCTA: ReactElement;
    subHeader?: { [key: string]: string };
    footer?: ReactElement;
    showPagination?: boolean;
    tableHeight?: number | string;
    onColumnSearch: (searchInput: string, column: keyof TData) => void;
    columnSearch: { [key: string]: string };
}

export default function StaticTable<TData extends object>({
    data,
    columns,
    isLoading,
    rowsPerPageOptions,
    paginationInfo = paginationInfoInitialState,
    footer,
    handleChangePage,
    handleChangeRowsPerPage,
    selectedRows = [],
    activeSortColumn,
    activeFilterColumns,
    NoDataFound,
    size = 'small',
    tableHeaderCTA,
    subHeader,
    showPagination = true,
    tableHeight = 'calc(100vh - 176px)',
    onColumnSearch,
    columnSearch
}: Props<TData>) {
    const screenWidth = useWidth();
    const theme = useTheme();
    const {
        onColumnSearchBoxClick,
        getTablePaginationGAEvent,
        captureGaEvent
    } = useGaHelper();
    const { currentPage, itemsPerPage, total } = paginationInfo;
    const extra = screenWidth === 'xs' ? useBlockLayout : useSticky;
    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSticky,
        extra
    );

    const generateEmptyRows = React.useCallback(() => {
        const rowsToGenerate =
            rows.length === 0 ? itemsPerPage : itemsPerPage - rows.length;
        if (rowsToGenerate > 0)
            return Array.from(Array(rowsToGenerate).keys()).map((_, i) => (
                <TableRow key={i}>
                    {columns.map((_: Column<TData>, j: number) => (
                        <TableCell key={j} height="41.8px" />
                    ))}
                </TableRow>
            ));
        return <></>;
    }, [columns, itemsPerPage, rows.length]);

    const hasActiveColumnAction = React.useCallback(
        (column: HeaderGroup<TData>) => {
            const columnHeadingArr = column.id.split('.');
            return (
                activeSortColumn === column.id ||
                activeFilterColumns?.includes(
                    columnHeadingArr.length > 1
                        ? columnHeadingArr[1]
                        : columnHeadingArr[0]
                )
            );
        },
        [activeFilterColumns, activeSortColumn]
    );

    const { rowsPerPageEvent, changePageEvent } = React.useMemo(
        () => getTablePaginationGAEvent(),
        [getTablePaginationGAEvent]
    );

    const onHandleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        captureGaEvent(rowsPerPageEvent);
        handleChangeRowsPerPage(event);
    };

    const onHandleChangePage = (event: unknown, page: number) => {
        captureGaEvent(changePageEvent);
        handleChangePage(event, page);
    };

    return (
        <>
            <PaginatedTableHeader tableHeaderCTA={tableHeaderCTA} />
            <TableContainer
                id="table-container"
                sx={{
                    '.MuiTableCell-stickyHeader': {
                        fontWeight: 900
                    },
                    height: tableHeight,
                    paddingBottom: '16px',
                    overflow: 'scroll',
                    fontFamily: 'Lato',
                    '.MuiTableCell-root': {
                        fontFamily: 'Lato',
                        '.MuiCheckbox-root': {
                            p: 0.8
                        },
                        '.MuiButtonBase-root': {
                            padding: 0.5
                        }
                    },

                    backgroundColor:
                        rows.length === 0 && !isLoading && NoDataFound
                            ? grey[100]
                            : 'white'
                }}
            >
                <MaUTable
                    {...getTableProps()}
                    stickyHeader
                    className="table sticky"
                    size={size}
                >
                    <TableHead sx={{ height: 50 }}>
                        {headerGroups.map((headerGroup, index) => (
                            <React.Fragment key={index}>
                                <TableRow
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map(
                                        (column, columnIndex) => (
                                            <React.Fragment key={columnIndex}>
                                                <TableCell
                                                    {...column.getHeaderProps({
                                                        style: {
                                                            color: hasActiveColumnAction(
                                                                column
                                                            )
                                                                ? theme.palette
                                                                      .primary
                                                                      .main
                                                                : '',
                                                            minWidth:
                                                                column.minWidth,
                                                            width: column.width,
                                                            maxWidth:
                                                                column.maxWidth,
                                                            zIndex:
                                                                100 -
                                                                columnIndex
                                                        }
                                                    })}
                                                >
                                                    <Grid
                                                        container
                                                        justifyContent="space-between"
                                                    >
                                                        <Grid item>
                                                            {column.render(
                                                                'Header'
                                                            )}
                                                        </Grid>

                                                        <Grid item>
                                                            <Grid
                                                                container
                                                                flexDirection="column"
                                                                alignItems="center"
                                                            >
                                                                {column.canFilter &&
                                                                column.Filter
                                                                    ? column.render(
                                                                          'Filter'
                                                                      )
                                                                    : null}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {column.id !== 'id' &&
                                                        column.id !==
                                                            'comments' && (
                                                            <Grid>
                                                                <TextField
                                                                    autoComplete="off"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    value={
                                                                        columnSearch[
                                                                            column
                                                                                .id
                                                                        ] || ''
                                                                    }
                                                                    onChange={e => {
                                                                        onColumnSearch(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            column.id as keyof TData
                                                                        );
                                                                    }}
                                                                    onClick={() =>
                                                                        onColumnSearchBoxClick(
                                                                            column.id
                                                                        )
                                                                    }
                                                                />
                                                            </Grid>
                                                        )}
                                                </TableCell>
                                            </React.Fragment>
                                        )
                                    )}
                                </TableRow>

                                {subHeader && rows.length ? (
                                    <TableRow>
                                        {headerGroup.headers.map(header => (
                                            <React.Fragment key={header.id}>
                                                <TableCell
                                                    {...header.getHeaderProps({
                                                        style: {
                                                            minWidth:
                                                                header.minWidth,
                                                            width: header.width,
                                                            maxWidth:
                                                                header.maxWidth,
                                                            top: 51,
                                                            backgroundColor:
                                                                grey[200]
                                                        }
                                                    })}
                                                >
                                                    <TextOverFlow
                                                        value={
                                                            subHeader[header.id]
                                                        }
                                                        maxWidth={
                                                            header.minWidth ||
                                                            200
                                                        }
                                                        sx={{ fontWeight: 600 }}
                                                    />
                                                    {}
                                                </TableCell>
                                            </React.Fragment>
                                        ))}
                                    </TableRow>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </TableHead>

                    <TableBody sx={{ maxHeight: 'calc(100vh - 168px)' }}>
                        {isLoading ? (
                            <PaginatedTableSkeleton
                                rowCount={itemsPerPage}
                                columnCount={columns.length}
                            />
                        ) : (
                            <>
                                {rows.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <React.Fragment
                                            key={row.values.id ?? i}
                                        >
                                            <TableRow
                                                {...row.getRowProps({
                                                    style: {
                                                        backgroundColor:
                                                            selectedRows.indexOf(
                                                                row.values.id
                                                            ) > -1
                                                                ? '#cfdff6'
                                                                : 'white'
                                                    }
                                                })}
                                            >
                                                {row.cells.map(
                                                    (cell, index) => {
                                                        return (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <TableCell
                                                                    {...cell.getCellProps(
                                                                        {
                                                                            style: {
                                                                                minWidth:
                                                                                    cell
                                                                                        .column
                                                                                        .minWidth,
                                                                                width: cell
                                                                                    .column
                                                                                    .width,
                                                                                maxWidth:
                                                                                    cell
                                                                                        .column
                                                                                        .maxWidth,
                                                                                zIndex:
                                                                                    1 +
                                                                                    index,
                                                                                backgroundColor:
                                                                                    selectedRows.indexOf(
                                                                                        row
                                                                                            .values
                                                                                            .id
                                                                                    ) >
                                                                                    -1
                                                                                        ? '#cfdff6'
                                                                                        : 'white'
                                                                            }
                                                                        }
                                                                    )}
                                                                >
                                                                    {cell.render(
                                                                        'Cell'
                                                                    )}
                                                                </TableCell>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                )}
                                            </TableRow>
                                        </React.Fragment>
                                    );
                                })}
                                {rows.length !== 0 && generateEmptyRows()}
                            </>
                        )}
                    </TableBody>
                </MaUTable>
                {rows.length === 0 && !isLoading && NoDataFound && (
                    <Grid
                        top="25%"
                        left="0%"
                        position="sticky"
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection="column"
                    >
                        {NoDataFound ? NoDataFound : null}
                    </Grid>
                )}
            </TableContainer>
            {showPagination && (
                <Grid
                    container
                    bgcolor="white"
                    alignItems="center"
                    sx={{ borderTop: `1px solid ${grey[300]}` }}
                >
                    <Grid item xs={6} md="auto">
                        <TablePagination
                            color="white"
                            rowsPerPageOptions={rowsPerPageOptions}
                            component="div"
                            count={total}
                            rowsPerPage={itemsPerPage}
                            page={currentPage - 1}
                            onPageChange={onHandleChangePage}
                            onRowsPerPageChange={onHandleChangeRowsPerPage}
                            showFirstButton
                            showLastButton
                        />
                    </Grid>
                    {footer && (
                        <Grid item xs={6} md overflow="auto" textAlign="end">
                            {footer}
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
}

export const PaginatedReactStaticTable = StaticTable;
