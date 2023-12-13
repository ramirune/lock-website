export function setCookie(name, value) {
  return (document.cookie = `${name}=${value}; max-age=300`);
}

export function getCookie() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "authToken") {
      return value;
    }
  }
  return null;
}

export function clearCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}
