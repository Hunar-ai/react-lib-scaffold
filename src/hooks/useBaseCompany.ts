import { useCompanyId } from './useCompanyId';

export const useBaseCompany = (): string => {
    const companyId = useCompanyId();
    if (
        import.meta.env.VITE_ENABLE_REJOX === 'true' &&
        (companyId === 'rejox' || companyId === 'rejox-supplier')
    ) {
        return 'Rejox';
    }
    return 'Hunar.ai';
};
