import React from 'react';
import { useLocation } from 'react-router-dom';

import { useBaseURL, useCompanyId } from 'hooks';

import { GaUtils, DataUtils } from 'utils';

import {
    CUSTOMER_EVENT,
    JQ_FORM_EVENT,
    JQ_SEARCH_RESULTS_EVENT,
    JQ_SHORTLISTED_EVENT,
    JQ_SUMMARY_EVENT,
    ONBOARDING_DOCS_SUMMARY_EVENT,
    RECRUITER_EVENT,
    VENDOR_EVENT,
    CV_EVENT,
    ONBOARDING_DOCS_DETAILS_EVENT,
    CANDIDATE_EVENT,
    LEADS_EVENT,
    COLUMN_EVENT,
    TABLE_NAME,
    WORKSPACE_SUMMARY_EVENT,
    WORKSPACE_EVENT,
    FORM_TEMPLATES_EVENT,
    REFERRAL_CAMPAIGN_EVENT,
    JQ_CREATE_EVENT,
    JQ_INTERESTED_EVENT,
    JQ_QUALIFIED_EVENT
} from 'enums';
import {
    JOB_QUERY_COMMENT_STATUS,
    JQ_SECTION as JQ_MODAL_SECTION,
    JQ_STATUS
} from 'Enum';
import {
    GA_EVENT_NAME,
    GA_EVENT_MODEL,
    type ModelNameProps,
    type LeadChooseModalOptionId
} from 'interfaces';

export const jqModalSectionEventMap = {
    [JQ_MODAL_SECTION.JOB_QUERY_DETAILS]: {
        enabled: 'CLICK_MODAL_JQ_DETAILS_EXPAND_ACCORDION',
        disabled: 'CLICK_MODAL_DISABLED_JQ_DETAILS_EXPAND_ACCORDION'
    },
    [JQ_MODAL_SECTION.SEARCH_FILTERS]: {
        enabled: 'CLICK_MODAL_SEARCH_FILTERS_EXPAND_ACCORDION',
        disabled: 'CLICK_MODAL_DISABLED_SEARCH_FILTERS_EXPAND_ACCORDION'
    },
    [JQ_MODAL_SECTION.QUALIFICATION_SETUP]: {
        enabled: 'CLICK_MODAL_PROFILE_UPDATE_QUESTIONS_EXPAND_ACCORDION',
        disabled:
            'CLICK_MODAL_DISABLED_PROFILE_UPDATE_QUESTIONS_EXPAND_ACCORDION'
    },
    [JQ_MODAL_SECTION.INTERVIEW_DETAILS]: {
        enabled: 'CLICK_MODAL_QUALIFICATION_QUESTIONS_EXPAND_ACCORDION',
        disabled:
            'CLICK_MODAL_DISABLED_QUALIFICATION_QUESTIONS_EXPAND_ACCORDION'
    },
    [JQ_MODAL_SECTION.SEARCH_RESULT_SUMMARY]: {
        enabled: 'CLICK_MODAL_SEARCH_RESULT_SUMMARY_EXPAND_ACCORDION',
        disabled: 'CLICK_MODAL_DISABLED_SEARCH_RESULT_SUMMARY_EXPAND_ACCORDION'
    }
};

export const jqKebabOptionEventMap = {
    [JQ_STATUS.DUPLICATE]: JQ_SUMMARY_EVENT.CLICK_JQ_CARD_DUPLICATE_QUERY_BTN,
    [JQ_STATUS.OPEN]: JQ_SUMMARY_EVENT.CLICK_JQ_CARD_OPEN_QUERY_BTN,
    [JQ_STATUS.CLOSED]: JQ_SUMMARY_EVENT.CLICK_JQ_CARD_CLOSE_QUERY_BTN
};

type ModelMapProps = {
    [key in ModelNameProps]: GA_EVENT_MODEL;
};

const modelNameToModelEventMap: ModelMapProps = {
    personnels: GA_EVENT_MODEL.RECRUITER_EVENT,
    vendors: GA_EVENT_MODEL.VENDOR_EVENT,
    customers: GA_EVENT_MODEL.CUSTOMER_EVENT,
    'job-query': GA_EVENT_MODEL.JQ_SUMMARY_EVENT,
    searchResults: GA_EVENT_MODEL.JQ_SEARCH_RESULTS_EVENT,
    cvs: GA_EVENT_MODEL.CV_EVENT,
    shortlisted: GA_EVENT_MODEL.JQ_SHORTLISTED_EVENT,
    interestedWorkers: GA_EVENT_MODEL.JQ_INTERESTED_EVENT,
    qualifiedWorkers: GA_EVENT_MODEL.JQ_QUALIFIED_EVENT,
    'onboarding-docs': GA_EVENT_MODEL.ONBOARDING_DOCS_SUMMARY_EVENT,
    'onboarding-docs-details': GA_EVENT_MODEL.ONBOARDING_DOCS_DETAILS_EVENT,
    candidates: GA_EVENT_MODEL.CANDIDATE_EVENT,
    workers: GA_EVENT_MODEL.LEADS_EVENT,
    workspaces: GA_EVENT_MODEL.WORKSPACE_SUMMARY_EVENT,
    workspaceDetails: GA_EVENT_MODEL.WORKSPACE_EVENT,
    workspaceCandidates: GA_EVENT_MODEL.WORKSPACE_EVENT,
    'form-templates': GA_EVENT_MODEL.FORM_TEMPLATES_EVENT
};

const modelNameToModulePageMap = {
    personnels: 'Recruiters',
    vendors: 'Vendors',
    customers: 'Customers',
    'job-query': 'JQ Summary Page',
    searchResults: 'JQ Search Results',
    cvs: 'DC Search',
    shortlisted: 'JQ Shortlisted Tab',
    interestedWorkers: 'JQ Interested Tab',
    qualifiedWorkers: 'JQ Qualified Tab',
    'onboarding-docs': 'Onboarding Docs',
    'onboarding-docs-details': 'Onboarding Docs Details',
    candidates: 'All Candidates',
    workers: 'Leads',
    workspaces: 'Workspaces',
    workspaceDetails: 'Workspace Details',
    workspaceCandidates: 'Workspace Candidates',
    'form-templates': 'Form templates'
};

const modelNameToTableMap = {
    searchResults: TABLE_NAME.JQ_SEARCH_RESULTS,
    shortlisted: TABLE_NAME.SHORTLISTED_TAB,
    interestedWorkers: TABLE_NAME.INTERESTED_TAB,
    qualifiedWorkers: TABLE_NAME.QUALIFIED_TAB,
    cvs: TABLE_NAME.CV_SEARCH,
    'onboarding-docs-details': TABLE_NAME.ONBOARDING_DOCS_DETAILS,
    workspaceCandidates: TABLE_NAME.WORKSPACE_CANDIDATES,
    'form-templates': TABLE_NAME.FORM_TEMPLATES
};

type EventNameToEventModelMap = {
    [GA_EVENT_MODEL.CUSTOMER_EVENT]: typeof CUSTOMER_EVENT;
    [GA_EVENT_MODEL.JQ_CREATE_EVENT]: typeof JQ_CREATE_EVENT;
    [GA_EVENT_MODEL.JQ_SEARCH_RESULTS_EVENT]: typeof JQ_SEARCH_RESULTS_EVENT;
    [GA_EVENT_MODEL.JQ_SHORTLISTED_EVENT]: typeof JQ_SHORTLISTED_EVENT;
    [GA_EVENT_MODEL.JQ_INTERESTED_EVENT]: typeof JQ_INTERESTED_EVENT;
    [GA_EVENT_MODEL.JQ_QUALIFIED_EVENT]: typeof JQ_QUALIFIED_EVENT;
    [GA_EVENT_MODEL.JQ_SUMMARY_EVENT]: typeof JQ_SUMMARY_EVENT;
    [GA_EVENT_MODEL.RECRUITER_EVENT]: typeof RECRUITER_EVENT;
    [GA_EVENT_MODEL.VENDOR_EVENT]: typeof VENDOR_EVENT;
    [GA_EVENT_MODEL.CV_EVENT]: typeof CV_EVENT;
    [GA_EVENT_MODEL.JQ_FORM_EVENT]: typeof JQ_FORM_EVENT;
    [GA_EVENT_MODEL.ONBOARDING_DOCS_SUMMARY_EVENT]: typeof ONBOARDING_DOCS_SUMMARY_EVENT;
    [GA_EVENT_MODEL.ONBOARDING_DOCS_DETAILS_EVENT]: typeof ONBOARDING_DOCS_DETAILS_EVENT;
    [GA_EVENT_MODEL.CANDIDATE_EVENT]: typeof CANDIDATE_EVENT;
    [GA_EVENT_MODEL.LEADS_EVENT]: typeof LEADS_EVENT;
    [GA_EVENT_MODEL.WORKSPACE_SUMMARY_EVENT]: typeof WORKSPACE_SUMMARY_EVENT;
    [GA_EVENT_MODEL.WORKSPACE_EVENT]: typeof WORKSPACE_EVENT;
    [GA_EVENT_MODEL.FORM_TEMPLATES_EVENT]: typeof FORM_TEMPLATES_EVENT;
    [GA_EVENT_MODEL.REFERRAL_CAMPAIGN_EVENT]: typeof REFERRAL_CAMPAIGN_EVENT;
};

const allEvents: EventNameToEventModelMap = {
    CUSTOMER_EVENT,
    JQ_CREATE_EVENT,
    JQ_SEARCH_RESULTS_EVENT,
    JQ_SHORTLISTED_EVENT,
    JQ_INTERESTED_EVENT,
    JQ_QUALIFIED_EVENT,
    JQ_SUMMARY_EVENT,
    RECRUITER_EVENT,
    VENDOR_EVENT,
    CV_EVENT,
    JQ_FORM_EVENT,
    ONBOARDING_DOCS_SUMMARY_EVENT,
    ONBOARDING_DOCS_DETAILS_EVENT,
    CANDIDATE_EVENT,
    LEADS_EVENT,
    WORKSPACE_SUMMARY_EVENT,
    WORKSPACE_EVENT,
    FORM_TEMPLATES_EVENT,
    REFERRAL_CAMPAIGN_EVENT
};

const newLeadModalEventMap: Record<LeadChooseModalOptionId, string> = {
    searchDB: 'CLICK_NEW_LEADS_MODAL_SEARCH_DB_BTN',
    socialsShare: 'CLICK_NEW_LEADS_MODAL_SOCIAL_MEDIA_SHARE_BTN',
    bulkUpload: 'CLICK_NEW_LEADS_MODAL_BULK_UPLOAD_BTN',
    singleUpload: 'CLICK_NEW_LEADS_MODAL_ADD_SINGLE_LEAD_BTN',
    generateQRCode: 'CLICK_NEW_LEADS_MODAL_GENERATE_QR_BTN',
    createReferralCampaign:
        'CLICK_NEW_LEADS_MODAL_CREATE_REFERRAL_CAMPAIGN_BTN',
    marketplace: 'CLICK_NEW_LEADS_MODAL_SHARE_MARKETPLACE_BTN',
    singleShortlist: 'CLICK_NEW_LEADS_MODAL_SINGLE_SHORTLIST_BTN',
    uploadCV: 'CLICK_NEW_LEADS_MODAL_CV_UPLOAD_BTN'
};

export const useGaHelper = () => {
    const companyId = useCompanyId();
    const location = useLocation();
    const baseURL = useBaseURL();

    const getEventModel = (
        modelName: ModelNameProps,
        eventName: GA_EVENT_NAME
    ): GA_EVENT_NAME => {
        if (modelName in modelNameToModelEventMap) {
            const eventModelName = modelNameToModelEventMap[modelName];
            const eventModel: any = allEvents[eventModelName];
            const gaEvent = eventModel[eventName] as GA_EVENT_NAME;
            return gaEvent;
        }
        // TODO: Once all modules are implemented, throw/log error here
        return '' as GA_EVENT_NAME;
    };

    const getColumnEventModel = (
        modelName: string,
        column: string,
        eventName: COLUMN_EVENT,
        filter?: string
    ): GA_EVENT_NAME => {
        const columnName = DataUtils.toSnake(column);
        const filterName = filter && DataUtils.toSnake(filter);
        if (modelName in modelNameToTableMap) {
            const tableName =
                modelNameToTableMap[
                    modelName as keyof typeof modelNameToTableMap
                ];
            return (
                filterName
                    ? `click_${tableName}_table_${columnName}_${filterName}_${eventName}`
                    : `click_${tableName}_table_${columnName}_${eventName}`
            ) as GA_EVENT_NAME;
        }
        return '' as GA_EVENT_NAME;
    };

    const getModulePageName = (modelName: ModelNameProps): string => {
        if (modelName in modelNameToModulePageMap) {
            const pageName = modelNameToModulePageMap[modelName];
            return pageName;
        }
        // TODO: Once all modules are implemented, throw/log error here
        return '';
    };

    const gaEventParams = React.useMemo(() => {
        return {
            companyId
        };
    }, [companyId]);

    const getModelNameFromPath = React.useCallback(
        (path: string) => {
            const pathSegments = path.replace(baseURL, '').split('/');
            const moduleName =
                pathSegments.includes('onboarding-docs') &&
                pathSegments.length === 3
                    ? 'onboarding-docs-details'
                    : pathSegments[pathSegments.length - 1];
            return moduleName;
        },
        [baseURL]
    );

    const modelName = React.useMemo(() => {
        const { pathname, search } = location;
        let moduleName = '';
        if (search) {
            const queryParam = new URLSearchParams(search);
            const tabName = queryParam.get('tab') || '';
            if (tabName === 'details') {
                moduleName = 'workspaceDetails';
            } else if (tabName === 'candidates') {
                moduleName = 'workspaceCandidates';
            } else {
                moduleName = tabName;
            }
        } else {
            moduleName = getModelNameFromPath(pathname);
        }
        return moduleName;
    }, [getModelNameFromPath, location]);

    const captureGaEvent = React.useCallback(
        (name: GA_EVENT_NAME) => {
            GaUtils.captureGaEvent(name, gaEventParams);
        },
        [gaEventParams]
    );

    const captureGaPageView = React.useCallback(
        (name: GA_EVENT_NAME, page: string) => {
            GaUtils.captureGaPageView(
                page,
                window.location.pathname,
                gaEventParams
            );
            GaUtils.captureGaEvent(name, gaEventParams);
        },
        [gaEventParams]
    );

    const onPersonnelFormFieldClick = (
        e: React.MouseEvent | React.SyntheticEvent
    ) => {
        const fieldName = (e.target as HTMLInputElement).name;
        let eventName: RECRUITER_EVENT = '' as RECRUITER_EVENT;

        switch (fieldName) {
            case 'fullName':
                eventName = RECRUITER_EVENT.CLICK_FULL_NAME;
                break;
            case 'personnelId':
                eventName = RECRUITER_EVENT.CLICK_RECRUITER_ID;
                break;
            case 'email':
                eventName = RECRUITER_EVENT.CLICK_EMAIL;
                break;
            case 'mobileNumber':
                eventName = RECRUITER_EVENT.CLICK_MOBILE;
                break;
            case 'workspaceSelect':
                eventName = RECRUITER_EVENT.CLICK_WORKSPACE;
                break;
            default:
                break;
        }

        GaUtils.captureGaEvent(eventName, gaEventParams);
    };

    // To be refactored later
    const onVendorFormFieldClick = (
        e: React.MouseEvent | React.SyntheticEvent,
        currentIndex?: number
    ) => {
        let eventName: VENDOR_EVENT = '' as VENDOR_EVENT;
        const fieldName = DataUtils.toSnake(
            (e.target as HTMLInputElement).name
        );

        if (currentIndex) {
            eventName =
                `click_vendor_form_secondary_poc_${currentIndex}_${fieldName}_field` as VENDOR_EVENT;
        } else {
            eventName = `click_vendor_form_${fieldName}_field` as VENDOR_EVENT;
        }

        GaUtils.captureGaEvent(eventName, gaEventParams);
    };

    const onCandidateCustomFieldsFormFieldClick = (
        e: React.MouseEvent | React.SyntheticEvent
    ) => {
        let eventName: WORKSPACE_EVENT = '' as WORKSPACE_EVENT;
        const fieldName = DataUtils.toSnake(
            (e.target as HTMLInputElement).name
        );

        eventName =
            `click_candidate_custom_field_form_${fieldName}_field` as WORKSPACE_EVENT;

        GaUtils.captureGaEvent(eventName, gaEventParams);
    };

    const onFormTemplateFormFieldClick = (
        e: React.MouseEvent | React.SyntheticEvent
    ) => {
        let eventName: WORKSPACE_EVENT = '' as WORKSPACE_EVENT;
        const fieldName = DataUtils.toSnake(
            (e.target as HTMLInputElement).name
        );

        eventName =
            `click_form_template_form_${fieldName}_field` as WORKSPACE_EVENT;

        GaUtils.captureGaEvent(eventName, gaEventParams);
    };

    const onJoiningFormFieldClick = (
        e: React.MouseEvent | React.SyntheticEvent
    ) => {
        let eventName: WORKSPACE_EVENT = '' as WORKSPACE_EVENT;
        const fieldName = DataUtils.toSnake(
            (e.target as HTMLInputElement).name
        );

        eventName = `click_joining_form_${fieldName}_field` as WORKSPACE_EVENT;

        GaUtils.captureGaEvent(eventName, gaEventParams);
    };

    // To be refactored later
    const onCustomerFormFieldClick = (
        e: React.MouseEvent | React.SyntheticEvent,
        currentIndex?: number
    ) => {
        let eventName: VENDOR_EVENT = '' as VENDOR_EVENT;
        const fieldName = DataUtils.toSnake(
            (e.target as HTMLInputElement).name
        );

        if (currentIndex) {
            eventName =
                `click_customer_form_secondary_poc_${currentIndex}_${fieldName}_field` as VENDOR_EVENT;
        } else {
            eventName =
                `click_customer_form_${fieldName}_field` as VENDOR_EVENT;
        }

        GaUtils.captureGaEvent(eventName, gaEventParams);
    };

    const onLeadFormFieldClick = (e: React.BaseSyntheticEvent) => {
        const fieldName = DataUtils.toSnake(e.target.name);
        const eventName = `click_lead_form_${fieldName}_field` as LEADS_EVENT;
        captureGaEvent(eventName);
    };

    const onJQCreateDetailsFormFieldClick = (e: React.BaseSyntheticEvent) => {
        const fieldName = DataUtils.toSnake(e.target.name);
        const eventName =
            `click_jq_create_details_form_${fieldName}_field` as JQ_CREATE_EVENT;
        captureGaEvent(eventName);
    };

    const onReferralCampaignFormFieldClick = (
        e: React.BaseSyntheticEvent,
        currentIndex?: number
    ) => {
        const fieldName = DataUtils.toSnake(e.target.name);
        const eventName = (
            currentIndex === undefined
                ? `click_referral_campaign_form_${fieldName}_field`
                : `click_referral_campaign_form_contact_${currentIndex}_${fieldName}_field`
        ) as REFERRAL_CAMPAIGN_EVENT;

        captureGaEvent(eventName);
    };

    const getSecondaryPOCClickHandler = (location: string) => {
        const moduleName = getModelNameFromPath(location);

        switch (moduleName) {
            case 'vendors':
                return onVendorFormFieldClick;
                break;
            case 'customers':
                return onCustomerFormFieldClick;
                break;
            default:
                return () => undefined;
                break;
        }
    };

    const getSearchBarGAEvent = (): {
        enterEvent: GA_EVENT_NAME;
        clearEvent: GA_EVENT_NAME;
    } => {
        const moduleName = modelName as ModelNameProps;
        const enterEvent = getEventModel(
            moduleName,
            'CLICK_SEARCH_ENTER' as GA_EVENT_NAME
        );
        const clearEvent = getEventModel(
            moduleName,
            'CLICK_SEARCH_CROSS_BTN' as GA_EVENT_NAME
        );

        return {
            enterEvent,
            clearEvent
        };
    };

    const getTablePaginationGAEvent = (): {
        rowsPerPageEvent: GA_EVENT_NAME;
        changePageEvent: GA_EVENT_NAME;
    } => {
        const moduleName = modelName as ModelNameProps;
        const rowsPerPageEvent = getEventModel(
            moduleName,
            'CLICK_ROWS_PER_PAGE_BTN' as GA_EVENT_NAME
        );
        const changePageEvent = getEventModel(
            moduleName,
            'CLICK_PAGE_NAVIGATION_ARROW_BTN' as GA_EVENT_NAME
        );

        return {
            rowsPerPageEvent,
            changePageEvent
        };
    };

    const getColumnModifierGAEvent = (): {
        openEvent: GA_EVENT_NAME;
        changeEvent: GA_EVENT_NAME;
    } => {
        const moduleName = modelName as ModelNameProps;
        const openEvent = getEventModel(
            moduleName,
            'CLICK_TABLE_COLUMN_MODIFIER_BTN' as GA_EVENT_NAME
        );
        const changeEvent = getEventModel(
            moduleName,
            'SUBMIT_TABLE_COLUMN_MODIFIER_BTN' as GA_EVENT_NAME
        );

        return {
            openEvent,
            changeEvent
        };
    };

    const getCheckBoxGaEvent = (): GA_EVENT_NAME => {
        const moduleName = modelName as ModelNameProps;
        const checkboxEvent = getEventModel(
            moduleName,
            'CLICK_TABLE_CHECK_BOX' as GA_EVENT_NAME
        );
        return checkboxEvent;
    };

    const selectAllGaEvent = React.useMemo(() => {
        const moduleName = modelName as ModelNameProps;
        const selectAllGaEvent = getEventModel(
            moduleName,
            'CLICK_SELECT_ALL_BTN' as GA_EVENT_NAME
        );

        return selectAllGaEvent;
    }, [modelName]);

    const deSelectAllGaEvent = React.useMemo(() => {
        const moduleName = modelName as ModelNameProps;
        const deSelectAllGaEvent = getEventModel(
            moduleName,
            'CLICK_DESELECT_ALL_BTN' as GA_EVENT_NAME
        );

        return deSelectAllGaEvent;
    }, [modelName]);

    const exportGaEvent = React.useMemo(() => {
        const moduleName = modelName as ModelNameProps;
        const exportGaEvent = getEventModel(
            moduleName,
            'CLICK_EXPORT_BTN' as GA_EVENT_NAME
        );

        return exportGaEvent;
    }, [modelName]);

    const getPageViewGaEvent = React.useCallback((): {
        pageViewEvent: GA_EVENT_NAME;
        pageName: string;
    } => {
        const moduleName = modelName as ModelNameProps;
        const pageViewEvent = getEventModel(
            moduleName,
            'VIEW_MODULE_LANDING_PAGE' as GA_EVENT_NAME
        );

        const pageName = getModulePageName(moduleName);

        return { pageViewEvent, pageName };
    }, [modelName]);

    // To be refactored later
    const onColumnSearchBoxClick = (column: string) => {
        const moduleName = modelName;
        const columnName = DataUtils.toSnake(column);
        let eventName: GA_EVENT_NAME = '' as GA_EVENT_NAME;

        switch (moduleName) {
            case 'searchResults':
                eventName =
                    `click_jq_search_results_table_${columnName}_search_box` as JQ_SEARCH_RESULTS_EVENT;
                break;
            case 'cvs':
                eventName =
                    `click_cv_search_table_${columnName}_search_box` as CV_EVENT;
                break;
            default:
                break;
        }

        captureGaEvent(eventName);
    };

    const getColumnActionGaEvent = (column: string) => {
        const moduleName = modelName;
        const clickIconEvent = getColumnEventModel(
            moduleName,
            column,
            COLUMN_EVENT.CLICK_COLUMN_ACTION_ICON
        );

        const applyEvent = getColumnEventModel(
            moduleName,
            column,
            COLUMN_EVENT.CLICK_COLUMN_ACTION_APPLY_BTN
        );
        const cancelEvent = getColumnEventModel(
            moduleName,
            column,
            COLUMN_EVENT.CLICK_COLUMN_ACTION_CANCEL_BTN
        );

        return { clickIconEvent, applyEvent, cancelEvent };
    };

    const getFilterColumnGaEvent = (column: string) => {
        const getFilterCheckBoxEvent = (filter: string) =>
            getColumnEventModel(
                modelName,
                column,
                COLUMN_EVENT.CLICK_FILTER_CHECK_BOX,
                filter
            );
        const filterClearEvent = getColumnEventModel(
            modelName,
            column,
            COLUMN_EVENT.CLICK_FILTER_CLEAR_BTN
        );
        const filterSearchFieldEvent = getColumnEventModel(
            modelName,
            column,
            COLUMN_EVENT.CLICK_FILTER_SEARCH_FIELD
        );
        const filterSelectAllEvent = getColumnEventModel(
            modelName,
            column,
            COLUMN_EVENT.CLICK_FILTER_SELECT_ALL_BTN
        );
        const filterDeselectAllEvent = getColumnEventModel(
            modelName,
            column,
            COLUMN_EVENT.CLICK_FILTER_DESELECT_ALL_BTN
        );
        return {
            getFilterCheckBoxEvent,
            filterClearEvent,
            filterSearchFieldEvent,
            filterSelectAllEvent,
            filterDeselectAllEvent
        };
    };

    const getRangeFilterColumnGaEvent = (column: string) => {
        const minFieldEvent = getColumnEventModel(
            modelName,
            column,
            COLUMN_EVENT.CLICK_RANGE_MIN_FIELD
        );
        const maxFieldEvent = getColumnEventModel(
            modelName,
            column,
            COLUMN_EVENT.CLICK_RANGE_MAX_FIELD
        );
        const blankCheckboxEvent = getColumnEventModel(
            modelName,
            column,
            COLUMN_EVENT.CLICK_RANGE_BLANK_CHECK_BOX
        );
        return {
            minFieldEvent,
            maxFieldEvent,
            blankCheckboxEvent
        };
    };

    const getSortTypeGaEvent = (column: string) => {
        const moduleName = modelName;
        const columnName = DataUtils.toSnake(column);
        let ascEvent: GA_EVENT_NAME = '' as GA_EVENT_NAME;
        let dscEvent: GA_EVENT_NAME = '' as GA_EVENT_NAME;

        switch (moduleName) {
            case 'searchResults':
                ascEvent =
                    `click_jq_search_results_table_${columnName}_sort_asc_btn` as JQ_SEARCH_RESULTS_EVENT;
                dscEvent =
                    `click_jq_search_results_table_${columnName}_sort_asc_btn` as JQ_SEARCH_RESULTS_EVENT;
                break;
            case 'shortlisted':
                ascEvent =
                    `click_jq_shortlisted_tab_table_${columnName}_sort_asc_btn` as JQ_SHORTLISTED_EVENT;
                dscEvent =
                    `click_jq_shortlisted_tab_table_${columnName}_sort_dsc_btn` as JQ_SHORTLISTED_EVENT;
                break;
            case 'interestedWorkers':
                ascEvent =
                    `click_jq_interested_tab_table_${columnName}_sort_asc_btn` as JQ_INTERESTED_EVENT;
                dscEvent =
                    `click_jq_interested_tab_table_${columnName}_sort_dsc_btn` as JQ_INTERESTED_EVENT;
                break;
            case 'qualifiedWorkers':
                ascEvent =
                    `click_jq_qualified_tab_table_${columnName}_sort_asc_btn` as JQ_QUALIFIED_EVENT;
                dscEvent =
                    `click_jq_qualified_tab_table_${columnName}_sort_dsc_btn` as JQ_QUALIFIED_EVENT;
                break;
            case 'cvs':
                ascEvent =
                    `click_cv_search_table_${columnName}_sort_asc_btn` as CV_EVENT;
                dscEvent =
                    `click_cv_search_table_${columnName}_sort_asc_btn` as CV_EVENT;
                break;
            case 'onboarding-docs-details':
                ascEvent =
                    `click_onboarding_docs_details_table_${columnName}_sort_asc_btn` as CV_EVENT;
                dscEvent =
                    `click_onboarding_docs_details_table_${columnName}_sort_dsc_btn` as CV_EVENT;
                break;
            case 'workers':
                ascEvent =
                    `click_leads_table_${columnName}_sort_asc_btn` as CV_EVENT;
                dscEvent =
                    `click_leads_table_${columnName}_sort_dsc_btn` as CV_EVENT;
                break;
            case 'workspaceCandidates':
                ascEvent =
                    `click_leads_table_${columnName}_sort_asc_btn` as CV_EVENT;
                dscEvent =
                    `click_leads_table_${columnName}_sort_dsc_btn` as CV_EVENT;
                break;
            default:
                break;
        }

        return { ascEvent, dscEvent };
    };

    const onViewDetailsBtnClick = () => {
        const moduleName = modelName;
        let eventName: GA_EVENT_NAME = '' as GA_EVENT_NAME;

        switch (moduleName) {
            case 'searchResults':
                eventName =
                    JQ_SEARCH_RESULTS_EVENT.CLICK_JQ_SEARCH_RESULTS_VIEW_DETAILS_BTN;
                break;
            case 'shortlisted':
                eventName =
                    JQ_SHORTLISTED_EVENT.CLICK_JQ_SHORTLISTED_TAB_JQ_VIEW_DETAILS_BTN;
                break;
            case 'interestedWorkers':
                eventName =
                    JQ_INTERESTED_EVENT.CLICK_JQ_INTERESTED_TAB_JQ_VIEW_DETAILS_BTN;
                break;
            case 'qualifiedWorkers':
                eventName =
                    JQ_QUALIFIED_EVENT.CLICK_JQ_QUALIFIED_TAB_JQ_VIEW_DETAILS_BTN;
                break;
            default:
                break;
        }

        captureGaEvent(eventName);
    };

    const moveToQualifiedGaEvent = React.useMemo(() => {
        const moduleName = modelName;
        let moveToQualifiedGaEvent: GA_EVENT_NAME = '' as GA_EVENT_NAME;

        switch (moduleName) {
            case 'shortlisted':
                moveToQualifiedGaEvent =
                    JQ_SHORTLISTED_EVENT.CLICK_JQ_SHORTLISTED_TAB_MOVE_TO_QUALIFIED_BTN;
                break;
            case 'interestedWorkers':
                moveToQualifiedGaEvent =
                    JQ_INTERESTED_EVENT.CLICK_JQ_INTERESTED_TAB_MOVE_TO_QUALIFIED_BTN;
                break;
            default:
                break;
        }

        return moveToQualifiedGaEvent;
    }, [modelName]);

    const getJQApplicationLinkEvents = (
        isModal: boolean | undefined
    ): {
        applicationLinkClickEvent: GA_EVENT_NAME;
        applicationLinkCopyEvent: GA_EVENT_NAME;
        facebookLinkClickEvent: GA_EVENT_NAME;
        whatsappLinkClickEvent: GA_EVENT_NAME;
        linkedinLinkClickEvent: GA_EVENT_NAME;
    } => {
        const moduleName = modelName as ModelNameProps;
        const hasAddQueryParam = new URLSearchParams(location.search).has(
            'add'
        );

        let applicationLinkClickEvent: GA_EVENT_NAME =
            JQ_SUMMARY_EVENT.CLICK_APPLICATION_LINK;
        let applicationLinkCopyEvent: GA_EVENT_NAME =
            JQ_SUMMARY_EVENT.CLICK_COPY_LINK_BTN;
        let facebookLinkClickEvent: GA_EVENT_NAME =
            JQ_SUMMARY_EVENT.CLICK_FACEBOOK_BTN;
        let whatsappLinkClickEvent: GA_EVENT_NAME =
            JQ_SUMMARY_EVENT.CLICK_WHATSAPP_BTN;
        let linkedinLinkClickEvent: GA_EVENT_NAME =
            JQ_SUMMARY_EVENT.CLICK_LINKEDIN_BTN;

        if (hasAddQueryParam) {
            applicationLinkClickEvent = JQ_FORM_EVENT.CLICK_APPLICATION_LINK;
            applicationLinkCopyEvent = JQ_FORM_EVENT.CLICK_COPY_LINK_BTN;
            facebookLinkClickEvent = JQ_FORM_EVENT.CLICK_FACEBOOK_BTN;
            whatsappLinkClickEvent = JQ_FORM_EVENT.CLICK_WHATSAPP_BTN;
            linkedinLinkClickEvent = JQ_FORM_EVENT.CLICK_LINKEDIN_BTN;
        }

        if (isModal) {
            applicationLinkClickEvent = getEventModel(
                moduleName,
                'CLICK_MODAL_APPLICATION_LINK' as GA_EVENT_NAME
            );
            applicationLinkCopyEvent = getEventModel(
                moduleName,
                'CLICK_MODAL_COPY_LINK_BTN' as GA_EVENT_NAME
            );
            facebookLinkClickEvent = getEventModel(
                moduleName,
                'CLICK_MODAL_FACEBOOK_BTN' as GA_EVENT_NAME
            );
            whatsappLinkClickEvent = getEventModel(
                moduleName,
                'CLICK_MODAL_WHATSAPP_BTN' as GA_EVENT_NAME
            );
            linkedinLinkClickEvent = getEventModel(
                moduleName,
                'CLICK_MODAL_LINKEDIN_BTN' as GA_EVENT_NAME
            );
        }

        return {
            applicationLinkClickEvent,
            applicationLinkCopyEvent,
            facebookLinkClickEvent,
            whatsappLinkClickEvent,
            linkedinLinkClickEvent
        };
    };

    const getKebabMenuEvent = React.useCallback(
        (elementId?: string): GA_EVENT_NAME => {
            let kebabMenuEvent: GA_EVENT_NAME = '' as GA_EVENT_NAME;

            switch (elementId) {
                case 'job-query':
                    kebabMenuEvent = JQ_SUMMARY_EVENT.CLICK_JQ_CARD_KEBAB_BTN;
                    break;
                case 'form-template':
                    kebabMenuEvent =
                        WORKSPACE_EVENT.CLICK_WORKSPACE_DETAILS_FORMTEMPLATE_KEBAB_MENU_BTN;
                    break;
                case 'vendor':
                    kebabMenuEvent =
                        WORKSPACE_EVENT.CLICK_WORKSPACE_DETAILS_VENDOR_KEBAB_MENU_BTN;
                    break;
                case 'recruiter':
                    kebabMenuEvent =
                        WORKSPACE_EVENT.CLICK_WORKSPACE_DETAILS_RECRUITER_KEBAB_MENU_BTN;
                    break;
                default:
                    break;
            }

            return kebabMenuEvent;
        },
        []
    );

    const getJQModalSectionClickGaEvent = (
        section: JQ_MODAL_SECTION,
        isDisabled: boolean
    ) => {
        const moduleName = modelName as ModelNameProps;
        const eventName = getEventModel(
            moduleName,
            jqModalSectionEventMap[section][
                isDisabled ? 'disabled' : 'enabled'
            ] as GA_EVENT_NAME
        );
        return eventName;
    };

    const jqModalCloseGaEvent = React.useMemo(() => {
        const moduleName = modelName;
        let eventName = '' as GA_EVENT_NAME;
        switch (moduleName) {
            case 'job-query':
                eventName = JQ_SUMMARY_EVENT.CLICK_JQ_SUMMARY_MODAL_CLOSE_BTN;
                break;
            case 'searchResults':
                eventName =
                    JQ_SEARCH_RESULTS_EVENT.CLICK_JQ_SEARCH_RESULTS_MODAL_CLOSE_BTN;
                break;
            case 'shortlisted':
                eventName =
                    JQ_SHORTLISTED_EVENT.CLICK_JQ_SHORTLISTED_TAB_CLOSE_JQ_MODAL_BTN;
                break;
            case 'interestedWorkers':
                eventName =
                    JQ_INTERESTED_EVENT.CLICK_JQ_INTERESTED_TAB_CLOSE_JQ_MODAL_BTN;
                break;
            case 'qualifiedWorkers':
                eventName =
                    JQ_QUALIFIED_EVENT.CLICK_JQ_QUALIFIED_TAB_CLOSE_JQ_MODAL_BTN;
                break;
            default:
                break;
        }
        return eventName;
    }, [modelName]);

    const getJQSummaryCountClickGaEvent = (title: string, isModal: boolean) => {
        const moduleName = modelName;
        let eventName = '' as GA_EVENT_NAME;
        if (moduleName !== 'job-query') return eventName;

        switch (title) {
            case 'Shortlisted':
                eventName = isModal
                    ? JQ_SUMMARY_EVENT.CLICK_JQ_SUMMARY_MODAL_SHORTLISTED_LINK
                    : JQ_SUMMARY_EVENT.CLICK_JQ_CARD_SHORTLISTED_LINK;
                break;
            case 'Interested':
                eventName = isModal
                    ? JQ_SUMMARY_EVENT.CLICK_JQ_SUMMARY_MODAL_INTERESTED_LINK
                    : JQ_SUMMARY_EVENT.CLICK_JQ_CARD_INTERESTED_LINK;
                break;
            case 'Qualified':
                eventName = isModal
                    ? JQ_SUMMARY_EVENT.CLICK_JQ_SUMMARY_MODAL_QUALIFIED_LINK
                    : JQ_SUMMARY_EVENT.CLICK_JQ_CARD_QUALIFIED_LINK;
                break;
            default:
                break;
        }
        return eventName;
    };

    const jqMoveToQualifiedEvent = React.useMemo(() => {
        const moduleName = modelName as ModelNameProps;
        const cancelEvent = getEventModel(
            moduleName,
            'CLICK_MOVE_TO_QUALIFIED_DIALOG_CANCEL_BTN' as GA_EVENT_NAME
        );
        const submitEvent = getEventModel(
            moduleName,
            'CLICK_MOVE_TO_QUALIFIED_DIALOG_SUBMIT_BTN' as GA_EVENT_NAME
        );
        return {
            cancelEvent,
            submitEvent
        };
    }, [modelName]);

    const getJQMoveToQualifiedProfileFieldGaEvent = (field: string) => {
        const fieldName = DataUtils.toSnake(field);
        return `click_jq_move_to_qualified_profile_form_${fieldName}_field` as GA_EVENT_NAME;
    };

    const getJQMoveToQualifiedQualificationFieldGaEvent = (
        fieldType: string
    ) => {
        const fieldTypeName = DataUtils.toSnake(fieldType);
        return `click_jq_move_to_qualified_qualification_form_${fieldTypeName}_field` as GA_EVENT_NAME;
    };

    const getJQCallingStatusGaEvent = React.useCallback(
        (status: JOB_QUERY_COMMENT_STATUS) => {
            const statusName = DataUtils.toSnake(status);
            if (modelName in modelNameToTableMap) {
                const tableName =
                    modelNameToTableMap[
                        modelName as keyof typeof modelNameToTableMap
                    ];
                return `click_${tableName}_table_calling_status_${statusName}_option` as GA_EVENT_NAME;
            }
            return '' as GA_EVENT_NAME;
        },
        [modelName]
    );

    const captureGaScroll = React.useCallback(
        (
            element: string | HTMLDivElement | null,
            eventName: GA_EVENT_NAME,
            scrollArea: string
        ) => {
            const elem =
                typeof element === 'string'
                    ? document.getElementById(element)
                    : element;
            const moduleName = modelName;

            const handleScroll = () => {
                if (elem && elem.scrollTop > 0) {
                    GaUtils.captureGaEvent(eventName, gaEventParams);
                    GaUtils.captureGaScroll(
                        moduleName,
                        scrollArea,
                        gaEventParams
                    );
                }
            };

            return { elem, handleScroll };
        },
        [gaEventParams, modelName]
    );

    const leadChooseModalCloseGaEvent = React.useMemo(() => {
        const moduleName = modelName as ModelNameProps;
        return getEventModel(
            moduleName,
            'CLICK_NEW_LEADS_MODAL_CLOSE_BTN' as GA_EVENT_NAME
        );
    }, [modelName]);

    const getLeadChooseModalGaEvent = (id: LeadChooseModalOptionId) => {
        const moduleName = modelName as ModelNameProps;
        return getEventModel(
            moduleName,
            newLeadModalEventMap[id] as GA_EVENT_NAME
        );
    };

    const commentGaEvent = React.useMemo(() => {
        const moduleName = modelName as ModelNameProps;
        const popoverOpenEvent = getEventModel(
            moduleName,
            'CLICK_COMMENT_POPOVER_OPEN_BTN' as GA_EVENT_NAME
        );
        const popoverCloseEvent = getEventModel(
            moduleName,
            'CLICK_COMMENT_POPOVER_CLOSE_BTN' as GA_EVENT_NAME
        );
        const textAreaExpandEvent = getEventModel(
            moduleName,
            'CLICK_COMMENT_POPOVER_TEXTAREA_EXPAND_BTN' as GA_EVENT_NAME
        );
        const textAreaCollapseEvent = getEventModel(
            moduleName,
            'CLICK_COMMENT_POPOVER_TEXTAREA_COLLAPSE_BTN' as GA_EVENT_NAME
        );
        const textAreaSubmitEvent = getEventModel(
            moduleName,
            'SUBMIT_COMMENT_POPOVER_TEXTAREA' as GA_EVENT_NAME
        );
        const scrollEvent = getEventModel(
            moduleName,
            'SCROLL_COMMENT_POPOVER_COMMENTS' as GA_EVENT_NAME
        );
        const scrollArea = `${getModulePageName(moduleName)} Comments`;
        return {
            popoverOpenEvent,
            popoverCloseEvent,
            textAreaExpandEvent,
            textAreaCollapseEvent,
            textAreaSubmitEvent,
            scrollEvent,
            scrollArea
        };
    }, [modelName]);

    return {
        selectAllGaEvent,
        deSelectAllGaEvent,
        exportGaEvent,
        moveToQualifiedGaEvent,
        jqModalCloseGaEvent,
        jqMoveToQualifiedEvent,
        leadChooseModalCloseGaEvent,
        captureGaEvent,
        captureGaPageView,
        onPersonnelFormFieldClick,
        onVendorFormFieldClick,
        onCustomerFormFieldClick,
        onLeadFormFieldClick,
        onJQCreateDetailsFormFieldClick,
        onReferralCampaignFormFieldClick,
        getSecondaryPOCClickHandler,
        getSearchBarGAEvent,
        getTablePaginationGAEvent,
        getColumnModifierGAEvent,
        getCheckBoxGaEvent,
        getPageViewGaEvent,
        getJQApplicationLinkEvents,
        getKebabMenuEvent,
        getJQModalSectionClickGaEvent,
        getJQSummaryCountClickGaEvent,
        getJQMoveToQualifiedProfileFieldGaEvent,
        getJQMoveToQualifiedQualificationFieldGaEvent,
        getJQCallingStatusGaEvent,
        captureGaScroll,
        onColumnSearchBoxClick,
        getColumnActionGaEvent,
        getFilterColumnGaEvent,
        getRangeFilterColumnGaEvent,
        getSortTypeGaEvent,
        onViewDetailsBtnClick,
        getLeadChooseModalGaEvent,
        onCandidateCustomFieldsFormFieldClick,
        onFormTemplateFormFieldClick,
        onJoiningFormFieldClick,
        commentGaEvent
    };
};
