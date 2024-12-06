import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal"; // Importa el modal
import { AppContext } from "../context/AppContext";
import pizzaImage from "../assets/fotos/foto-de-fondo.jpg";
import Footer from "../components/Footer";



const HomePage = () => {
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
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOrderClick = () => {
    navigate("/menu");
  };

  // Función para abrir el modal
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div
        className="homepage"
        style={{ backgroundImage: `url(${pizzaImage})` }}
      >
        <Container className="homepage-overlay">
          <h1 className="homepage-title">BIENVENIDOS</h1>
          <Button onClick={handleOrderClick} className="homepage-button">
            Pedir
          </Button>
        </Container>
      </div>

      {/* Texto explicativo */}
      <Container className="mt-5 text-center">
        <h2>
          ¿Sabías que nuestro pizzaiolo nos representó en Napoli?{" "}
          <span role="img" aria-label="italian flag">
            🇮🇹
          </span>
        </h2>
        <p>
          Nuestro pizzaiolo Javier Ortega Reveco es el mejor pizzaiolo de Chile
          en la "Caputo Cup Chile 2023" y representante chileno en la "Caputo
          Cup Napoli" quedando como mejor latinoamericano y 20º en la categoría
          contemporánea.
        </p>
      </Container>

      {/* Galería de pizzas */}
      <Container className="mt-5">
        <h3 className="text-center mb-4"> Pizzas Napolitanas </h3>
        <Row>
          {products.map((pizza) => (
            <Col md={3} sm={6} key={pizza.id} className="mb-4">
              <div className="menu-item" onClick={() => openModal(pizza)}>
                <img
                  src={pizza.picture_url}
                  alt={pizza.nombre}
                  className="menu-item-image img-fluid rounded"
                />
                <div className="menu-item-text mt-2">
                  <h4>{pizza.nombre}</h4>
                  <p>{pizza.detalle}</p>
                  <div className="price-add">
                    <span>${pizza.precio.toLocaleString("es-CL")}</span>
                    <button
                      className="add-to-cart-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que se abra el modal al hacer clic en el botón
                        addToCart({ ...pizza, quantity: 1 });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal de Producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal} // Pasa la función closeModal aquí
          addToCart={addToCart}
        />
      )}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
