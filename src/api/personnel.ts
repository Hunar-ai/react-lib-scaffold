import { ApiClient } from 'middleware';

export const create = ApiClient({
    url: `/v1/company/{companyId}/personnel/{personnelId}`
});

export const personnel = ApiClient({
    url: `/v1/company/{companyId}/personnel/{personnelId}`
});

export const loggedInPersonnel = ApiClient({
    url: `/v1/me`
});
