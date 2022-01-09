export function getToken() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  return token;
}

export function getHeadersWithToken(config) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    ...config,
  };
  return headers;
}
