import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Cart from "../components/Cart";
import ProductModal from "../components/ProductModal";




//test



// Definición de productos
/*
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
*/




const MenuPage = () => {

  const fetchProducts = async () => {
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/productos");
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    fetchProducts().then((data) => {
      console.log(data);
      setProducts(data);
    });
  }, []);
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
 
  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="page-container">
      <div className="menu-container">
        {/* Pizzas Napolitanas */}
        <div className="menu-section">
          <h2>Menu Productos</h2>
          <div className="menu-items">
            {products.map((pizza) => (
              <div
                key={pizza.id}
                className="menu-item"
                onClick={() => openModal(pizza)}
              >
                <img
                  src={pizza.picture_url}
                  alt={pizza.nombre}
                  className="menu-item-image"
                />
                <div className="menu-item-text">
                  <h3>{pizza.nombre}</h3>
                  <p>{pizza.detalle}</p>
                  <div className="price-add">
                    <span>${pizza.precio.toLocaleString("es-CL")}</span>
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
