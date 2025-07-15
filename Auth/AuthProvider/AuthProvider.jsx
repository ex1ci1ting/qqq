import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem("reactCardLogin" || false));
  const [isAuth, setIsAuth] = useState(isLogin);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
