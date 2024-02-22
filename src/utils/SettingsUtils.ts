export const SettingsUtils = {
    getCompanyId: () => {
        let company;
        if (import.meta.env.VITE_ENVIRONMENT === 'production') {
            const hostParts = window.location.hostname.split('.');
            company = hostParts[0];
        } else {
            company = window.location.pathname.split('/')[2];
        }
        return company;
    },
    ANALYTICS_BLACKLIST:
        import.meta.env.VITE_ANALYTICS_BLACKLIST?.split(',') ?? []
};
