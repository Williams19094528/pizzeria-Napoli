import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
    setCartItems([]); // Limpia el carrito al cerrar sesión
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
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
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
