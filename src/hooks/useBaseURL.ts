import { useParams } from 'react-router-dom';

export const useBaseURL = (): string => {
    const { companyId } = useParams();
    if (import.meta.env.VITE_ENVIRONMENT === 'production') {
        return '/';
    } else if (companyId) {
        return `/company/${companyId}/`;
    }
    throw Error('No company Id');
};
