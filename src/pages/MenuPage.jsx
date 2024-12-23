import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Cart from "../components/Cart";
import ProductModal from "../components/ProductModal";
import anticaDiavolaImage from "../assets/fotos/diavola.jpg";
import capricciosaImage from "../assets/fotos/Capricciosa.jpg";
import pizzaveganaImage from "../assets/fotos/pizzavegana.jpg";
import pizzaburrataImage from "../assets/fotos/pizzaburrata.jpg";
import pizzaCriollaImage from "../assets/fotos/pizzacriolla.jpg";
import pizzaJamonSerranoImage from "../assets/fotos/pizzajamonserrano.jpg";
import pizzaPeperoniImage from "../assets/fotos/pizzapeperoni.jpg";
import pizzaQuesoTomateImage from "../assets/fotos/pizzaquesotomate.jpg";
import bebidaImage from "../assets/fotos/pepsi.jpg";

// Definición de productos
const pizzasNapolitanas = [
  {
    id: 1,
    name: "Antica Diavola",
    description: "Pomodoro Ciao, mozzarella, chorizo angus...",
    price: 13800,
    image: anticaDiavolaImage,
  },
  {
    id: 2,
    name: "Capricciosa",
    description: "Crema trufada, mozzarella, champiñón...",
    price: 14990,
    image: capricciosaImage,
  },
  {
    id: 3,
    name: "Pizza Vegana",
    description: "Tomate cherry, aceitunas, albahaca...",
    price: 8900,
    image: pizzaveganaImage,
  },
  {
    id: 4,
    name: "Pizza Burrata",
    description: "Burrata fresca con tomate cherry...",
    price: 13900,
    image: pizzaburrataImage,
  },
  {
    id: 5,
    name: "Pizza Criolla",
    description: "Mozzarella, cebolla morada, ají verde...",
    price: 13800,
    image: pizzaCriollaImage,
  },
  {
    id: 6,
    name: "Pizza Jamón Serrano",
    description: "Mozzarella y jamón serrano.",
    price: 13900,
    image: pizzaJamonSerranoImage,
  },
  {
    id: 7,
    name: "Pizza Peperoni",
    description: "Tomate, mozzarella y peperoni.",
    price: 13900,
    image: pizzaPeperoniImage,
  },
  {
    id: 8,
    name: "Pizza Queso Tomate",
    description: "Mozzarella, queso, y tomate fresco.",
    price: 13900,
    image: pizzaQuesoTomateImage,
  },
];

const bebidas = [
  {
    id: 9,
    name: "Pepsi",
    description: "Bebida refrescante.",
    price: 2000,
    image: bebidaImage,
  },
];

const MenuPage = () => {
  const { cartItems, addToCart } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="page-container">
      <div className="menu-container">
        {/* Pizzas Napolitanas */}
        <div className="menu-section">
          <h2>Pizzas Napolitanas</h2>
          <div className="menu-items">
            {pizzasNapolitanas.map((pizza) => (
              <div
                key={pizza.id}
                className="menu-item"
                onClick={() => openModal(pizza)}
              >
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
                        addToCart({ ...pizza, quantity: 1 });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bebidas */}
        <div className="menu-section">
          <h2>Bebidas</h2>
          <div className="menu-items">
            {bebidas.map((bebida) => (
              <div
                key={bebida.id}
                className="menu-item"
                onClick={() => openModal(bebida)}
              >
                <img
                  src={bebida.image}
                  alt={bebida.name}
                  className="menu-item-image"
                />
                <div className="menu-item-text">
                  <h3>{bebida.name}</h3>
                  <p>{bebida.description}</p>
                  <div className="price-add">
                    <span>${bebida.price.toLocaleString("es-CL")}</span>
                    <button
                      className="add-to-cart-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ ...bebida, quantity: 1 });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carrito */}
      <Cart cartItems={cartItems} className="cart-section" />

      {/* Modal de Producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default MenuPage;
