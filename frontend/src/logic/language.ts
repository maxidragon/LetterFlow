import { backendRequest } from "./request";

export const getMyLanguages = async () => {
    const response = await backendRequest('language/my', 'GET', true);
    if (response.status === 200) {
        return await response.json();
    }
    return [];
};

export const addLanguage = async (languageId: number, level: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE') => {
    const response = await backendRequest('language/add', 'POST', true, {
        languageId: languageId,
        level: level,
    });
    return response.status;
};

export const removeLanguage = async (languageId: number) => {
    const response = await backendRequest(`language/delete/${languageId}`, 'DELETE', true);
    return response.status;
};

export const updateLanguage = async (languageId: number, level: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE') => {
    const response = await backendRequest('language/update', 'PUT', true, {
        languageId: languageId,
        level: level,
    });
    return response.status;
};