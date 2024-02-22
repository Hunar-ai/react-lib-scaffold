import { useMutation } from '@tanstack/react-query';

import { vendorLogin } from 'api/signin';
import { ApiError } from 'interfaces';

type Params = {
    email: string;
    password: string;
    companyId: string;
    vendorId: string;
};

interface SuccessResponse {
    token: string;
}

export const useVendorSignin = () => {
    return useMutation<SuccessResponse, ApiError, Params>(
        ({
            email,
            password,
            companyId,
            vendorId
        }: Params): Promise<SuccessResponse> => {
            return vendorLogin
                .post({
                    params: {
                        companyId,
                        vendorId
                    },
                    body: {
                        vendorEmail: email,
                        vendorPassword: password
                    }
                })
                .then((response: SuccessResponse) => {
                    return response;
                })
                .catch((error: ApiError): ApiError => {
                    throw error;
                });
        }
    );
};
