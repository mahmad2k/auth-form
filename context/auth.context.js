import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useContext, useMemo, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const isAuthenticated = useMemo(() => Boolean(token), [token]);

  async function authenticate(token) {
    setToken(token);
    await AsyncStorage.setItem("token", token);
  }

  async function logout() {
    setToken(null);
    await AsyncStorage.removeItem("token");
  }

  const value = {
    token,
    isAuthenticated,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
