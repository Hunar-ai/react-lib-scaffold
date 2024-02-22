import React from 'react';

import { useLocalStorage } from 'hooks';
import { type Column } from 'components/common';

interface DisplayColumnMetadata {
    id: string;
    isVisible?: boolean;
}
export const useGlobalActions = (columns: Column[], tableId: string) => {
    const { setItem, getItem } = useLocalStorage();

    const [displayColumnsMetadata, setDisplayColumnsMetadata] = React.useState<
        DisplayColumnMetadata[]
    >(
        getItem(`${tableId}.columnPrefernces`) ||
            columns.map((column: Column) => {
                const displayColumnMetadata = {
                    headerText: column.id,
                    isVisible: column.isVisible
                };
                return displayColumnMetadata;
            })
    );

    const handleColumnModifierChange = React.useCallback(
        (modifiedDisplayColumns: Column[]) => {
            const modifiedDisplayColumnsMetadata = modifiedDisplayColumns.map(
                (column: Column) => {
                    const displayColumnMetadata = {
                        id: column.id,
                        isVisible: column.isVisible
                    };
                    return displayColumnMetadata;
                }
            );

            setDisplayColumnsMetadata(modifiedDisplayColumnsMetadata);
            setItem(
                `${tableId}.columnPrefernces`,
                modifiedDisplayColumnsMetadata
            );
        },
        [tableId, setItem]
    );

    const displayColumns = React.useMemo(() => {
        const mappedDisplayColumns = columns.map((column: Column) => {
            const displayColumnMetadata = displayColumnsMetadata.find(
                (datum: DisplayColumnMetadata) => {
                    return column.id === datum.id;
                }
            );
            return { ...column, ...displayColumnMetadata };
        });
        return mappedDisplayColumns;
    }, [columns, displayColumnsMetadata]);

    const tableDisplayColumns = React.useMemo(() => {
        return displayColumns.filter(
            (column: Column) =>
                column.isVisible === undefined || column.isVisible === true
        );
    }, [displayColumns]);

    return {
        displayColumns,
        tableDisplayColumns,
        displayColumnsMetadata,
        handleColumnModifierChange
    };
};
