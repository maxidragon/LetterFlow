import {backendRequest} from "./request";

export const getMyConversations = async () => {
    const response = await backendRequest("letter/my", "GET", true);
    if (response.status === 200) {
        return response.json();
    }
    return [];
};

export const getLettersFromConversations = async (receiverId: number) => {
    const response = await backendRequest("letter/all/" + receiverId, "GET", true);
    if (response.status === 200) {
        return await response.json();
    }
    return [];
};

export const sendLetter = async (receiverId: number, content: string) => {
    const response = await backendRequest("letter/send", "POST", true, {
        receiverId,
        content
    });
    return response.status;
};

export const getLetterById = async (letterId: string | undefined) => {
    const response = await backendRequest("letter/one/" + letterId, "GET", true);
    if (response.status === 200) {
        return await response.json();
    }
    return null;
}