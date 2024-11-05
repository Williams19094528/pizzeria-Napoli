import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  // Redirigir si `user` es null o undefined
  if (!user) {
    return <p>Por favor, inicia sesión para editar tu perfil.</p>;
  }

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({
      ...user,
      name,
      email,
      avatar: photo ? URL.createObjectURL(photo) : user.avatar,
    });

    toast.success("Perfil actualizado con éxito", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Editar Perfil</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoto">
          <Form.Label>Subir Foto de Perfil</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar cambios
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default EditProfile;
