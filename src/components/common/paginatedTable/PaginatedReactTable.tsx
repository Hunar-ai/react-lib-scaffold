import React from 'react';
import { useTable, useBlockLayout, useFilters, HeaderGroup } from 'react-table';

import Grid from '@mui/material/Grid';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import { grey } from '@mui/material/colors';
import {
    PaginatedTableHeader,
    PaginatedTableSkeleton,
    TextOverFlow
} from 'components/common';
import { useSticky } from 'react-table-sticky';

import { ColumnActionsProps, type ReactElement } from 'interfaces';
import { useIsMobile, useGaHelper } from 'hooks';
import { useTheme } from '@mui/material';
import { COLUMN_STICKY_TYPE } from 'Enum';

export interface PaginationInfo {
    currentPage: number;
    numberOfPages: number;
    total: number;
    itemsPerPage: number;
    page?: number;
}

export interface Data {
    [key: string]: any;
}

export interface Column {
    id: string;
    accessor: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    Header: string | Function | ReactElement;
    // eslint-disable-next-line @typescript-eslint/ban-types
    Cell?: Function | ReactElement;
    isVisible?: boolean;
    headerText: string;
    sticky?: COLUMN_STICKY_TYPE;
    width?: string | number;
    defaultCanSort?: boolean;
    Filter?: any;
    columnActionsProps?: ColumnActionsProps;
    maxWidth?: number;
    minWidth?: number;
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

interface Props {
    id?: string;
    NoDataFound?: any;
    activeSortColumn?: string;
    activeFilterColumns?: string[];
    sort?: any;
    onSort?: any;
    data: Data[];
    title?: ReactElement | string | null;
    columns: any;
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
}

export const Table = ({
    id = 'table-container',
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
    tableHeight = 'calc(100vh - 176px)'
}: Props) => {
    const isMobile = useIsMobile();
    const theme = useTheme();
    const { getTablePaginationGAEvent, captureGaEvent } = useGaHelper();
    const { currentPage, itemsPerPage, total } = paginationInfo;
    const extra = isMobile ? useBlockLayout : useSticky;
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
        return Array.from(Array(rowsToGenerate).keys()).map((_, i) => (
            <TableRow key={i}>
                {columns.map((_: any, j: number) => (
                    <TableCell key={j} height="41.8" />
                ))}
            </TableRow>
        ));
    }, [columns, itemsPerPage, rows.length]);

    const hasActiveColumnAction = React.useCallback(
        (column: HeaderGroup<Data>) => {
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
                id={id}
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
                        padding: size === 'medium' ? '10.5px 16px' : '4px 16px',
                        fontSize: '0.85rem',
                        '.MuiTypography-root': {
                            fontSize: '0.85rem'
                        },
                        '.MuiButtonBase-root': {
                            padding: 0.8
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
                                                        height="100%"
                                                        alignItems="center"
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
                                                            top: 42,
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
                                                                    {isMobile ? (
                                                                        <Grid
                                                                            container
                                                                            alignItems="center"
                                                                            height="100%"
                                                                        >
                                                                            <Grid
                                                                                item
                                                                            >
                                                                                {cell.render(
                                                                                    'Cell'
                                                                                )}
                                                                            </Grid>
                                                                        </Grid>
                                                                    ) : (
                                                                        cell.render(
                                                                            'Cell'
                                                                        )
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
                            sx={{
                                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
                                    {
                                        fontSize: '0.85rem !important'
                                    },

                                '.MuiTablePagination-toolbar': {
                                    minHeight: 40
                                }
                            }}
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
};
