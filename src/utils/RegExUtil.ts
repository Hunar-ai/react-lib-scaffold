export const RegExUtil = {
    test: (regex: string | RegExp, value: string) =>
        new RegExp(regex).test(value),
    alphaNumericWithUnderscoreAndDash: '^[a-zA-Z0-9_-]*$',
    range: ({ min = 1, max = 200 } = {}) => `^(.|\n){${min},${max}}$`,
    conformToId: (psuedoId: string): string => {
        const id = psuedoId.replace(/[^a-zA-Z0-9_]/g, '-');
        return id.slice(0, 33).toLowerCase();
    },
    isId: (id: string, limit = 25): boolean => {
        const re = /^[a-zA-Z0-9_-]*$/;
        return !!id && re.test(id) && id.length > 0 && id.length <= limit;
    },
    isMobileNumber: (mobileNumber: string): boolean => {
        const re = /^[6-9]\d{9}$/;
        return !!mobileNumber && re.test(mobileNumber);
    },
    isGSTIN: (gstin: string): boolean => {
        const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return !!gstin && re.test(gstin);
    },
    isAadhaar: (aadhaarNumber: string): boolean => {
        const re = /^[2-9]{1}[0-9]{11}$/;
        return !!aadhaarNumber && re.test(aadhaarNumber);
    },
    isYearsOfExperience: (yearsOfExperience: string): boolean => {
        const re = /^[0-9][0-9]?$|^50$/;
        return !!yearsOfExperience && re.test(yearsOfExperience);
    },
    isName: (name: string): boolean => {
        const re = /^[a-zA-Z0-9.-\s]*$/;
        const trimmedName = name.trim();
        return (
            !!trimmedName &&
            re.test(trimmedName) &&
            trimmedName.length > 2 &&
            trimmedName.length < 100
        );
    },
    isEmail(email: string | null) {
        const re = /\S+@\S+\.\S+/;
        return !!email && re.test(email);
    },
    isDescription(description: string | null, limit?: number) {
        return (description || '')?.length <= (limit || 200);
    },
    isNumber(str: string): boolean {
        const regex = /^\d+$/;
        return regex.test(str);
    },
    isAlphaNumeric(str: string): boolean {
        const regex = /^[a-zA-Z0-9]*$/;
        return regex.test(str);
    },
    isAddress(str: string, limit = 201): boolean {
        return str.length < limit;
    },
    isPositiveNumber(str: string): boolean {
        const regex = /^\+?[0-9]+(?:\.[0-9]+)?$/;
        return regex.test(str);
    },
    isCIN(str: string): boolean {
        const regex =
            /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
        return regex.test(str);
    },
    isPAN(str: string): boolean {
        const regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        return regex.test(str);
    },
    isFSSAI(str: string): boolean {
        const regex = /^[0-9]{1}[0-9A-Z]{13}$/;
        return regex.test(str);
    },
    isDate(str: string): boolean {
        // eslint-disable-next-line no-useless-escape
        const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(str);
    }
};
