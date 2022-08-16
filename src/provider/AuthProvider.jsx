import React, { createContext, useContext, useState } from "react";

const AuthProvider = createContext();

export function useAuth() {
  return useContext(AuthProvider);
}

export default function AuthState({ children }) {
  const [auth, setAuth] = useState(false);
  return (
    <AuthProvider.Provider value={{ auth, setAuth }}>
      {children}
    </AuthProvider.Provider>
  );
}
