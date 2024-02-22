import { companyDetails } from 'api/settings';
import { useGetReactQuery } from 'hooks';
import { ApiError, Company, QueryResult } from 'interfaces';

interface Props {
    params: {
        companyId: string;
    };
    enabled?: boolean;
}

export const useGetCompanyDetails = ({
    params: { companyId },
    enabled
}: Props): QueryResult<Company, ApiError> => {
    return useGetReactQuery({
        queryKey: ['getCompany'],
        requestUrl: companyDetails,
        onSuccess: (data: { data: Company }) => data,
        params: {
            companyId
        },
        enabled
    });
};
