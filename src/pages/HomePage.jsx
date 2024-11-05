import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pizzaImage from "../assets/fotos/foto-de-fondo.jpg"; // Ruta de la imagen de fondo
import Footer from "../components/Footer"; // Asegúrate de importar Footer

const HomePage = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/menu");
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
        <h3 className="text-center mb-4">Galería de Pizzas</h3>
        <Row>
          <Col md={4} className="mb-4">
            <img
              src="ruta-a-imagen-1.jpg"
              alt="Pizza 1"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={4} className="mb-4">
            <img
              src="ruta-a-imagen-2.jpg"
              alt="Pizza 2"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={4} className="mb-4">
            <img
              src="ruta-a-imagen-3.jpg"
              alt="Pizza 3"
              className="img-fluid rounded"
            />
          </Col>
          {/* Agrega más columnas según sea necesario */}
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
