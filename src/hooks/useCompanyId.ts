import { useParams } from 'react-router-dom';

export const useCompanyId = (): string => {
    const { companyId } = useParams();
    if (import.meta.env.VITE_ENVIRONMENT === 'production') {
        const hostParts = window.location.hostname.split('.');
        return hostParts[0];
    } else if (companyId) {
        return companyId;
    }
    throw Error('No company Id');
};
