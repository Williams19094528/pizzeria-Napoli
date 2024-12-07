import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser, logout } = useContext(AppContext);

  const [photo, setPhoto] = useState(null);
  const [editing, setEditing] = useState(false);
  const [viewingOrders, setViewingOrders] = useState(false); // Nuevo estado para ver el historial de pedidos
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const updateUserProfile = async () => {
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/updateUserProfile",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      body: JSON.stringify(userProfile)
    });
    return response;
  };

  const getUserProfile = async () => {
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/userProfile",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json();
    return data;
  };

  const verMisPedidos = async () => {
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/pedidos",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        
        },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    verMisPedidos().then((data) => {
      console.log(data);
      setOrders(data);
    });
    getUserProfile().then((data) => {
      console.log(data);
      console.log(data.nombre);
      setUserProfile(data);
      console.log(`nombre: ${userProfile.nombre}`);
    });
  }, []);


  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateUserProfile().then((success) => {
      console.log(success);
      if (success.status === 200) {
        toast.success("Cambios guardados exitosamente", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error(`Error: ${success}`, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }).catch((error) => {
      toast.error(`Error: ${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
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
              <Card.Title>{userProfile.nombre +"  " + userProfile.apellido || "Nombre del Usuario"}</Card.Title>
              <Card.Text>{user.username || "usuario@ejemplo.com"}</Card.Text>
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
                  value={userProfile.nombre}
                  onChange={(e) => setUserProfile({...userProfile, nombre: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="formApellido" className="mt-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  value={userProfile.apellido}
                  onChange={(e) => setUserProfile({...userProfile, apellido: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Direccion"
                  value={userProfile.direccion}
                  onChange={(e) => setUserProfile({...userProfile, direccion: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="formTelefono" className="mt-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telefono"
                  value={userProfile.telefono}
                  onChange={(e) => setUserProfile({...userProfile, telefono: e.target.value})}
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
                  {orders.map((purchase, index) => (
                    <div key={index} className="mb-2 p-2 border-bottom">
                      <strong>Pedido #{purchase.id}</strong>
                      <p>Fecha: {new Date(purchase.fecha_hora).toLocaleString("es-CL")}</p>
                      <p>Total: ${(purchase.total).toLocaleString("es-CL")}</p>
                      <p>Delivery: {purchase.delivery? "Si" : "No"}</p>
                      <p>Tipo de pago: {purchase.tipo_pago}</p>
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
