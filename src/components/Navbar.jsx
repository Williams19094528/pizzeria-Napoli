import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavigationBar = () => {
  const { isAuthenticated, user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

          {isAuthenticated ? (
            <Nav>
              <NavDropdown
                title={user?.name || "Cuenta"}
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/cart">
                  Carro de compra
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">
                  Mis pedidos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">
                  Mi cuenta
                </NavDropdown.Item>
                {user?.role === "admin" && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <div>
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
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
