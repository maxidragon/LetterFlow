import { backendRequest } from "./request";

export const getMyHobbies = async () => {
  const response = await backendRequest("hobby/my", "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return [];
};

export const addHobby = async (id: number) => {
  const response = await backendRequest(`hobby/add/${id}`, "GET", true);
  return response.status;
};

export const removeHobby = async (id: number) => {
  const response = await backendRequest(`hobby/remove/${id}`, "DELETE", true);
  return response.status;
};
