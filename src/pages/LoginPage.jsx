import React, { useState, useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Debes completar todos los campos para iniciar sesión", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("El formato del correo electrónico es incorrecto", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }

    setLoading(true); // Activa la carga

    // Simulación de un proceso de inicio de sesión con retardo
    setTimeout(() => {
      setUser({
        name: "Usuario Logueado",
        email,
        avatar: null, // O null si el usuario no tiene foto cargada
        activities: ["Pedido #1", "Pedido #2"], // Simulación de actividades
      });

      toast.success(`Bienvenido, ${email}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        onClose: () => {
          setLoading(false); // Desactiva la carga
          navigate("/profile");
        },
      });
    }, 2000); // Simulación de 2 segundos de espera
  };

  return (
    <div className="container mt-5">
      <h1>Iniciar Sesión</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      )}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
