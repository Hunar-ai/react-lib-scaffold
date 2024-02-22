import React from 'react';

export const usePrevious = <TValue>(value: TValue) => {
    const ref = React.useRef<TValue>();

    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
