import React from "react";

const PizzaCard = ({ pizza, onAddToCart }) => {
  return (
    <div className="menu-item" onClick={() => onAddToCart(pizza)}>
      <div className="menu-item-content">
        <img src={pizza.image} alt={pizza.name} className="menu-item-image" />
        <div className="menu-item-text">
          <h3>{pizza.name}</h3>
          <p>{pizza.description}</p>
          <div className="price-add">
            <span>${pizza.price.toLocaleString("es-CL")}</span>
            <button
              className="add-to-cart-button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart({ ...pizza, quantity: 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
