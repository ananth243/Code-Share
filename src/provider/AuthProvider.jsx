import React, { createContext, useContext, useState } from "react";
import { auth as firebaseAuth } from "../config/Firebase";
const AuthProvider = createContext();

export function useAuth() {
  return useContext(AuthProvider);
}

export default function AuthState({ children }) {
  const [auth, setAuth] = useState(null);
  firebaseAuth.onAuthStateChanged((user) => {
    if(user) setAuth(user);
    else setAuth(null);
  });
  return (
    <AuthProvider.Provider value={{ auth, setAuth }}>
      {children}
    </AuthProvider.Provider>
  );
}
