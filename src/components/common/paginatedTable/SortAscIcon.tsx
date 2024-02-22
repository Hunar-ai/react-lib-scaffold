import { Theme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

interface Sortcon {
    onClick: VoidFunction;
    active: boolean;
}

const SortAsc = (props: { color: string }) => {
    return (
        <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="sortUpIconTitle"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            color={props.color}
            stroke={props.color}
        >
            {' '}
            <title id="sortUpIconTitle">Sort in ascending order</title>{' '}
            <path d="M11 16H17" /> <path d="M11 20H19" /> <path d="M11 12H15" />{' '}
            <path d="M4 8L7 5L10 8" /> <path d="M7 20L7 6" />{' '}
        </svg>
    );
};

export const SortAscIcon = ({ onClick, active }: Sortcon) => {
    const theme: Theme = useTheme();
    return (
        <IconButton onClick={onClick} size="small">
            <SortAsc
                color={
                    active
                        ? theme.palette.primary.main
                        : theme.palette.grey['800']
                }
            />
        </IconButton>
    );
};
