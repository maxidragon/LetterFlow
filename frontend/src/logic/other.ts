export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatArrayToQuery = (array: any[], queryName: string) => {
  let query = "";
  for (let i = 0; i < array.length; i++) {
    query += `${queryName}=${array[i]}&`;
  }
  return query;
};

export const calculateTotalPages = (count: number, perPage: number): number => {
  return Math.ceil(count / perPage);
};

export const formatSearchQuery = (
  selectedHobbies: number[],
  selectedCountries: number[],
  selectedLanguages: number[],
  selectedGender: string[],
  username: string,
  onlyWithDescription: boolean,
  page: number,
  perPage: number
) => {
  const formattedHobbies = formatArrayToQuery(selectedHobbies, "hobbies");
  const formattedCountries = formatArrayToQuery(selectedCountries, "countries");
  const formattedLanguages = formatArrayToQuery(selectedLanguages, "languages");
  const formattedGender = formatArrayToQuery(selectedGender, "gender");

  let query = "";
  if (username !== "") {
    query += `username=${username}&`;
  }
  if (formattedHobbies) {
    query += formattedHobbies;
  }
  if (formattedCountries) {
    query += formattedCountries;
  }
  if (formattedLanguages) {
    query += formattedLanguages;
  }
  if (formattedGender) {
    query += formattedGender;
  }
  query += `description=${onlyWithDescription}`;
  if (page !== 1) {
    const skip = (page - 1) * perPage;
    query += `&skip=${skip}`;
  }
  query += `&take=${perPage}`;
  return query;
};
