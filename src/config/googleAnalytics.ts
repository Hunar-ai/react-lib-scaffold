import { SettingsUtils } from '../utils';
import { ExternalSciptUtil } from '../utils/ExternalScriptUtil';

(() => {
    const companyId = SettingsUtils.getCompanyId();
    const gaAppId = import.meta.env.VITE_GA_APP_ID;
    if (!gaAppId || SettingsUtils.ANALYTICS_BLACKLIST.includes(companyId)) {
        return;
    }
    ExternalSciptUtil.load({
        src: `https://www.googletagmanager.com/gtag/js?id=${gaAppId}`,
        id: 'google-analytics',
        type: ''
    });

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());

    window.gtag('config', gaAppId, {
        ['send_page_view']: false
    });
})();
