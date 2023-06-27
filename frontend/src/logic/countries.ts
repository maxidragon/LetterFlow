import {backendRequest, countriesAPIRequest} from "./request";

export const getCountryInfo = async (name: string) => {
    const response = await countriesAPIRequest(name);
    if (response.status === 200) {
        const data = await response.json();
        return data[0];
    }
    return null;
};

export const getCountryId = async (name: string) => {
    const response = await backendRequest(`country/id/${name}`, 'GET', true);
    if (response.status === 200) {
        const data = await response.json();
        return data.id;
    }
    return null;
};