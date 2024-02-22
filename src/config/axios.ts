import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DataUtils, ErrorTracker } from '../utils';

interface UpdatedAxiosRequestConfig extends AxiosRequestConfig {
    exclude?: string;
}

Axios.interceptors.request.use(
    (config: UpdatedAxiosRequestConfig) => {
        try {
            const authHeaders = localStorage.token
                ? { Authorization: `Token ${JSON.parse(localStorage.token)}` }
                : {};
            const updatedConfig = config as UpdatedAxiosRequestConfig;

            if (
                updatedConfig?.url?.indexOf('?exclude') &&
                updatedConfig?.url?.indexOf('?exclude') > -1
            ) {
                updatedConfig.url = updatedConfig?.url?.substring(
                    0,
                    updatedConfig?.url?.indexOf('?exclude')
                );
            }

            return {
                baseURL: import.meta.env.VITE_API_ENDPPOINT,
                ...updatedConfig,
                headers: {
                    ...authHeaders,
                    ...updatedConfig.headers
                },
                data:
                    updatedConfig.headers?.['Content-Type'] ===
                    'multipart/form-data'
                        ? config.data
                        : DataUtils.snakize(
                              updatedConfig.data,
                              updatedConfig?.exclude
                          )
            };
        } catch (error: any) {
            throw new AxiosError(error.message, undefined, config);
        }
    },
    error => {
        ErrorTracker.captureException(error);
        return Promise.reject(DataUtils.camelize(error));
    }
);

Axios.interceptors.response.use(
    (response: AxiosResponse) => {
        const updatedConfig = response.config as UpdatedAxiosRequestConfig;
        return DataUtils.camelize(response.data, updatedConfig?.exclude);
    },
    error => {
        if (error.response === undefined) {
            let localStorageData;
            try {
                localStorageData = window.localStorage;
            } catch {
                localStorageData = undefined;
            }
            ErrorTracker.captureException(error, {
                localStorage: localStorageData
                    ? JSON.stringify(localStorageData)
                    : 'Access Denied'
            });
            return Promise.reject(
                DataUtils.camelize({
                    errors: error.config
                        ? {
                              api: error.config.baseURL + error.config.url,
                              displayError: error.message
                          }
                        : { displayError: error.message }
                })
            );
        }
        ErrorTracker.captureException(error);
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
        }
        if (error.response.data && error.response.data.errors) {
            return Promise.reject(DataUtils.camelize(error.response.data));
        } else {
            return Promise.reject(
                DataUtils.camelize({
                    errors: {
                        api: error.config.baseURL + error.config.url,
                        displayError: error.message
                    }
                })
            );
        }
    }
);
