/* eslint-disable max-len */
import IconButton from '@mui/material/IconButton';
import { Theme, useTheme } from '@mui/material/styles';

interface Sortcon {
    onClick: VoidFunction;
    active: boolean;
}

const SortDesc = (props: { color: string }) => {
    return (
        <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="sortDownIconTitle"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            color={props.color}
            stroke={props.color}
        >
            {' '}
            <title id="sortDownIconTitle">Sort in descending order</title>{' '}
            <path d="M11 9H17" /> <path d="M11 5H19" /> <path d="M11 13H15" />{' '}
            <path d="M10 17L7 20L4 17" /> <path d="M7 5V19" />{' '}
        </svg>
    );
};
export const SortDescIcon = ({ onClick, active }: Sortcon) => {
    const theme: Theme = useTheme();
    return (
        <IconButton onClick={onClick} size="small">
            <SortDesc
                color={
                    active
                        ? theme.palette.primary.main
                        : theme.palette.grey['800']
                }
            />
        </IconButton>
    );
};
