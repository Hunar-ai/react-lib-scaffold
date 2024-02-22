import { company } from 'api/settings';
import { useGetReactQuery } from 'hooks';
import type { Company, ApiError, QueryResult } from 'interfaces';

interface Props {
    companyId: string;
    enabled?: boolean;
}

export const useGetCompany = ({
    companyId,
    enabled
}: Props): QueryResult<Company, ApiError> => {
    return useGetReactQuery({
        queryKey: ['getCompany'],
        requestUrl: company,
        onSuccess: (data: { data: Company }) => data,
        params: {
            companyId
        },
        enabled
    });
};
