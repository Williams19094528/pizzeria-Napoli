import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";




const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    isAuthenticated,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/cart" } });
    }
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.precio * item.quantity, 0)
    .toLocaleString("es-CL");

  return (
    <div className="cart-section">
      <h3>Tu Carrito ({cartItems.length} productos)</h3>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.picture_url} alt={item.nombre} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.nombre}</h4>
              <p>${item.precio.toLocaleString("es-CL")}</p>
              <div className="cart-item-quantity">
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
            <span className="cart-item-price">
              ${(item.precio * item.quantity).toLocaleString("es-CL")}
            </span>
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
