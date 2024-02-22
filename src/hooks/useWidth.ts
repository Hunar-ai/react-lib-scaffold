import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint, Theme, useTheme } from '@mui/material/styles';

type BreakpointOrNull = Breakpoint | null;
export const useWidth = (): string => {
    const theme: Theme = useTheme();
    const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
};
