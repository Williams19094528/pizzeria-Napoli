import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const CreatePostForm = ({ addPost }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!productName || !description || !price) {
      toast.error("Todos los campos excepto la foto son obligatorios");
      return;
    }

    const newPost = {
      productName,
      description,
      price,
      photo,
    };

    addPost(newPost); // Llama a la función para agregar la publicación en AdminPage
    toast.success("Publicación realizada exitosamente");

    // Resetear los campos
    setProductName("");
    setDescription("");
    setPrice("");
    setPhoto(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Crear Publicación</h4>

      <Form.Group controlId="formProductName">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nombre del Producto"
          required // Campo obligatorio
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Descripción del Producto</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del Producto"
          required // Campo obligatorio
        />
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Precio del Producto"
          required // Campo obligatorio
        />
      </Form.Group>

      <Form.Group controlId="formPhoto">
        <Form.Label>Carga de Foto (opcional)</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Publicar
      </Button>
    </Form>
  );
};

export default CreatePostForm;
