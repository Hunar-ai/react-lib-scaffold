import { StringUtils } from 'utils/StringUtils';
import { DataUtils, ErrorTracker } from 'utils';
import _ from 'lodash';

const BASE_URL = import.meta.env.VITE_API_ENDPPOINT;

interface Body {
    [key: string]: any;
}

interface Params {
    [key: string]: string;
}

type Auth = {
    Authorization?: string;
};

const request = <T>(
    endpoint: string,
    method: 'POST' | 'PUT' | 'GET' | 'PATCH',
    body: Body,
    formType?: string
): Promise<T> => {
    try {
        let requestSettings = {};
        if (formType === 'multipart') {
            const formData = new FormData();
            for (const name in body) {
                formData.append(_.snakeCase(name), body[name]);
            }
            requestSettings = {
                headers: {
                    ...getHeaders()
                },
                method: 'POST',
                body: formData
            };
        } else {
            requestSettings = {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...getHeaders()
                }
            };
            if (method !== 'GET') {
                let formattedBody = DataUtils.snakize(body);
                if (
                    formattedBody.sort &&
                    !!Object.keys(formattedBody.sort).length
                ) {
                    formattedBody = {
                        ...formattedBody,
                        sort: {
                            ...formattedBody.sort,
                            key: DataUtils.toSnakeWrapper(
                                formattedBody.sort.key
                            )
                        }
                    };
                }
                requestSettings = {
                    ...requestSettings,
                    body: JSON.stringify(formattedBody)
                };
            }
        }

        return fetch(endpoint, requestSettings)
            .then(response => {
                if (!response.ok) {
                    catchError(response);
                } else {
                    return response.json().then(jsonResponse => {
                        return DataUtils.camelize(jsonResponse);
                    });
                }
                ErrorTracker.captureException(response);
                return Promise.reject(response);
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                const contentType = error.headers.get('Content-Type');
                if (contentType.indexOf('application/json') === -1) {
                    ErrorTracker.captureException(error);
                    return Promise.reject(error);
                }
                try {
                    return error.json().then(
                        (json: {
                            errors: {
                                display_error?: string;
                            };
                        }) => {
                            if (json.errors.display_error) {
                                ErrorTracker.captureException(error);
                                return Promise.reject(
                                    json.errors.display_error
                                );
                            }
                            ErrorTracker.captureException(error);
                            ErrorTracker.captureException(json.errors);
                            return Promise.reject('Server error');
                        }
                    );
                } catch (err) {
                    ErrorTracker.captureException(error);
                    return Promise.reject('Server error');
                }
            });
    } catch (error: unknown) {
        ErrorTracker.captureException(error);
        return Promise.reject('Server error');
    }
};

const catchError = (error: Response) => {
    if (error.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
    } else {
        ErrorTracker.captureException(error);
        return Promise.reject(error);
    }
};

interface ApiModelResponse {
    post: any;
    put: any;
    get: any;
    postFormData: any;
    patch: any;
}

export const ApiModel = ({
    endpoint
}: {
    endpoint: string;
}): ApiModelResponse => {
    const requestUrl = `${BASE_URL}${endpoint}`;
    return {
        post: <T>({
            body,
            params
        }: {
            body: Body;
            params: Params;
        }): Promise<T> => {
            return request(getUrl(requestUrl, params), 'POST', body);
        },
        put: <T>({
            body,
            params
        }: {
            body: Body;
            params: Params;
        }): Promise<T> => {
            return request(getUrl(requestUrl, params), 'PUT', body);
        },
        get: <T>({
            body,
            params
        }: {
            body: Body;
            params: Params;
        }): Promise<T> => {
            return request(
                getUrlWithQueryParameters(getUrl(requestUrl, params)),
                'GET',
                body
            );
        },
        postFormData: <T>({
            body,
            params
        }: {
            body: Body;
            params: Params;
        }): Promise<T> => {
            return request(
                getUrl(requestUrl, params),
                'POST',
                body,
                'multipart'
            );
        },
        patch: <T>({
            body,
            params
        }: {
            body: Body;
            params: any;
        }): Promise<T> => {
            return request(getUrl(requestUrl, params), 'PATCH', body);
        }
    };
};

const getUrlWithQueryParameters = (endpoint: string) => {
    const [url, queryParams] = endpoint.split('?');
    if (queryParams) {
        const queryParamsObject = Object.fromEntries(
            new URLSearchParams(queryParams)
        );
        const convertCase = _.mapKeys(
            queryParamsObject,
            (__: unknown, key: string) => _.snakeCase(key)
        );
        const searchParams = new URLSearchParams(
            DataUtils.snakize(convertCase)
        );
        if (searchParams) {
            return `${endpoint.split('?')[0]}?${searchParams}`;
        }
    }
    return url;
};

const getHeaders = (): Auth => {
    if (localStorage.token) {
        return {
            Authorization: `Token ${JSON.parse(localStorage.token)}`
        };
    }
    return {};
};

const getUrlKeys = function (url: string) {
    const re = new RegExp('{[A-Za-z0-9_]*}', 'g');
    const keys = url.match(re);
    return keys;
};

const santizeUrl = function (
    url: string,
    params = {},
    id: string,
    urlKeys: string[] | null
) {
    const queryParams = getQueryParamsFromParams(params, urlKeys);
    return constructUrlFromQueryParams(
        santizeEndpoint(url, params, id, urlKeys),
        queryParams
    );
};

const getUrl = function (url: string, params: Params) {
    return santizeUrl(url, params, ' 1', getUrlKeys(url));
};

const santizeEndpoint = function (
    url: string,
    params: Body,
    id: string,
    urlKeys: string[] | null
) {
    let value;
    const urlWithoutQueryParams = urlKeys
        ? urlKeys.reduce((previousValue: any, key: string) => {
              const keyWithoutParenthesis =
                  StringUtils.trimFirstAndLastCharacter(key);
              value = params[keyWithoutParenthesis];
              if (!DataUtils.isEmpty(value)) {
                  return previousValue.replace(key, value);
                  // if value exists in 'params', replce the {key} with actual value
              } else {
                  if (keyWithoutParenthesis === id) {
                      return previousValue.replace(`/${key}`, '');
                      // if key is one of idAttrs, & doesn't exist in params, remove
                      // ideally, either idAttrs, or params will have all keys
                  }
                  throw new Error(`Missing Params: ${keyWithoutParenthesis}`);
              }
          }, url)
        : url;
    return urlWithoutQueryParams;
};

const getQueryParamsFromParams = function (
    params: Params,
    urlKeys: string[] | null
) {
    return urlKeys
        ? urlKeys.reduce((previousValue, urlKey) => {
              // omit urlKeys if present in params
              return _.omit(
                  previousValue,
                  StringUtils.trimFirstAndLastCharacter(urlKey)
              );
          }, params)
        : {};
};

const constructUrlFromQueryParams = function (
    url: string,
    queryParams: Params
) {
    return Object.keys(queryParams).reduce((previousUrl, key, index) => {
        const encodedQueryParam = encodeURIComponent(queryParams[key]);
        if (index === 0) {
            return `${previousUrl}?${key}=${encodedQueryParam}`;
        } else {
            return `${previousUrl}&${key}=${encodedQueryParam}`;
        }
    }, url);
};
