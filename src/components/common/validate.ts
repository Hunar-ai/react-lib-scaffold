import _ from 'lodash';

export const isEmailInvalid = (emailAddress: string) => {
    if (emailAddress) {
        const re = /\S+@\S+\.\S+/;
        return !(emailAddress && re.test(emailAddress));
    }
    return false;
};

export const isPasswordInvalid = (password: string) => {
    if (password) {
        const re =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return !(password && re.test(password));
    }
    return false;
};

const toNumber = (value: string): number => {
    const number = parseFloat(value);
    if (!isNaN(number) && isFinite(number)) {
        return number;
    } else {
        throw new Error(
            `Connot convert ${value} to a number. use a valid number for conversion.`
        );
    }
};

const isNumeric = (value: string): boolean => {
    const number = parseFloat(value);
    return !isNaN(parseFloat(value)) && isFinite(number);
};

export const isPositiveNumber = (value: string): boolean => {
    return isNumeric(value) && toNumber(value) > 0;
};

export const isEmpty = (value: string): boolean => {
    if (_.isNumber(value)) {
        return !_.isFinite(value); // if finite, return false. Covers NaN
    }

    return _.isEmpty(value);
};

export const isGSTIN = (GSTIN: string): boolean => {
    if (GSTIN) {
        const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return !!(GSTIN && re.test(GSTIN));
    }
    return true;
};

export const isTAN = (tan: string): boolean => {
    if (tan) {
        const re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        return !!(tan && re.test(tan));
    }
    return true;
};
