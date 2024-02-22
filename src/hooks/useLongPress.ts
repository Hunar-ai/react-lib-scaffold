import React from 'react';

interface Props {
    callback: VoidFunction;
    milliSeconds: number;
    isMobile: boolean;
}

export const useLongPress = ({
    callback,
    milliSeconds = 300,
    isMobile
}: Props) => {
    const [startLongPress, setStartLongPress] = React.useState(false);

    React.useEffect(() => {
        let timerId = 0;
        if (startLongPress) {
            timerId = window.setTimeout(callback, milliSeconds);
        } else {
            clearTimeout(timerId);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [callback, milliSeconds, startLongPress]);

    if (!isMobile) return;
    return {
        onMouseDown: () => setStartLongPress(true),
        onMouseUp: () => setStartLongPress(false),
        onMouseLeave: () => setStartLongPress(false),
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false)
    };
};
