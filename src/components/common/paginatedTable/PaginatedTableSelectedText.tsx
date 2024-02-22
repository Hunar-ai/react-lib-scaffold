import { Typography } from '@mui/material';

import { ReactElement } from 'interfaces';

interface PaginatedTableSelectedTextProps {
    isSelectAllEnabled?: boolean;
    isAllSelected?: boolean;
    selectedRecordsCount?: number;
    totalRecordsCount?: number;
    excludedIdsCount?: number;
}

export const PaginatedTableSelectedText = ({
    isSelectAllEnabled = false,
    isAllSelected = false,
    selectedRecordsCount = 0,
    totalRecordsCount = 0,
    excludedIdsCount = 0
}: PaginatedTableSelectedTextProps): ReactElement => {
    const getSelectedCountText = () => {
        if (isSelectAllEnabled) {
            if (!isAllSelected && selectedRecordsCount > 0) {
                return `${selectedRecordsCount} Selected`;
            } else if (isAllSelected) {
                return `${totalRecordsCount - excludedIdsCount} Selected`;
            }
        } else if (selectedRecordsCount > 0) {
            return `${selectedRecordsCount} Selected`;
        }
    };

    return (
        <>
            <Typography variant="body2">{getSelectedCountText()}</Typography>
        </>
    );
};
