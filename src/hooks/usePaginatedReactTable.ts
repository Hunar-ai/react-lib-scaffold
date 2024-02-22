import React from 'react';

import { Column } from 'components/common';
import { useGlobalActions } from './useGlobalActions';
import { useMinimalPaginationInfo } from './useMinimalPaginationInfo';

interface PaginatedReactTableProps {
    tableId: string;
    defaultSort?: { id: string; desc: boolean };
    columns: Column[];
    searchKey: string;
}

export const usePaginatedReactTable = ({
    tableId,
    columns,
    searchKey
}: PaginatedReactTableProps) => {
    const { displayColumns, tableDisplayColumns, handleColumnModifierChange } =
        useGlobalActions(columns, tableId);

    const {
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        paginationInfoInitialState,
        setMinimalPaginationInfo
    } = useMinimalPaginationInfo();

    React.useEffect(() => {
        handleChangePage(undefined, 0);
    }, [searchKey]);

    return {
        displayColumns,
        tableDisplayColumns,
        handleColumnModifierChange,
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        paginationInfoInitialState,
        setMinimalPaginationInfo
    };
};
