import Logo from 'components/common/Logo.png';
import LogoMedium from 'components/common/LogoMedium.png';
import RejoxLogo from 'components/common/Rejox-Logo.png';

import { useCompanyId } from './useCompanyId';
import { FIELD_SIZE } from 'Enum';

export const useBaseLogo = (size = FIELD_SIZE.small): string => {
    const companyId = useCompanyId();
    if (
        import.meta.env.VITE_ENABLE_REJOX === 'true' &&
        (companyId === 'rejox' || companyId === 'rejox-supplier')
    ) {
        return RejoxLogo;
    }
    return size === FIELD_SIZE.medium ? LogoMedium : Logo;
};
