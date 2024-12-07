import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const CreatePostForm = ({ addPost }) => {

  const [productos, setProductos] = useState({});

  const createProduct = async (product) => {
    const producto = {
      partnumber: product.partnumber,
      nombre: product.nombre,
      detalle: product.detalle,
      precio: product.precio,
      picture_url: product.picture_url,
    };
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/admin/crearProducto",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        
        },
        body: JSON.stringify(producto)
        });
      return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!productos.partnumber || !productos.nombre || !productos.detalle || !productos.precio) {
      toast.error("Todos los campos excepto la foto son obligatorios");
      return;
    }

    createProduct(productos).then((success) => {
      console.log(success);
      if (success.status === 201) {
        toast.success("Producto creado exitosamente", {
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


    // Resetear los campos
    setProductos({});
  };
    
  return (
    <Form onSubmit={handleSubmit}>
      <h4>Crear Producto</h4>

      <Form.Group controlId="formproductPartNumber">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          value={productos.partnumber}
          onChange={(e) => setProductos({...productos, partnumber: e.target.value})}
          //placeholder="Nombre del Producto"
          required // Campo obligatorio
        />
      </Form.Group>

      <Form.Group controlId="formProductName">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          value={productos.nombre}
          onChange={(e) => setProductos({...productos, nombre: e.target.value})}
          //placeholder="Nombre del Producto"
          required // Campo obligatorio
        />
      </Form.Group>

      <Form.Group controlId="formDetalleProducto">
        <Form.Label>Detalle del Producto</Form.Label>
        <Form.Control
          as="textarea"
          value={productos.detalle}
          onChange={(e) => setProductos({...productos, detalle: e.target.value})}
          //placeholder="Nombre del Producto"
          required // Campo obligatorio
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          value={productos.precio}
          onChange={(e) => setProductos({...productos, precio: e.target.value})}
          placeholder="Precio del Producto"
          required // Campo obligatorio
        />
      </Form.Group>

      <Form.Group controlId="formPhoto">
        <Form.Label>Foto del Producto (opcional)</Form.Label>
        <Form.Control
          type="url"
          onChange={(e) => setProductos({...productos, picture_url: e.target.value})}
          placeholder="URL de la foto del producto"
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3" >
        Publicar
      </Button>
    </Form>
  );
};

export default CreatePostForm;
