import {countriesAPIRequest} from "./request";

export const getCountryInfo = async (name: string) => {
    const response = await countriesAPIRequest(name);
    if (response.status === 200) {
        const data = await response.json();
        return data[0];
    }
    return null;
}