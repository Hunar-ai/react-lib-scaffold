import React from 'react';

import { useWidth } from 'hooks';

export const useIsDesktop = (): boolean => {
    const screenWidth = useWidth();
    const isDesktop = React.useMemo(
        () => screenWidth === 'lg' || screenWidth === 'xl',
        [screenWidth]
    );
    return isDesktop;
};
