interface LoadExternalScriptProps {
    src: string;
    id: string;
    type?: string;
    asyncScript?: boolean;
    onLoad?: () => void;
}

export const ExternalSciptUtil = {
    load: ({
        src,
        id,
        type = 'text/javascript',
        asyncScript,
        onLoad
    }: LoadExternalScriptProps) => {
        let script = document.getElementById(id) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            if (type) {
                script.type = type;
            }
            script.src = src;
            script.id = id;
            script.async = !!asyncScript;
            script.onload = () => {
                onLoad?.();
            };
            script.onerror = e => {
                const errorString = JSON.stringify(e);
                throw new Error(
                    `Unable to load external file: ${src} with error: ${errorString}`
                );
            };
            document.body.appendChild(script);
        }
    }
};
