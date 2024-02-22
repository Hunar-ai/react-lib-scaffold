import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { AppTooltip } from 'components/common/AppTooltip';

interface PaginatedTableEditButtonProps {
    handleEdit: VoidFunction;
    disabled?: boolean;
}

export const PaginatedTableEditButton = ({
    handleEdit,
    disabled
}: PaginatedTableEditButtonProps) => {
    return (
        <AppTooltip title="Edit">
            <Button
                size="small"
                variant="outlined"
                onClick={handleEdit}
                color="primary"
                aria-label="Edit"
                component="span"
                disabled={disabled}
                startIcon={<EditIcon />}
            >
                Edit
            </Button>
        </AppTooltip>
    );
};
