import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser, logout } = useContext(AppContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);
  const [editing, setEditing] = useState(false);
  const [viewingOrders, setViewingOrders] = useState(false); // Nuevo estado para ver el historial de pedidos
  const navigate = useNavigate();

  // Datos simulados para el historial de compras
  const purchases = [
    { productName: "Pizza Margherita", date: "15/10/2024", price: "$11.990" },
    { productName: "Pizza Pepperoni", date: "10/10/2024", price: "$13.990" },
    { productName: "Pizza Hawaiana", date: "05/10/2024", price: "$12.990" },
  ];

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      toast.error("Los campos de nombre y correo son obligatorios", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email,
      avatar: photo ? URL.createObjectURL(photo) : user?.avatar,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditing(false);
    toast.success("Cambios guardados exitosamente", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4} className="text-center">
          <Card>
            <Card.Body>
              {photo ? (
                <Card.Img
                  variant="top"
                  src={URL.createObjectURL(photo)}
                  alt="Foto de perfil"
                  className="rounded-circle mb-3"
                  style={{ width: "300px", height: "300px" }}
                />
              ) : (
                <FaUserCircle size={150} className="text-muted mb-3" />
              )}
              <Card.Title>{name || "Nombre del Usuario"}</Card.Title>
              <Card.Text>{email || "usuario@ejemplo.com"}</Card.Text>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button variant="primary" onClick={() => setEditing(!editing)}>
                  {editing ? "Cancelar" : "Editar perfil"}
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setViewingOrders(!viewingOrders)}
                >
                  {viewingOrders ? "Volver a Perfil" : "Mis pedidos"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          {editing ? (
            <Form onSubmit={handleSaveChanges}>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPhoto" className="mt-3">
                <Form.Label>Foto de Perfil (opcional)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0] || null)}
                />
              </Form.Group>
              <Button variant="success" type="submit" className="mt-3">
                Guardar cambios
              </Button>
            </Form>
          ) : viewingOrders ? (
            <div>
              <h4 className="mt-4">Historial de Compras</h4>
              <Card>
                <Card.Body>
                  {purchases.map((purchase, index) => (
                    <div key={index} className="mb-2 p-2 border-bottom">
                      <strong>{purchase.productName}</strong>
                      <p>Fecha: {purchase.date}</p>
                      <p>Precio: {purchase.price}</p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </div>
          ) : (
            <div>
              {/* Otros detalles de perfil que no están en modo edición ni en modo de visualización de pedidos */}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
