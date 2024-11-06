import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const EditProfile = () => {
  const { user, setUser } = useContext(AppContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!name || !email) {
      toast.error("Los campos de nombre y correo son obligatorios.");
      return;
    }

    // Actualiza el perfil del usuario
    setUser({
      ...user,
      name,
      email,
      avatar: photo ? URL.createObjectURL(photo) : user.avatar,
    });

    toast.success("Perfil actualizado exitosamente");

    // Limpiar el campo de foto
    setPhoto(null);
  };

  return (
    <Form onSubmit={handleSave}>
      <h4>Editar Perfil</h4>

      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa tu nombre"
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
        />
      </Form.Group>

      <Form.Group controlId="formPhoto">
        <Form.Label>Foto de Perfil (opcional)</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Guardar cambios
      </Button>
    </Form>
  );
};

export default EditProfile;
