import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import { AppTooltip } from 'components/common/AppTooltip';
import { AppLoader } from 'components/common/AppLoader';
import { useGaHelper } from 'hooks';

interface ExportButtonProps {
    disabled: boolean;
    isLoading: boolean;
    onClick: VoidFunction;
}

export const ExportButton = ({
    disabled,
    isLoading,
    onClick
}: ExportButtonProps) => {
    const { captureGaEvent, exportGaEvent } = useGaHelper();

    const handleOnClick = () => {
        onClick();
        captureGaEvent(exportGaEvent);
    };

    return (
        <>
            {isLoading && <AppLoader />}
            <AppTooltip title="Export">
                <LoadingButton
                    size="small"
                    variant="outlined"
                    color="primary"
                    aria-label="Export"
                    component="span"
                    disabled={disabled}
                    loading={isLoading}
                    loadingPosition="start"
                    onClick={handleOnClick}
                    startIcon={<SystemUpdateAltIcon />}
                >
                    Export
                </LoadingButton>
            </AppTooltip>
        </>
    );
};
