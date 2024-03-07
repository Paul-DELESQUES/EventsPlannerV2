import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = user !== null;

  const logout = async () => {
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
          { withCredentials: true }
        );
        setUser(response.data);
        if (response.data && typeof response.data === "string") {
          const decodedToken = jwtDecode(response.data);
          const { firstname, lastname } = decodedToken;
          setUser((prevState) => ({ ...prevState, firstname, lastname }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const contextValue = useMemo(
    () => ({ user, setUser, isAuthenticated, isLoading, logout }),
    [user, setUser, isAuthenticated, isLoading, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
