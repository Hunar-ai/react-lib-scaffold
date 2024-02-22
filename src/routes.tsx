import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
    AppContainer,
    LeadOnboardingFormContainer,
    NotFound,
    DeviceError,
    CandidateOnboardOpenFormContainer,
    JQCheckInterestContainer,
    LeadOpenProfileContainer,
    SigninContainer,
    ExternalSigninContainer,
    AccessDenied
} from 'containers';

const RoutesContainer = () => {
    const isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';
    return (
        <BrowserRouter>
            <Routes>
                {isProduction ? (
                    <>
                        <Route
                            path="workspace/:workspaceId/onboard"
                            element={<CandidateOnboardOpenFormContainer />}
                        />
                        <Route path="not-found" element={<NotFound />} />
                        <Route
                            path="access-denied"
                            element={<AccessDenied />}
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/job-query" replace />}
                        />
                        <Route
                            path=":userType/:supportedId/signin"
                            element={<ExternalSigninContainer />}
                        />
                        <Route path="signin" element={<SigninContainer />} />
                        <Route path="forgotPassword" element={<></>} />
                        <Route
                            path="onboard"
                            element={<LeadOnboardingFormContainer />}
                        />

                        <Route
                            path=":chekInterestCode/apply"
                            element={<JQCheckInterestContainer />}
                        />
                        <Route path="*" element={<AppContainer />}></Route>
                    </>
                ) : (
                    <>
                        <Route
                            path="*"
                            element={<Navigate to="/not-found" replace />}
                        />
                        <Route
                            path="/access-denied"
                            element={<AccessDenied />}
                        />
                        <Route path="/not-found" element={<NotFound />} />
                        <Route path="/device-error" element={<DeviceError />} />

                        <Route
                            path="company/:companyId/:userType/:supportedId/signin"
                            element={<ExternalSigninContainer />}
                        />
                        <Route
                            path="company/:companyId/signin"
                            element={<SigninContainer />}
                        />
                        <Route
                            path="company/:companyId/forgotPassword"
                            element={<></>}
                        />
                        <Route
                            path="company/:companyId/onboard"
                            element={<LeadOnboardingFormContainer />}
                        />
                        <Route
                            path="company/:companyId/workspace/:workspaceId/onboard"
                            element={<CandidateOnboardOpenFormContainer />}
                        />
                        <Route
                            path="company/:companyId/:chekInterestCode/apply"
                            element={<JQCheckInterestContainer />}
                        />
                        <Route
                            path="company/:companyId/leads/:leadId/:jobQueryId"
                            element={<LeadOpenProfileContainer />}
                        />
                        <Route
                            path="company/:companyId/*"
                            element={<AppContainer />}
                        ></Route>
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesContainer;
