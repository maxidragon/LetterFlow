import { backendRequest } from "./request";

export const getAllCountries = async () => {
  const response = await backendRequest("country/all", "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return [];
};

export const getAllHobbies = async () => {
  const response = await backendRequest("hobby/all", "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return [];
};

export const getAllLanguages = async () => {
  const response = await backendRequest("language/all", "GET", true);
  if (response.status === 200) {
    return await response.json();
  }
  return [];
};
