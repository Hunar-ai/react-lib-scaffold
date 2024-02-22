import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { AppTooltip } from '../AppTooltip';

interface DownloadButtonProps {
    title?: string;
    disabled: boolean;
    onClick: VoidFunction;
}

export const DownloadButton = ({
    disabled,
    onClick,
    title = 'Download'
}: DownloadButtonProps) => {
    return (
        <AppTooltip title={title}>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                aria-label="Download"
                component="span"
                disabled={disabled}
                onClick={onClick}
                startIcon={<DownloadIcon />}
            >
                {title}
            </Button>
        </AppTooltip>
    );
};
