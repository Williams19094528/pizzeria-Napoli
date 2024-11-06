import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    return new Promise((resolve) => {
      if (email === "camacarow7@gmail.com" && password === "1234") {
        const adminUser = { email, role: "admin" };
        setUser(adminUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(adminUser));
        resolve(true);
      } else {
        const regularUser = { email, role: "user" };
        setUser(regularUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(regularUser));
        resolve(true);
      }
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Nueva función para actualizar el usuario
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
