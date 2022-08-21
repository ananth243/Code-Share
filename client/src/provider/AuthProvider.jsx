import React, { createContext, useContext, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
const AuthProvider = createContext();

export function useAuth() {
  return useContext(AuthProvider);
}

function decodeState(){
  const jwt = localStorage.getItem('jwt');
  if(jwt){
    if(isExpired(jwt)) localStorage.removeItem('jwt')
    else return decodeToken(jwt);
  }
  return null;
}

export default function AuthState({ children }) {
  const [auth, setAuth] = useState(decodeState());
  return (
    <AuthProvider.Provider value={{ auth, setAuth }}>
      {children}
    </AuthProvider.Provider>
  );
}
