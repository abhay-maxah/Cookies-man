import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (!storedExpirationDate) {
    return 0;
  }

  const expirationTime = new Date(storedExpirationDate).getTime();
  const now = new Date().getTime();

  const duration = expirationTime - now;
  return duration ;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const tokenDurations = getTokenDuration();
  if (tokenDurations < 0) {
    return "EXPIRED";
  }
  return token;
}
export function tokenLoader() {     
  return getAuthToken();
}

export function checkAuth() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null
}
