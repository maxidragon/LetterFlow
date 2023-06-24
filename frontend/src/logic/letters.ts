import {backendRequest} from "./request";

export const getMyConversations = async () => {
    const response = await backendRequest("letter/my", "GET", true);
    if (response.status === 200) {
        return response.json();
    }
    return [];
};