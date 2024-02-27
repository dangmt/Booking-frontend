import React, { createContext, useState, useContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  userRole: null,
  isLoggedIn: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    const decodedUser = jwt_decode(token);
    console.log(decodedUser.roles[0]);
    localStorage.setItem("userId", decodedUser.sub);
    localStorage.setItem("userRole", decodedUser.roles[0]);
    localStorage.setItem("token", token);
    setIsLoggedIn(token);
    setUserRole(decodedUser.roles[0]);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, isLoggedIn, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
