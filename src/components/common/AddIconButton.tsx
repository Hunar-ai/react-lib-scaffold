import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AppTooltip } from './AppTooltip';

interface AddButtonProps {
    onClick: React.MouseEventHandler<HTMLSpanElement>;
    title?: string;
    disabled?: boolean;
}
export const AddIconButton = ({ onClick, title, disabled }: AddButtonProps) => {
    return (
        <AppTooltip title={title ?? 'New'}>
            <Button
                variant="outlined"
                size="small"
                aria-label={title}
                component="span"
                onClick={onClick}
                disabled={disabled}
                sx={{ minWidth: 0, padding: '5px' }}
            >
                <AddIcon />
            </Button>
        </AppTooltip>
    );
};
