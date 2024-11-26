import React, { createContext, useState, useEffect } from "react";
import api from "../api"; // Importa la configuración de Axios

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      // Realiza la solicitud al backend
      const response = await api.post("/login", { email, password }); // Ajusta "/login" según la ruta del backend
      const { user, token } = response.data; // Ajusta según la estructura de tu backend

      // Guarda el usuario y el token en localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Actualiza el estado global
      setUser(user);
      setIsAuthenticated(true);

      return true; // Inicio de sesión exitoso
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false; // Credenciales incorrectas
    }
  };


  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Limpia el token
    setCartItems([]); // Limpia el carrito
  };

  // Función para actualizar los datos del usuario
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

 

  // Función para agregar productos al carrito
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

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Función para disminuir la cantidad de un producto en el carrito
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

  // Cargar el estado inicial desde localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (savedUser && token) {
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
