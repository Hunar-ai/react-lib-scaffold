export const FileUtils = {
    fetchBlobfromUrl: async (url: string) => {
        return await fetch(url).then(res => res.blob());
    },

    fetchArrayBufferFromUrl: async (url: string) => {
        return await fetch(url).then(res => res?.arrayBuffer?.());
    },
    openFileFromUrl: (url: string) => {
        window.open(url, '_blank');
    },
    getFileExtension: (url: string, fallback = '') => {
        try {
            return new URL(url).pathname.split('.').pop() ?? fallback;
        } catch {
            return fallback;
        }
    }
};
