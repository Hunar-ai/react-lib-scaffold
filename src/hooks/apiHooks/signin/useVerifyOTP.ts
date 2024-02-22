import { useMutation } from '@tanstack/react-query';

import { verifyOTP } from 'api/signin';
import { ApiError } from 'interfaces';

type Params = {
    body: {
        mobileNumber: string;
        otpToken: string;
        userType: 'CANDIDATE';
    };
};

interface SuccessResponse {
    token: string;
}

export const useVerifyOTP = () => {
    return useMutation<SuccessResponse, ApiError, Params>(
        ({ body: { mobileNumber, otpToken, userType } }: Params) => {
            return verifyOTP
                .post({
                    body: {
                        mobileNumber,
                        otpToken,
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
