import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Button, ListGroup, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.warning("Por favor, inicia sesión para ver tu perfil.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <ToastContainer />
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Por favor, inicia sesión para ver tu perfil.
        </p>
      </>
    );
  }

  const handleLogout = () => {
    setUser(null);
    toast.info("Has cerrado sesión exitosamente", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      onClose: () => navigate("/login"),
    });
  };

  return (
    <Container className="mt-5">
      <div className="d-flex flex-column align-items-center">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Foto de perfil"
            className="rounded-circle mb-3"
            width="150"
            height="150"
          />
        ) : (
          <FaUserCircle size={150} className="text-secondary mb-3" />
        )}
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {/* Botón para editar el perfil */}
        <Button as={Link} to="/edit-profile" variant="primary" className="mb-3">
          Editar perfil
        </Button>
        <Button variant="danger" onClick={handleLogout} className="mt-3">
          Salir
        </Button>
      </div>
      <h4>Historial de Actividades</h4>
      <ListGroup>
        {user.activities.map((activity, index) => (
          <ListGroup.Item key={index}>{activity}</ListGroup.Item>
        ))}
      </ListGroup>
      <ToastContainer />
    </Container>
  );
};

export default UserProfile;
