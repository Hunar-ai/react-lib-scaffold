import { useMutation } from '@tanstack/react-query';
import React from 'react';

export const usePostReactQueryMutation = (mutation: any, options: any) => {
    const mutationFn = React.useCallback(() => {
        const { requestUrl, params, body } = mutation();
        return requestUrl
            .post({
                params,
                body
            })
            .then((response: Response) => {
                return response;
            });
    }, [mutation]);

    return useMutation(mutationFn, options);
};
