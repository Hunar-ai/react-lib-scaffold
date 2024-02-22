import {
    searchShortlist as shortlistedWorkers,
    searchInterested as interestedWorkers,
    searchQualified as qualifiedWorkers
} from 'api/jobQuery';
import {
    searchInterviewScheduled as interviewLeads,
    searchInterviewerSharedLeads as interviewerSharedLeads
} from 'api/interviewScheduling';
import { search as searchWorkers } from 'api/worker';
import {
    exportWorkspaceCandidates as workspaceCandidates,
    exportCandidates as candidates
} from 'api/workspace';
import { search as searchDocuments } from 'api/document';
import { type TableFilters } from 'hooks';
import { useApiExport } from 'hooks/apiHooks';

interface Params {
    [key: string]: string | undefined;
}

interface Props {
    exportTableId: string;
    params: Params;
    filters?: TableFilters;
    body?: any;
}

interface ExportTableApi {
    [key: string]: any; // TODO: type this(ApiClient)
}

const exportApis: ExportTableApi = {
    searchWorkers,
    shortlistedWorkers,
    interestedWorkers,
    qualifiedWorkers,
    interviewLeads,
    interviewerSharedLeads,
    workspaceCandidates,
    candidates,
    searchDocuments
};

export const useExportWrapper = ({
    exportTableId,
    params,
    filters,
    body
}: Props) => {
    const apiClient = exportApis[exportTableId];
    const exportMutation = useApiExport({ apiClient, params, filters, body });

    const exportTable = (
        data: string,
        fileName: string,
        headers?: string[]
    ) => {
        if (!data) {
            return;
        }

        let formattedCSVdata = '';
        if (Array.isArray(headers)) {
            const newLineIndex = data.indexOf('\n');
            const headersLine = headers.join(',');
            formattedCSVdata =
                headersLine + '\n' + data.substring(newLineIndex + 1);
        }

        const blob = new Blob([formattedCSVdata], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    };

    const exportTableWithSubheader = (
        data: string,
        fileName: string,
        headers?: string[],
        subheaders?: string
    ) => {
        if (!data) {
            return;
        }
        let formattedCSVdata = '';
        if (Array.isArray(headers)) {
            const newLineIndex = data.indexOf('\n');
            const headersLine = headers.join(',');
            formattedCSVdata =
                headersLine +
                '\n' +
                subheaders +
                '\n' +
                data.substring(newLineIndex + 1);
        }

        const blob = new Blob([formattedCSVdata], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    };

    return { exportMutation, exportTable, exportTableWithSubheader };
};
