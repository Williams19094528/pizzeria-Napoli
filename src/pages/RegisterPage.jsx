import React, { useState, useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error(
        "Debes completar los campos de email y contraseña para registrarte",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        }
      );
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

    setLoading(true); // Inicia la carga

    // Simulación de un proceso de registro con retraso (por ejemplo, llamada a API)
    setTimeout(() => {
      // Actualizar el estado global con los datos del usuario registrado
      setUser({
        name: "Usuario Registrado",
        email,
        avatar: photo ? URL.createObjectURL(photo) : null,
        activities: ["Pedido #1", "Pedido #2", "Pedido #3"], // Simulación de actividades
      });

      // Mostrar mensaje de registro exitoso y redirigir al perfil
      toast.success(`Registro exitoso. Bienvenido, ${email}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        onClose: () => {
          setLoading(false); // Finaliza la carga
          navigate("/profile");
        },
      });
    }, 3000); // Simula un tiempo de espera de 3 segundos
  };

  return (
    <div className="container mt-5">
      <h1>Registrarse</h1>
      {loading ? (
        <div className="d-flex justify-content-center mb-3">
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

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Foto de Perfil (opcional)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Registrarse
          </Button>
        </Form>
      )}
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
