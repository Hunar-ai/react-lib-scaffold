/* https://developers.google.com/tag-platform/gtagjs/reference */

import type { GA_EVENT_NAME } from 'interfaces';

// type ParamProps = Gtag.ConfigParams | Gtag.EventParams | Gtag.CustomParams;
type ParamProps = any;

const gaAppId = import.meta.env.VITE_GA_APP_ID;

export const GaUtils = {
    captureGaEvent(
        name: GA_EVENT_NAME,
        parameters: ParamProps | undefined = {}
    ) {
        if (!gaAppId || !parameters) return;

        window.gtag?.('event', name, { ...parameters, customEvent: name });
    },
    captureGaPageView(
        pageTitle: string,
        pageLocation: string,
        parameters: ParamProps | undefined = {}
    ) {
        if (!gaAppId || !parameters) return;

        window.gtag?.('event', 'page_view', {
            ['page_title']: pageTitle,
            ['page_location']: pageLocation,
            ...parameters
        });
    },
    captureGaScroll(
        pageTitle: string,
        scrollArea: string,
        parameters: ParamProps | undefined = {}
    ) {
        if (!gaAppId || !parameters) return;

        window.gtag?.('event', 'scroll', {
            ['page_title']: pageTitle,
            ['scroll_area']: scrollArea,
            ...parameters
        });
    }
};
