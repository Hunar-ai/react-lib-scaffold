import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { type ZipFileProps } from 'interfaces';
import { FileUtils } from 'utils';

interface DownloadFromUrlProps {
    downloadUrl: string;
    downloadName: string;
    onDownload: () => void;
}

interface DownloadZipFromUrlProps {
    zipMap: ZipFileProps[];
    zipName: string;
}

interface DownloadSingleFileFromBlobProps {
    blob: Blob;
    fileName: string;
}

interface DownloadZipFromBlobProps {
    zipMap: DownloadSingleFileFromBlobProps[];
    zipName: string;
}

export const useDownload = () => {
    const downloadZipFromUrl = async ({
        zipMap,
        zipName
    }: DownloadZipFromUrlProps) => {
        const zip = new JSZip();
        try {
            const remoteZips = zipMap.map(async datum => {
                const response = await fetch(datum.url);
                const data = await response.blob();
                return data;
            });
            const remoteBlobs = await Promise.all(remoteZips);
            zipMap.map((datum, i) => zip.file(datum.fileName, remoteBlobs[i]));
            const content = await zip.generateAsync({ type: 'blob' });
            await saveAs(content, zipName);
        } catch (e: unknown) {
            throw new Error(`Download of ${zipName} failed`);
        }
    };

    const downloadMultipleZipsFromUrl = async (
        zipMapList: DownloadZipFromUrlProps[]
    ) => {
        const zip = new JSZip();
        let downloadedZipCount = 0;

        for (const datum of zipMapList) {
            try {
                downloadedZipCount = downloadedZipCount + 1;
                const { zipMap, zipName } = datum;
                const remoteZips = [];
                for (const { url } of zipMap) {
                    const response = await fetch(url);
                    const data = await response.blob();
                    remoteZips.push(data);
                }
                const remoteBlobs = await Promise.all(remoteZips);
                zipMap.map((datum, i) =>
                    zip.file(datum.fileName, remoteBlobs[i])
                );
                const content = await zip.generateAsync({
                    type: 'blob'
                });
                await saveAs(content, zipName);
            } catch (e) {
                downloadedZipCount = downloadedZipCount - 1;
            }
        }
        if (downloadedZipCount < zipMapList.length) {
            throw new Error(
                `Only ${downloadedZipCount} file (s) could be downloaded`
            );
        }
    };

    const downloadZipFromBlob = async ({
        zipMap,
        zipName
    }: DownloadZipFromBlobProps) => {
        try {
            const zip = new JSZip();
            const remoteZips = zipMap.map(async datum => {
                if (datum.blob) {
                    zip.file(datum.fileName, datum.blob);
                }
            });
            await Promise.all(remoteZips);
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, zipName);
        } catch (e: unknown) {
            throw new Error(`Download of ${zipName} failed`);
        }
    };

    const downloadSingleFileFromBlob = ({
        blob,
        fileName
    }: DownloadSingleFileFromBlobProps) => {
        try {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        } catch (e) {
            throw new Error(`Download of ${fileName} failed`);
        }
    };

    const downloadFromUrl = ({
        downloadName,
        downloadUrl,
        onDownload
    }: DownloadFromUrlProps) => {
        FileUtils.fetchBlobfromUrl(downloadUrl)
            .then(blob => {
                downloadSingleFileFromBlob({
                    blob,
                    fileName: downloadName
                });
                onDownload();
            })
            .catch(() => {
                throw new Error(`Download of ${downloadName} failed`);
            });
    };

    return {
        downloadFromUrl,
        downloadMultipleZipsFromUrl,
        downloadZipFromUrl,
        downloadZipFromBlob,
        downloadSingleFileFromBlob
    };
};
