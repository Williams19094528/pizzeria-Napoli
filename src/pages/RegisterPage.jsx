import React, { useState, useContext, useRef } from "react";
import { Form, Button, Col, Row, Card, CardBody, Container, Spinner, Modal} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";


const RegistrarUsuario = async (usuario) => {

  try {
    const response = await api.post("/api/crearUsuario", usuario);
    return response;
  } catch (error) {
    return error.response.data;  
  }
};

const RegisterPage = () => {
  const [Newuser, setNewUser] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    telefono: "",
    avatar: "",
    confirmPassword: ""
  });
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (Newuser.email === "" || Newuser.password === "") {
      toast.error("Debes completar todos los campos para registrarte", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }
    if (Newuser.password !== Newuser.confirmPassword) {
      toast.error("Las contraseñas no coinciden", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      inputRef.current.focus();
      return;
    }
    const NuevoUsuario = Newuser;
    setShowModal(true);
    await RegistrarUsuario(NuevoUsuario).then((success) => {
      console.log(success);
      if (success.status === 201) {
        toast.success("Registro exitoso, serás redirigido al Home", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable:true,
          progress:undefined,
          onClose: () => navigate("/"),
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
        
    }}).catch((error) => {
      toast.error(`Error: ${error.response.data.message}`, {
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
    setShowModal(false);
};


  return (
    <div className="mb-5">
      <Container className="mt-5 mb-5">
        <Modal show={showModal} keyboard={false}>
        <Modal.Header>
          <Modal.Title>Registrando Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Spinner animation="border" variant="success" />
        </Modal.Body>
        </Modal>
        <Row className="justify-content-center">
          <Col>
          </Col>
          <Col>
            <h4>Formulario de Registro </h4>
          </Col>
          <Col>

          {/* <img src={logo} alt="logo" className="img-fluid" /> */}
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            
                  <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                      <Form.Label column sm={2}>Email</Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="email"
                          placeholder="Ingrese su email"
                          value={Newuser.email}
                          onChange={(e) => setNewUser({ ...Newuser, email: e.target.value })}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                      <Form.Label column sm={2}>Contraseña</Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="password"
                          placeholder="Ingrese su contraseña"
                          value={Newuser.password}
                          onChange={(e) => setNewUser({ ...Newuser, password: e.target.value })}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicConfirmPassword">
                      <Form.Label column sm={2}>Confirmar Contraseña</Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          ref={inputRef}
                          type="password"
                          placeholder="Confirme su contraseña"
                          value={Newuser.confirmPassword}
                          onChange={(e) => setNewUser({ ...Newuser, confirmPassword: e.target.value })}
                        />
                      </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Registrarse
                    </Button>
                    <ToastContainer />
                  </Form>
                
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <hr />
    </div>
  );
};

export default RegisterPage;


/*

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

*/
