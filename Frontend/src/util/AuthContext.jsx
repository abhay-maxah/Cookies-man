import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Get token from localStorage instead of useLoaderData
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  useEffect(() => {
    console.log("Auth Token Updated:", token);
  }, [token]);

  // Function to update the token after login
  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  // Function to clear the token after logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
