import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null); // Estado para la foto de perfil
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Debes completar todos los campos para registrarte", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }

    const newUser = { email, password, role: "user", avatar };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    toast.success("Registro exitoso", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      onClose: () => navigate("/profile"),
    });
  };

  return (
    <div className="container mt-5">
      <h1>Registrarse</h1>
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

        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>Foto de Perfil (opcional)</Form.Label>
          <Form.Control type="file" onChange={handleAvatarChange} />
          {avatar && (
            <div className="mt-3">
              <img
                src={avatar}
                alt="Avatar Preview"
                className="rounded-circle"
                width="100"
                height="100"
              />
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
        <ToastContainer />
      </Form>
    </div>
  );
};

export default RegisterPage;
