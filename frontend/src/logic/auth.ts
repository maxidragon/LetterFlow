import { getCountryId } from "./countries";
import { getInfoAboutIp, getUserIP } from "./ip";
import {backendRequest} from "./request";

export const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo === null) {
        return null;
    }
    return JSON.parse(userInfo);
}

export const registerUser = async (email: FormDataEntryValue | null, username: FormDataEntryValue | null, password: FormDataEntryValue | null, gender: FormDataEntryValue | null) => {
    try {
        const userIp = await getUserIP();
        const ipInfo = await getInfoAboutIp(userIp);
        const countryId = await getCountryId(ipInfo.country);;
        const body = {
            email: email,
            username: username,
            password: password,
            gender: gender,
            countryId: countryId,
            lat: ipInfo.lat.toString(),
            lon: ipInfo.lon.toString(),
        };
        const response = await backendRequest("auth/register", "POST", false, body);
        console.log(body);
        console.log(response);
        return response.text();
    } catch (error) {
        console.log(error);
    }
};
export const login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
        const response = await backendRequest("auth/login", "POST", false, {email: email, password: password});
        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('token', (data.token));
            localStorage.setItem('userInfo', (JSON.stringify(data.info)));
        }
        return response.status;
    } catch (error) {
        console.log(error);
    }
};
export const logout = async () => {
    await backendRequest("auth/logout", "POST", true);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
};

export const forgotPassword = async (email: string) => {
    const response = await backendRequest("auth/password/forgot", "POST", false, {email: email});
    return response.status;
};

export const resetPassword = async (resetId: string, newPassword: string) => {
    const response = await backendRequest("auth/password/reset", "POST", false, {
        tempId: resetId,
        newPassword: newPassword
    });
    return response.status;
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
    const response = await backendRequest("auth/password/change", "PUT", true, {
        oldPassword: oldPassword,
        newPassword: newPassword
    });
    return response.status;
}

export const getUserProfile = async (userId: number) => {
    try {
        const response = await backendRequest("user/profile/" + userId, "GET", true);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token !== null;
}
