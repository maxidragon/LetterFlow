import { backendRequest } from "./request";

export const getProfile = async (userId: number) => {
    const response = await backendRequest(`user/profile/${userId}`, 'GET', true);
    if (response.status === 200) {
        return await response.json();
    }
    return null;
};

export const searchUsers = async (query: string) => {
    const response = await backendRequest(`user/search?${query}`, 'GET', true);
    if (response.status === 200) {
        return await response.json();
    }
    return [];
};

export const getSettings = async () => {
    const response = await backendRequest('user/settings', 'GET', true);
    if (response.status === 200) {
        return await response.json();
    }
    return null;
};

export const updateSettings = async (data: any) => {
    const response = await backendRequest('user/settings', 'PUT', true, data);
    return response.status;
};