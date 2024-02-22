import React from 'react';

import { TableFilters } from 'hooks';
import type {
    FilterKey,
    Options,
    Option,
    JQQualificationQuestionsProps
} from 'interfaces';
import { get } from 'lodash';
import { TimeUtils } from 'utils';

export const useHelper = () => {
    const getFormattedRangeFilters = (filters: TableFilters) => {
        let modifiedFilters = { ...filters };
        if (modifiedFilters.age) {
            if (modifiedFilters.minAge) delete modifiedFilters.minAge;
            if (modifiedFilters.maxAge) delete modifiedFilters.maxAge;
        } else {
            if (modifiedFilters.minAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        min: modifiedFilters.minAge
                    }
                };
            }
            if (modifiedFilters.maxAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        max: modifiedFilters.maxAge
                    }
                };
            }
            delete modifiedFilters.minAge;
            delete modifiedFilters.maxAge;
        }
        if (modifiedFilters.currentSalary) {
            if (modifiedFilters.minCurrentSalary)
                delete modifiedFilters.minCurrentSalary;
            if (modifiedFilters.maxCurrentSalary)
                delete modifiedFilters.maxCurrentSalary;
        } else {
            if (modifiedFilters.minCurrentSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    currentSalary: {
                        ...(modifiedFilters.currentSalary || {}),
                        min: modifiedFilters.minCurrentSalary
                    }
                };
            }
            if (modifiedFilters.maxCurrentSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    currentSalary: {
                        ...(modifiedFilters.currentSalary || {}),
                        max: modifiedFilters.maxCurrentSalary
                    }
                };
            }
            delete modifiedFilters.minCurrentSalary;
            delete modifiedFilters.maxCurrentSalary;
        }
        if (modifiedFilters.expectedSalary) {
            if (modifiedFilters.minExpectedSalary)
                delete modifiedFilters.minExpectedSalary;
            if (modifiedFilters.maxExpectedSalary)
                delete modifiedFilters.maxExpectedSalary;
        } else {
            if (modifiedFilters.minExpectedSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    expectedSalary: {
                        ...(modifiedFilters.expectedSalary || {}),
                        min: modifiedFilters.minExpectedSalary
                    }
                };
            }
            if (modifiedFilters.maxExpectedSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    expectedSalary: {
                        ...(modifiedFilters.expectedSalary || {}),
                        max: modifiedFilters.maxExpectedSalary
                    }
                };
            }
            delete modifiedFilters.minExpectedSalary;
            delete modifiedFilters.maxExpectedSalary;
        }
        if (modifiedFilters.age) {
            if (modifiedFilters.minAge) delete modifiedFilters.minAge;
            if (modifiedFilters.maxAge) delete modifiedFilters.maxAge;
        } else {
            if (modifiedFilters.minAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        min: modifiedFilters.minAge
                    }
                };
            }
            if (modifiedFilters.maxAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        max: modifiedFilters.maxAge
                    }
                };
            }
            delete modifiedFilters.minAge;
            delete modifiedFilters.maxAge;
        }

        return modifiedFilters;
    };
    const getFormattedfilters = (filters: TableFilters) => {
        let modifiedFilters = getFormattedRangeFilters(filters);
        modifiedFilters = getFormattedBooleanFilters(
            modifiedFilters as Record<string, unknown>
        );

        for (const modifiedFilterKey of Object.keys(modifiedFilters)) {
            const filterKey = modifiedFilterKey as keyof typeof modifiedFilters;
            if (Array.isArray(modifiedFilters[filterKey])) {
                const filter = (
                    modifiedFilters[filterKey] ? modifiedFilters[filterKey] : []
                ) as string[];
                if (filter?.length === 0) {
                    delete modifiedFilters[filterKey];
                }
            } else {
                if (
                    filterKey === 'age' ||
                    filterKey === 'yearsOfExperience' ||
                    filterKey === 'currentSalary' ||
                    filterKey === 'expectedSalary'
                ) {
                    const min = get(modifiedFilters, `${filterKey}.min`);
                    const max = get(modifiedFilters, `${filterKey}.max`);
                    if (
                        (typeof min === 'number' && isNaN(min)) ||
                        min === null ||
                        `${min}` === ''
                    )
                        delete modifiedFilters[filterKey]?.min;
                    if (
                        (typeof max === 'number' && isNaN(max)) ||
                        max === null ||
                        `${max}` === ''
                    )
                        delete modifiedFilters[filterKey]?.max;
                }
                if (
                    Object.keys(modifiedFilters[filterKey] || {}).length === 0
                ) {
                    delete modifiedFilters[filterKey];
                }
            }
        }

        return modifiedFilters;
    };

    const getFormattedBooleanFilters = (filters: Record<string, unknown>) => {
        const modifiedFilters = { ...filters };
        if (
            'hasOwnVehicle' in modifiedFilters &&
            typeof modifiedFilters.hasOwnVehicle === 'boolean'
        ) {
            modifiedFilters['hasOwnVehicle'] =
                modifiedFilters.hasOwnVehicle === false
                    ? ['FALSE']
                    : modifiedFilters.hasOwnVehicle === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'hasSkillCertification' in modifiedFilters &&
            typeof modifiedFilters.hasSkillCertification === 'boolean'
        ) {
            modifiedFilters['hasSkillCertification'] =
                modifiedFilters.hasSkillCertification === false
                    ? ['FALSE']
                    : modifiedFilters.hasSkillCertification === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isDifferentlyAbled' in modifiedFilters &&
            typeof modifiedFilters.isDifferentlyAbled === 'boolean'
        ) {
            modifiedFilters['isDifferentlyAbled'] =
                modifiedFilters.isDifferentlyAbled === false
                    ? ['FALSE']
                    : modifiedFilters.isDifferentlyAbled === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'bankDetailsAvailable' in modifiedFilters &&
            typeof modifiedFilters.bankDetailsAvailable === 'boolean'
        ) {
            modifiedFilters['bankDetailsAvailable'] =
                modifiedFilters.bankDetailsAvailable === false
                    ? ['FALSE']
                    : modifiedFilters.bankDetailsAvailable === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isAadhaarVerified' in modifiedFilters &&
            typeof modifiedFilters.isAadhaarVerified === 'boolean'
        ) {
            modifiedFilters['isAadhaarVerified'] =
                modifiedFilters.isAadhaarVerified === false
                    ? ['FALSE']
                    : modifiedFilters.isAadhaarVerified === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isBankAccountVerified' in modifiedFilters &&
            typeof modifiedFilters.isBankAccountVerified === 'boolean'
        ) {
            modifiedFilters['isBankAccountVerified'] =
                modifiedFilters.isBankAccountVerified === false
                    ? ['FALSE']
                    : modifiedFilters.isBankAccountVerified === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isDoubleVaccinated' in modifiedFilters &&
            typeof modifiedFilters.isDoubleVaccinated === 'boolean'
        ) {
            modifiedFilters['isDoubleVaccinated'] =
                modifiedFilters.isDoubleVaccinated === false
                    ? ['FALSE']
                    : modifiedFilters.isDoubleVaccinated === true
                    ? ['TRUE']
                    : [];
        }
        return modifiedFilters;
    };

    const isMultiSelect = React.useCallback((columnId: FilterKey) => {
        return (
            columnId === 'gender' ||
            columnId === 'maritalStatus' ||
            columnId === 'currentDistrict' ||
            columnId === 'currentState' ||
            columnId === 'jobRoles' ||
            columnId === 'preferredLanguages' ||
            columnId === 'educationalQualificationType' ||
            columnId === 'isAadhaarVerified' ||
            columnId === 'isDoubleVaccinated' ||
            columnId === 'hasSkillCertification' ||
            columnId === 'englishProficiency' ||
            columnId === 'willingToMove' ||
            columnId === 'workerStatus' ||
            columnId === 'permanentState' ||
            columnId === 'permanentDistrict' ||
            columnId === 'ownedVehicle' ||
            columnId === 'jobQueryWorkerStatus' ||
            columnId === 'bankDetailsAvailable' ||
            columnId === 'isBankAccountVerified' ||
            columnId === 'isDifferentlyAbled' ||
            columnId === 'referrerType' ||
            columnId === 'isCredentialsShared' ||
            columnId === 'verificationStatus' ||
            columnId === 'candidateStatus' ||
            columnId === 'addedBy' ||
            columnId === 'status' ||
            columnId === 'commentStatus' ||
            columnId === 'communicationStatus' ||
            columnId === 'channel' ||
            columnId === 'channelType' ||
            columnId === 'scheduleStatus' ||
            columnId === 'turnUpStatus' ||
            columnId === 'selectionStatus' ||
            columnId === 'callingStatus_1' ||
            columnId === 'callingStatus_2' ||
            columnId === 'callingStatus_3'
        );
    }, []);

    const isRangeSelect = React.useCallback((columnId: FilterKey) => {
        return (
            columnId === 'age' ||
            columnId === 'yearsOfExperience' ||
            columnId === 'currentSalary' ||
            columnId === 'expectedSalary'
        );
    }, []);

    const htmlDecode = (message: string) => {
        return decodeURIComponent(message).replace(/\n/g, '<br/>');
    };

    const isDateRangeSelect = React.useCallback((columnId: FilterKey) => {
        return columnId === 'createdOn';
    }, []);

    const getEncodedText = (text: string) => {
        return encodeURIComponent(
            text.replaceAll('%0A', '\n').replaceAll('%20', ' ')
        );
    };

    const addToObject = (
        obj: JQQualificationQuestionsProps,
        key: string,
        value: unknown,
        index: number
    ) => {
        // Create a temp object and index variable
        const temp: any = {};
        let i = 0;

        // Loop through the original object
        for (const prop in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(prop)) {
                // If the indexes match, add the new item
                if (i === index && key && value) {
                    temp[key] = value;
                }

                // Add the current item in the loop to the temp obj
                temp[prop] = obj[prop];

                // Increase the count
                i++;
            }
        }

        // If no index, add to the end
        if (!index && key && value) {
            temp[key] = value;
        }

        return temp;
    };

    const getRelativeDateField = (fieldValue: string | null) => {
        return fieldValue ? TimeUtils.timeSince(fieldValue) : '';
    };

    const getFormattedBooleanField = (fieldValue: boolean | null) => {
        return fieldValue === false ? 'No' : fieldValue === true ? 'Yes' : '';
    };

    const getValueToLabelMap = (
        options: Options
    ): { [key: string]: string } => {
        const optionsMap = options.reduce(
            (acc: { [key: string]: string }, key: Option) => {
                acc = {
                    ...acc,
                    [key.value]: key.label
                };
                return acc;
            },
            {}
        );
        return optionsMap;
    };

    return {
        getFormattedfilters,
        getFormattedBooleanFilters,
        isMultiSelect,
        isRangeSelect,
        htmlDecode,
        getEncodedText,
        isDateRangeSelect,
        addToObject,
        getRelativeDateField,
        getFormattedBooleanField,
        getValueToLabelMap
    };
};
