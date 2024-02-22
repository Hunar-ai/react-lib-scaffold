const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
});

export const NumberUtils = {
    toNumber(value: number | string): number {
        const number = parseFloat(`${value}`);
        if (!isNaN(number) && isFinite(number)) {
            return number;
        } else {
            throw new Error(
                `Connot convert ${value} to a number. use a valid number for conversion.`
            );
        }
    },
    toINR(value: number) {
        return currencyFormatter.format(value);
    },
    isNumeric(value: number): boolean {
        return !isNaN(parseFloat(`${value}`)) && isFinite(value);
    },
    isNumericRange(value: number, range: { min?: number; max?: number }) {
        return (range.min ?? 0) <= value && value <= (range.max ?? Infinity);
    },
    isPositiveNumber(value: number): boolean {
        return NumberUtils.isNumeric(value) && NumberUtils.toNumber(value) > 0;
    }
};
