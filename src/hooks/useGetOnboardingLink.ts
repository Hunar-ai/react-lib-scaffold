import { SOURCE_TRACKING_UTM } from 'Enum';
import { useApplyMeLink } from './useApplyMeLink';

import { useCompanyId } from './useCompanyId';

interface GetOnboardingLinkProps {
    referralCode?: string;
    userJobQueryShortcode?: string;
    utm?: SOURCE_TRACKING_UTM;
}

export const useGetOnboardingLink = ({
    userJobQueryShortcode,
    utm,
    referralCode
}: GetOnboardingLinkProps): string => {
    const applyMeLink = useApplyMeLink();
    const companyId = useCompanyId();

    let onboardingLink = `${applyMeLink}/company/${companyId}`;
    if (userJobQueryShortcode) {
        onboardingLink = `${applyMeLink}/job/${userJobQueryShortcode}?utm=${utm}`;
    } else if (referralCode) {
        onboardingLink = `${applyMeLink}/referral/${companyId}`;
    }
    return onboardingLink;
};
