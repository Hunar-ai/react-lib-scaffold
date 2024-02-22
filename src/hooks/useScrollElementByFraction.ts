import React from 'react';

export const useScrollElementByFraction = (element: HTMLElement | null) => {
    const scrollElementByFraction = React.useCallback(
        (pageFraction: number) => {
            element?.scrollTo({
                top: element.scrollHeight * pageFraction,
                behavior: 'smooth'
            });
        },
        [element]
    );

    return scrollElementByFraction;
};
