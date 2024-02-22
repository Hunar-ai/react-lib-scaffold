import Link from '@mui/material/Link';

import { TextOverFlow } from './TextOverflow';

import { useBaseURL } from 'hooks';

import type { LeadDocumentProps } from 'interfaces';

interface LeadFullNameCellProps {
    value: string;
    row: { original: { workerId: string; documents: LeadDocumentProps[] } };
    onClick?: VoidFunction;
}

export const LeadFullNameCell = ({
    value,
    row,
    onClick
}: LeadFullNameCellProps) => {
    const baseUrl = useBaseURL();
    const {
        original: { workerId, documents }
    } = row;
    const url =
        documents.length > 0
            ? `${baseUrl}cvs/${documents[documents.length - 1].id}`
            : `${baseUrl}workers/${workerId}`;

    return (
        <Link href={url} underline="hover" target="_blank" onClick={onClick}>
            <TextOverFlow value={value} maxWidth={130} />
        </Link>
    );
};
