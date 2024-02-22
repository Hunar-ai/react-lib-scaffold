import React from 'react';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';

import { AppTooltip } from './AppTooltip';
import { useGaHelper } from 'hooks';

interface ColumnModifierButtonProps {
    showColumnModifier: boolean;
    handleOpenColumnModifier: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ColumnModifierButton = ({
    showColumnModifier,
    handleOpenColumnModifier
}: ColumnModifierButtonProps) => {
    const { captureGaEvent, getColumnModifierGAEvent } = useGaHelper();

    const { openEvent } = React.useMemo(
        () => getColumnModifierGAEvent(),
        [getColumnModifierGAEvent]
    );

    const onOpenColumnModifier = (event: React.MouseEvent<HTMLElement>) => {
        captureGaEvent(openEvent);
        handleOpenColumnModifier(event);
    };

    return (
        <AppTooltip title="Customize columns">
            <Button
                aria-describedby="column-modifier"
                size="small"
                onClick={onOpenColumnModifier}
                variant={showColumnModifier ? 'contained' : 'outlined'}
                color="primary"
                aria-label="Customize columns"
                component="span"
                startIcon={<TuneIcon />}
            >
                Customize
            </Button>
        </AppTooltip>
    );
};
