import { Settings } from "./interfaces";
import { backendRequest } from "./request";

export const getProfile = async (userId: number) => {
  const response = await backendRequest(`user/profile/${userId}`, "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export const searchUsers = async (query: string) => {
  const response = await backendRequest(`user/search?${query}`, "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return [];
};

export const getSettings = async () => {
  const response = await backendRequest("user/settings", "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export const updateSettings = async (data: Settings) => {
  const response = await backendRequest("user/settings", "PUT", true, data);
  const responseData = await response.json();
  return {
    status: response.status,
    data: responseData,
  };
};

export const starUser = async (userId: number) => {
  const response = await backendRequest("user/star", "POST", true, { userId });
  return response.status;
};

export const unstarUser = async (userId: number) => {
  const response = await backendRequest(
    `user/unstar/${userId}`,
    "DELETE",
    true,
  );
  return response.status;
};

export const getMyStarredUsers = async () => {
  const response = await backendRequest("user/starred", "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return [];
};
