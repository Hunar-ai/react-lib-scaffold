export const useApplyMeLink = (): string => {
    if (import.meta.env.VITE_ENVIRONMENT === 'production') {
        return 'https://apply.hunar.ai';
    } else if (import.meta.env.VITE_ENVIRONMENT === 'local') {
        return `http://localhost:3001`;
    }
    return `https://dev--dainty-trifle-8162d3.netlify.app`;
};
