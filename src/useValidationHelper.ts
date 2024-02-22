import type {
    ErrorStateProps,
    TimeSlotProps,
    ValidationMapProps
} from 'interfaces';

interface HasFormFieldErrorProps {
    fieldName: string;
    fieldValue: string;
    isRequired?: boolean;
}

interface GetFormErrorStateProps {
    form: Record<string, any>;
    requiredFields?: string[];
}

export const useValidationHelper = (validationMap: ValidationMapProps = {}) => {
    const hasFormFieldError = ({
        fieldName,
        fieldValue,
        isRequired
    }: HasFormFieldErrorProps) => {
        let error = false;
        const trimmedFieldValue = fieldValue?.trimStart();
        if (isRequired) {
            error =
                !trimmedFieldValue ||
                (fieldName in validationMap &&
                    !validationMap[fieldName](trimmedFieldValue));
        } else {
            error =
                !!trimmedFieldValue &&
                fieldName in validationMap &&
                !validationMap[fieldName](trimmedFieldValue);
        }
        return error;
    };

    const getFormErrorState = ({
        form,
        requiredFields = []
    }: GetFormErrorStateProps) => {
        const errorState = Object.keys(form).reduce((acc, fieldName) => {
            const isRequired = requiredFields.includes(fieldName);
            if (fieldName in validationMap || isRequired) {
                return {
                    ...acc,
                    [fieldName]: hasFormFieldError({
                        fieldName,
                        fieldValue: form[fieldName],
                        isRequired: isRequired
                    })
                };
            } else {
                return acc;
            }
        }, {});
        return errorState;
    };

    const hasError = (errorState: ErrorStateProps) =>
        Object.values(errorState).indexOf(true) > -1;

    const getFormErrorData = (props: GetFormErrorStateProps) => {
        const errorState = getFormErrorState(props);
        return {
            errorState,
            hasFormError: hasError(errorState)
        };
    };

    const hasTimeRangeError = (timeSlot: TimeSlotProps) => {
        if (
            timeSlot.startTime &&
            timeSlot.endTime &&
            timeSlot.startTime >= timeSlot.endTime
        ) {
            return { startTime: true, endTime: true };
        } else {
            return { startTime: false, endTime: false };
        }
    };

    return {
        hasFormFieldError,
        getFormErrorState,
        getFormErrorData,
        hasError,
        hasTimeRangeError
    };
};
