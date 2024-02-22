import React from 'react';

export const useLocalStorage = () => {
    const getItem = React.useCallback((key: string) => {
        const localStorageval = window.localStorage.getItem(key);
        if (localStorageval) return JSON.parse(localStorageval);
        return null;
    }, []);

    const setItem = React.useCallback(<T>(key: string, object: T): void => {
        window.localStorage.setItem(key, JSON.stringify(object));
    }, []);

    const deleteItem = (key: string): void => {
        window.localStorage.removeItem(key);
    };

    return {
        getItem,
        setItem,
        deleteItem
    };
};
