import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext"; // Importa el contexto
import Cart from "../components/Cart";
import ProductModal from "../components/ProductModal";
import anticaDiavolaImage from "../assets/fotos/diavola.jpg";
import capricciosaImage from "../assets/fotos/Capricciosa.jpg";

const pizzasClasicas = [
  {
    id: 1,
    name: "Antica Diavola",
    description:
      "Pomodoro Ciao, Spianata romana, Mozzarella fior di latte, Provola Affumicata...",
    price: 11990,
    image: anticaDiavolaImage,
  },
  {
    id: 2,
    name: "Capricciosa",
    description:
      "Pomodoro Ciao, mozzarella fior di latte, aceitunas, jamón cocido, setas...",
    price: 13900,
    image: capricciosaImage,
  },
];

const MenuPage = () => {
  const { cartItems, addToCart } = useContext(AppContext); // Usa el contexto para el carrito
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="page-container">
      <div className="menu-section">
        <h2>Pizza Clásicas</h2>
        <div className="menu-items">
          {pizzasClasicas.map((pizza) => (
            <div
              key={pizza.id}
              className="menu-item"
              onClick={() => openModal(pizza)}
            >
              <div className="menu-item-content">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="menu-item-image"
                />
                <div className="menu-item-text">
                  <h3>{pizza.name}</h3>
                  <p>{pizza.description}</p>
                  <div className="price-add">
                    <span>${pizza.price.toLocaleString("es-CL")}</span>
                    <button
                      className="add-to-cart-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ ...pizza, quantity: 1 }); // Usa el contexto para agregar al carrito
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-section">
        <Cart cartItems={cartItems} /> {/* Usa el carrito global */}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          addToCart={addToCart} // Usa el contexto para agregar al carrito desde el modal
        />
      )}
    </div>
  );
};

export default MenuPage;
