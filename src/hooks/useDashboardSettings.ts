import React from 'react';
import { SettingsContext } from 'contexts';
import { PERSONNEL_TYPE } from 'Enum';

export const useDashboardSettings = () => {
    const { loggedInPersonnel, company } = React.useContext(SettingsContext);
    const {
        settings: { dashboardSettings }
    } = company;

    if (loggedInPersonnel?.type === PERSONNEL_TYPE.HUNAR_PERSONNEL) {
        return {
            disableAadhaarOtpVerification: false,
            disableFormTemplateCreation: false,
            disableWorkspaceCreation: false,
            disableVerification: false
        };
    }
    const {
        disableAadhaarOtpVerification = false,
        disableFormTemplateCreation = false,
        disableWorkspaceCreation = false
    } = dashboardSettings?.onboarding || {};

    const { disableVerification } = dashboardSettings?.vendor || {};

    return {
        disableAadhaarOtpVerification,
        disableFormTemplateCreation,
        disableWorkspaceCreation,
        disableVerification
    };
};
