import React from 'react';

interface sentTextProps {
    textMessage: string;
}

interface sentToNumberProps {
    mobileNumber: number | string;
}
interface sentTextToNumberProps {
    mobileNumber: number;
    textMessage: string;
}

export const useWhatsapp = () => {
    const url = `https://wa.me/`;

    const sendText = React.useCallback(
        ({ textMessage }: sentTextProps) => {
            const sendUrl = new URL(url);
            sendUrl.searchParams.set('text', textMessage);
            return sendUrl.toString();
        },
        [url]
    );
    const sendToNumber = React.useCallback(
        ({ mobileNumber }: sentToNumberProps) => {
            return `${url}${mobileNumber}`;
        },
        [url]
    );
    const sendTextToNumber = React.useCallback(
        ({ mobileNumber, textMessage }: sentTextToNumberProps) => {
            const sendUrl = new URL(`${url}${mobileNumber}`);
            sendUrl.searchParams.set('text', textMessage);
            return sendUrl.toString();
        },
        [url]
    );

    return {
        sendText,
        sendTextToNumber,
        sendToNumber
    };
};
