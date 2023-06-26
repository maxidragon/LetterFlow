import { backendRequest } from "./request";

export const getProfile = async (userId: number) => {
    const response = await backendRequest(`user/profile/${userId}`, 'GET', true);
    if (response.status === 200) {
        return await response.json();
    }
    return null;
};