export const backendRequest = (
  path: string,
  method: string,
  useAuth: boolean,
  body?: any
) => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token && useAuth) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return fetch(`http://localhost:5000/${path}`, {
    method: method,
    headers: headers,
    redirect: "follow",
    body: JSON.stringify(body),
  });
};

export const countriesAPIRequest = (name: string) => {
  return fetch(`https://restcountries.com/v3.1/name/${name}`, {
    method: "GET",
    redirect: "follow",
  });
};

export const userIPAPIRequest = () => {
  return fetch(`https://api.ipify.org/?format=json`, {
    method: "GET",
    redirect: "follow",
  });
};

export const ipInfoAPIRequest = (path: string, method: string) => {
  return fetch(`http://ip-api.com/json/${path}`, {
    method: method,
    redirect: "follow",
  });
};
