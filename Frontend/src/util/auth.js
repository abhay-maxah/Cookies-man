import { redirect } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

export const  getUserId = () => {
  const token = localStorage.getItem('authToken');
  console.log(token)
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id; // Make sure your JWT payload contains userId
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

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
// export async function loader() {
//   const token = localStorage.getItem("token");
//   console.log(token)
//   return token;
// }


export function checkAuth() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null
}
