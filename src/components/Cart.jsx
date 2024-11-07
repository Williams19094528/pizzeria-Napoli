import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, setCartItems }) => {
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      // Redirige a la página de inicio de sesión con la ruta de origen '/cart'
      navigate("/login", { state: { from: "/cart" } });
    }
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString("es-CL");

  return (
    <div className="cart">
      <h3>Tu Carrito ({cartItems.length} productos)</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>${item.price.toLocaleString("es-CL")}</p>
              <div className="quantity">{/* Ajuste de cantidad */}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>Subtotal:</span>
        <strong>${total}</strong>
      </div>
      <button className="checkout-button" onClick={handleContinue}>
        {isAuthenticated ? "Continuar" : "Iniciar sesión para comprar"}
      </button>
    </div>
  );
};

export default Cart;
