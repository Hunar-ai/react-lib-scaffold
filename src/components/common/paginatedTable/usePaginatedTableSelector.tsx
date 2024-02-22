import Checkbox from '@mui/material/Checkbox';
import { COLUMN_STICKY_TYPE } from 'Enum';

interface UsePaginatedTableSelectorProps {
    isChecked: (_: string) => boolean;
    onCheckboxClick: (_: string) => void;
}

export const usePaginatedTableSelector = ({
    isChecked,
    onCheckboxClick
}: UsePaginatedTableSelectorProps) => {
    return {
        id: 'id',
        sticky: COLUMN_STICKY_TYPE.LEFT,
        maxWidth: 50,
        Cell: ({ value }: { value: string }) => {
            return (
                <Checkbox
                    size="small"
                    checked={isChecked(value)}
                    onChange={() => {
                        onCheckboxClick(value);
                    }}
                />
            );
        },
        headerText: 'Select',
        Header: () => {
            return <Checkbox size="small" color="primary" disabled />;
        }
    };
};
