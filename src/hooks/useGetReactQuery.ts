import { useQuery } from '@tanstack/react-query';
import { useToast } from 'hooks';
import type { ApiError, FormFields, Company } from 'interfaces';
import ErrorTracker from 'utils/ErrorTracker';
import { DataUtils } from 'utils';

type SuccessData = FormFields | Company | any;

interface GetReactQueryProps {
    queryKey: any;
    requestUrl: any;
    params?: { [key: string]: string | null | undefined };
    enabled?: boolean;
    onSuccess?: (data: SuccessData) => void;
    onError?: (error: ApiError) => void;
    refetchInterval?: number;
    exclude?: string;
}
export const useGetReactQuery = ({
    queryKey,
    requestUrl,
    params,
    enabled = true,
    refetchInterval = undefined,
    exclude = '',
    onSuccess,
    onError
}: GetReactQueryProps) => {
    const { showError } = useToast();

    return useQuery<SuccessData, ApiError>({
        queryKey,
        queryFn: () => {
            return requestUrl
                .get({
                    params: {
                        ...DataUtils.getFormattedParams(params || {}),
                        exclude
                    }
                })
                .then((response: Response) => {
                    return response;
                });
        },
        refetchOnWindowFocus: false,
        enabled,
        onSuccess,
        onError: (response: ApiError) => {
            showError({
                message:
                    response.errors?.displayError ??
                    'Something Went Wrong ( Unhandled Error )'
            });
            onError?.(response);
            ErrorTracker.captureException(response);
        },
        refetchInterval
    });
};
