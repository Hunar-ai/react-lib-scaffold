import { ErrorTracker } from 'utils';

interface Props {
    error: {
        message: string;
    };
}

export const ErrorFallback = ({ error }: Props) => {
    ErrorTracker.captureException(error);
    return (
        <div>
            <p>Something went wrong 😭</p>

            {error.message && <span>{error.message}</span>}
        </div>
    );
};
