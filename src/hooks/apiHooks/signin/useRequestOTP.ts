import { useMutation } from '@tanstack/react-query';

import { requestOTP } from 'api/signin';
import { ApiError } from 'interfaces';

type Params = {
    body: {
        mobileNumber: string;
        userType: 'CANDIDATE';
    };
};

type SuccessResponse = {
    detail: string;
};

export const useRequestOTP = () => {
    return useMutation<SuccessResponse, ApiError, Params>(
        ({ body: { mobileNumber, userType } }: Params) => {
            return requestOTP
                .post({
                    body: {
                        mobileNumber,
                        userType
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
