import * as React from 'react';

import Button from '@mui/material/Button';
import { useGaHelper } from 'hooks';

interface PaginatedTableSelectAllButtonProps {
    onSelectAllClick: VoidFunction;
    onDeSelectAllClick: VoidFunction;
    isAllSelected: boolean;
    selectedRecordsCount: number;
    totalRecordsCount: number;
    excludedIdsCount?: number;
}

export const PaginatedTableSelectAllButton = ({
    onSelectAllClick,
    onDeSelectAllClick,
    isAllSelected,
    selectedRecordsCount,
    totalRecordsCount,
    excludedIdsCount = 0
}: PaginatedTableSelectAllButtonProps) => {
    const { captureGaEvent, selectAllGaEvent, deSelectAllGaEvent } =
        useGaHelper();

    const [selectAllCTAText, setSelectAllCTAText] =
        React.useState('Select All');

    React.useEffect(() => {
        setSelectAllCTAText(isAllSelected ? 'Deselect All' : 'Select All');
    }, [isAllSelected, excludedIdsCount]);

    const handleToggleSelectAll = () => {
        if (isAllSelected) {
            captureGaEvent(deSelectAllGaEvent);
            onDeSelectAllClick();
        } else {
            captureGaEvent(selectAllGaEvent);
            onSelectAllClick();
        }
    };
    return (
        <>
            {(selectedRecordsCount > 0 || isAllSelected) &&
                totalRecordsCount != 1 && (
                    <Button
                        variant="text"
                        fullWidth
                        onClick={handleToggleSelectAll}
                        sx={{ width: 96 }}
                    >
                        {selectAllCTAText}
                    </Button>
                )}
        </>
    );
};
