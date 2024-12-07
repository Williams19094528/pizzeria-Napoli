import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import CreatePostForm from "../components/CreatePostForm";
import {
  FaUserEdit,
  FaUserPlus,
  FaClipboardList,
  FaSignOutAlt,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const { user, logout, setUser } = useContext(AppContext);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [profileAvatar, setProfileAvatar] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [productos, setProductos] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/productos");
    const data = await response.json();
    return data;
  };
  const deleteProduct = async (id) => {
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/productos/"+id,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        
        },
    });
    const data = await response.json();
    return data;
  };
  const getProduct = async (partNumber) => {
    const response = await fetch("https://hito-3-desafio-final-g65.onrender.com/api/producto/"+partNumber);
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    fetchProducts().then((data) => {
      console.log(data);
      setProductos(data);
    });
  }, []);

  const handleCreatePost = () => {
    setShowCreatePost(true);
    setShowEditProfile(false);
    setShowAddAdmin(false);
    setShowMyPosts(false);
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
    setShowCreatePost(false);
    setShowAddAdmin(false);
    setShowMyPosts(false);
  };

  const handleAddAdmin = () => {
    setShowAddAdmin(true);
    setShowCreatePost(false);
    setShowEditProfile(false);
    setShowMyPosts(false);
  };

  const handleMyPosts = () => {
    setShowMyPosts(true);
    setShowCreatePost(false);
    setShowEditProfile(false);
    setShowAddAdmin(false);
  };

  const addPost = (newPost) => {
    const postWithDate = {
      ...newPost,
      date: new Date().toLocaleDateString(),
    };
    setPosts([...posts, postWithDate]);
    toast.success("Publicación creada exitosamente");
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    toast.info("Publicación eliminada");
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!profileName || !profileEmail) {
      toast.error("Nombre y correo son obligatorios");
      return;
    }
    // Actualiza la información del usuario en el contexto
    const updatedUser = {
      ...user,
      name: profileName,
      email: profileEmail,
      avatar: profileAvatar,
    };
    setUser(updatedUser);
    toast.success("Cambios guardados exitosamente");
  };

  const handleAddAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error(
        "Correo y contraseña son obligatorios para agregar un administrador"
      );
      return;
    }
    toast.success("Admin agregado exitosamente");
    setAdminEmail("");
    setAdminPassword("");
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setProfileAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3} className="sidebar">
          {/* Perfil del Usuario en la Barra Lateral */}
          <Card className="text-center mb-4">
            {profileAvatar ? (
              <Card.Img
                variant="top"
                src={profileAvatar}
                alt="Foto de perfil"
                className="rounded-circle mt-3"
                style={{ width: "300px", height: "300px", margin: "0 auto" }}
              />
            ) : (
              <FaUserCircle
                size={100}
                className="mt-3 text-secondary mx-auto"
              />
            )}
            <Card.Body>
              <Card.Title>{profileName || "Nombre del Usuario"}</Card.Title>
              <Card.Text>{profileEmail || user?.email}</Card.Text>
            </Card.Body>
          </Card>

          <ul>
            <li>
              <Button
                variant="outline-primary"
                className="w-100 my-2"
                onClick={handleEditProfile}
              >
                <FaUserEdit /> Editar Perfil
              </Button>
            </li>
            <li>
              <Button
                variant="outline-success"
                className="w-100 my-2"
                onClick={handleAddAdmin}
              >
                <FaUserPlus /> Agregar Usuario Admin
              </Button>
            </li>
            <li>
              <Button
                variant="outline-warning"
                className="w-100 my-2"
                onClick={handleCreatePost}
              >
                <FaPlusCircle /> Crear Publicación
              </Button>
            </li>
            <li>
              <Button
                variant="outline-info"
                className="w-100 my-2"
                onClick={handleMyPosts}
              >
                <FaClipboardList /> Mis Publicaciones
              </Button>
            </li>
            <li>
              <Button
                variant="outline-danger"
                className="w-100 my-2"
                onClick={logout}
              >
                <FaSignOutAlt /> Cerrar Sesión
              </Button>
            </li>
          </ul>
        </Col>
        <Col md={9}>
          <ToastContainer />
          {showCreatePost && <CreatePostForm addPost={addPost} />}

          {/* Formulario de Editar Perfil */}
          {showEditProfile && (
            <Form onSubmit={handleProfileSubmit}>
              <h4>Editar Perfil</h4>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhoto">
                <Form.Label>Foto de Perfil (opcional)</Form.Label>
                <Form.Control type="file" onChange={handleAvatarChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Guardar cambios
              </Button>
            </Form>
          )}

          {/* Formulario para Agregar Admin */}
          {showAddAdmin && (
            <Form onSubmit={handleAddAdminSubmit}>
              <h4>Agregar Usuario Admin</h4>
              <Form.Group controlId="formAdminEmail">
                <Form.Label>Email del nuevo admin</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAdminPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhoto">
                <Form.Label>Foto de Perfil (opcional)</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Agregar Admin
              </Button>
            </Form>
          )}

          {/* Sección de Productos */}
          {showMyPosts && (
            <div>
              <h4>Productos</h4>
              <Row>
                {productos.length > 0 ? (
                  productos.map((prod, index) => (
                    <Col md={4} className="mb-4" key={index}>
                      <Card>
                        {prod.id && (
                          <Card.Img variant="top" src={prod.picture_url} alt="Imagen del producto" />

                        )}
                        <Card.Body>
                          <Card.Title>{prod.partnumber}</Card.Title>
                          <Card.Text>{prod.nombre}</Card.Text>
                          <Card.Text>{prod.detalle}</Card.Text>
                          <Card.Text>
                            <strong>Precio: </strong>${(prod.precio).toLocaleString("es-CL")}
                          </Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => getProduct(prod.partnumber)}
                          >
                            Editar Producto
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>No tienes Productos en Menu.</p>
                )}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
