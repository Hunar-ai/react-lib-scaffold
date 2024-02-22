import React, { RefObject } from 'react';

interface Props {
    eleRef: RefObject<HTMLDivElement | null>;
    latency: number;
    onSingleClick: (e: MouseEventInit) => void;
    onDoubleClick: (e: MouseEventInit) => void;
}

export const useDoubleClick = ({
    latency = 300,
    onSingleClick = () => null,
    onDoubleClick = () => null,
    eleRef
}: Props) => {
    React.useEffect(() => {
        const clickRef = eleRef?.current;

        let clickCount = 0;
        const handleClick: EventListener = (ev: MouseEventInit) => {
            clickCount += 1;
            const event = ev as MouseEvent;
            setTimeout(() => {
                if (clickCount === 1) onSingleClick(event);
                else if (clickCount === 2) onDoubleClick(event);

                clickCount = 0;
            }, latency);
        };

        clickRef?.addEventListener('click', handleClick);

        return () => {
            clickRef?.removeEventListener('click', handleClick);
        };
    });
};

export default useDoubleClick;
