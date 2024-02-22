import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface PaginatedTableSkeletonProps {
    rowCount: number;
    columnCount: number;
}

export const PaginatedTableSkeleton = ({
    rowCount,
    columnCount
}: PaginatedTableSkeletonProps) => {
    return (
        <>
            {Array.from(Array(rowCount).keys()).map((_, i) => (
                <TableRow key={`row_${i}`}>
                    {Array.from(Array(columnCount).keys()).map((_, j) => (
                        <TableCell key={`column_${j}`} height="41.8">
                            <Skeleton />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};
