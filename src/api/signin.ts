import { ApiClient } from 'middleware/ApiClient';

export const signin = ApiClient({
    url: `/auth/password`
});
