import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    }
  }, [isAuthenticated, user, navigate]);

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

    setLoading(true);

    login(email, password).then((success) => {
      setLoading(false);
      if (!success) {
        toast.error("Credenciales incorrectas o usuario sin permisos", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    });
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
