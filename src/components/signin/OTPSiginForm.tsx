import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import { SigninWrapper } from './SigninWrapper';
import { NumberField } from 'components/common';

import { RegExUtil } from 'utils';
import { useIsMobile, useRequestOTP } from 'hooks';
import type { ValidationMapProps } from 'interfaces';

export interface OTPSiginFormProps {
    fullName: string;
    mobileNumber: string;
    otpToken: string;
}

export type OTPSiginFormErrorProps = {
    [key in keyof OTPSiginFormProps]: boolean;
};

interface Props {
    apiError: string;
    handleSubmit: (_: OTPSiginFormProps) => void;
    isLoading: boolean;
}

const validationMap: ValidationMapProps = {
    mobileNumber: mobileNumber => RegExUtil.isMobileNumber(mobileNumber),
    otpToken: otpToken => otpToken.length === 6 && !isNaN(parseInt(otpToken)),
    fullName: fullName => RegExUtil.isName(fullName)
};

export const OTPSiginForm = ({ apiError, handleSubmit, isLoading }: Props) => {
    const isMobile = useIsMobile();
    const requestOtp = useRequestOTP();

    const [form, setForm] = React.useState<OTPSiginFormProps>({
        fullName: '',
        mobileNumber: '',
        otpToken: ''
    });
    const [errorState, setErrorState] = React.useState<OTPSiginFormErrorProps>({
        fullName: false,
        mobileNumber: false,
        otpToken: false
    });
    const [otpError, setOTPError] = React.useState<string>('');
    const [otpSuccess, setOTPSuccess] = React.useState<string>('');

    const isValid = (fieldName: string, fieldValue: string): boolean => {
        return (
            !fieldValue ||
            (fieldName in validationMap &&
                !validationMap[fieldName](fieldValue))
        );
    };

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setForm(oldForm => ({
            ...oldForm,
            [fieldName]: fieldValue
        }));

        setErrorState(oldError => ({
            ...oldError,
            [fieldName]: isValid(fieldName, fieldValue)
        }));
    };

    const hasFormError = React.useMemo(() => {
        if (otpSuccess) {
            return (
                Object.values(form).indexOf('') > -1 ||
                Object.values(errorState).indexOf(true) > -1
            );
        } else {
            return (
                form.mobileNumber === '' ||
                Object.values(errorState).indexOf(true) > -1
            );
        }
    }, [errorState, form, otpSuccess]);

    const onSigninClick = () => {
        if (otpSuccess) {
            setOTPSuccess('');
            setOTPError('');
            handleSubmit(form);
        } else
            requestOtp.mutate(
                {
                    body: {
                        mobileNumber: form.mobileNumber,
                        userType: 'CANDIDATE'
                    }
                },
                {
                    onSuccess: (response: { detail: string }) => {
                        setOTPSuccess(response.detail);
                    },
                    onError: error => {
                        setOTPSuccess('');
                        setOTPError(error.errors.displayError);
                    }
                }
            );
    };

    return (
        <SigninWrapper>
            <Grid container p={{ xs: 3, sm: 6 }} spacing={2}>
                <Grid item xs={12} mb={isMobile ? 0 : 3}>
                    <Grid container spacing={0.5} justifyContent="center">
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="h5" component="h5">
                                Sign in with OTP
                            </Typography>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="subtitle1">
                                to continue your Onboarding
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {apiError && (
                    <Grid item xs={12}>
                        <Alert severity="error">
                            {otpError !== '' ? otpError : apiError}
                        </Alert>
                    </Grid>
                )}

                <Grid item xs={12} container spacing={isMobile ? 2 : 3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            placeholder="Enter your Full Name"
                            value={form.fullName}
                            error={errorState.fullName}
                            helperText={
                                errorState.fullName
                                    ? 'Must be a valid Full Name'
                                    : ''
                            }
                            onChange={updateForm}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberField
                            required
                            fullWidth
                            id="mobileNumber"
                            name="mobileNumber"
                            label="Mobile Number"
                            placeholder="Enter your Mobile Number"
                            value={form.mobileNumber}
                            error={errorState.mobileNumber}
                            helperText={
                                errorState.mobileNumber
                                    ? 'Must be a valid Mobile Number'
                                    : ''
                            }
                            onChange={updateForm}
                        />
                    </Grid>
                    {otpSuccess && (
                        <Grid item xs={12}>
                            <NumberField
                                required
                                fullWidth
                                id="otpToken"
                                name="otpToken"
                                label="OTP"
                                placeholder="Enter your otp"
                                value={form.otpToken}
                                error={errorState.otpToken}
                                helperText={
                                    errorState.otpToken
                                        ? 'Must be 6 digits valid OTP'
                                        : ''
                                }
                                onChange={updateForm}
                            />
                        </Grid>
                    )}
                    {otpSuccess && (
                        <Grid item xs={12}>
                            <Alert severity="success">{otpSuccess ?? ''}</Alert>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="end">
                        <LoadingButton
                            variant="contained"
                            size="large"
                            onClick={onSigninClick}
                            loading={requestOtp.isLoading || isLoading}
                            disabled={hasFormError}
                            sx={{
                                bgcolor: '#3545A3',
                                '&:hover': {
                                    bgcolor: '#404ea1'
                                }
                            }}
                        >
                            {otpSuccess ? `VERIFY OTP` : `SIGN IN`}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </SigninWrapper>
    );
};
