export function getToken() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  return token;
}
