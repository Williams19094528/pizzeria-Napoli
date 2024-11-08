import React, { useState } from "react";

const ProductModal = ({ product, onClose, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose(); // Cierra el modal después de agregar al carrito
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <img src={product.image} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <label>Instrucciones especiales</label>
            <textarea
              placeholder="Incluye una nota"
              className="special-instructions"
            />

            <div className="modal-actions">
              <div className="quantity">
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                🛒 Agregar ${(product.price * quantity).toLocaleString("es-CL")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
