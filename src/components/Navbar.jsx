import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Pizzería Napoli
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/menu">
              Menú
            </Nav.Link>
            <Nav.Link as={Link} to="/local-despacho">
              Local y Despacho
            </Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos">
              Quiénes Somos
            </Nav.Link>
          </Nav>
          <Button
            variant="outline-light"
            as={Link}
            to="/login"
            className="me-2"
          >
            Iniciar sesión
          </Button>
          <Button variant="warning" as={Link} to="/register">
            Registrarse
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
