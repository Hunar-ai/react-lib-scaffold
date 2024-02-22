import React from 'react';
import { createSearchParams, Navigate, useLocation } from 'react-router-dom';

import { useToken } from 'hooks';
import { sessionStorage } from 'utils';
import { SettingsContext } from 'contexts';
import { PERSONNEL_ROLE, PERSONNEL_TYPE } from 'Enum';

interface ProtectedProps {
    children: React.ReactNode;
}

const unauthorizedRedirectionPathMap = {
    ['/vendor/']: 'vendor/'
};

const interviewerAuthorizedPaths = [
    '/interview-profiles',
    '/cvs/',
    '/workers/'
];

export const ProtectedRoute = ({ children }: ProtectedProps) => {
    const { loggedInPersonnel } = React.useContext(SettingsContext);

    const location = useLocation();
    const { token } = useToken();
    const { getItem } = sessionStorage();

    const isAuthorized = React.useMemo(() => {
        if (
            getItem('vendorToken') &&
            loggedInPersonnel?.role === PERSONNEL_ROLE.VENDOR
        ) {
            return location.pathname.indexOf('/vendor/') > -1;
        }

        if (token) {
            if (
                loggedInPersonnel?.type === PERSONNEL_TYPE.COMPANY_PERSONNEL &&
                loggedInPersonnel.role === PERSONNEL_ROLE.INTERVIEWER
            ) {
                return interviewerAuthorizedPaths.some(
                    path => location.pathname.indexOf(path) > -1
                );
            }

            if (
                loggedInPersonnel?.type !== PERSONNEL_TYPE.HUNAR_PERSONNEL &&
                location.pathname.indexOf('/setup/interviewers') > -1
            ) {
                return false;
            }

            return true;
        }
        return false;
    }, [
        getItem,
        location.pathname,
        loggedInPersonnel?.role,
        loggedInPersonnel?.type,
        token
    ]);

    const isAuthenticated = token || getItem('vendorToken');

    const unauthorizedRedirectionPath = React.useMemo(() => {
        const matchedPath = Object.keys(unauthorizedRedirectionPathMap).find(
            path => location.pathname.indexOf(path) > -1
        ) as keyof typeof unauthorizedRedirectionPathMap | undefined;

        if (matchedPath) {
            return `${unauthorizedRedirectionPathMap[matchedPath]}${
                location.pathname.split('/').slice(-2)[0]
            }/signin`;
        }

        return 'signin';
    }, [location.pathname]);

    if (!isAuthorized || !isAuthenticated)
        return (
            <Navigate
                to={{
                    pathname: unauthorizedRedirectionPath,
                    search: createSearchParams({
                        next: `${location.pathname}${location.search}`
                    }).toString()
                }}
                replace
            />
        );
    return <>{children}</>;
};
