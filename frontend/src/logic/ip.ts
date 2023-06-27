import { ipInfoAPIRequest, userIPAPIRequest } from "./request";

export const getUserIP = async () => {
    const response = await userIPAPIRequest();
    const data = await response.json();
    return data.ip;
};

export const getInfoAboutIp = async (ip: string) => {
    const response = await ipInfoAPIRequest(ip, "GET");
    const data = await response.json();
    return data;
};