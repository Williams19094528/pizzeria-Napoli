import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer mt-5 py-3">
      <Container>
        <Row>
          <Col md={3}>
            <h3 className="footer-brand">Pizzería Napoli</h3>
          </Col>
          <Col md={3}>
            <h5 className="footer-section-title">CONÓCENOS</h5>
            <ul className="list-unstyled">
              <li>Despacho</li>
              <li>Información Legal</li>
              <li>Términos y Condiciones de Uso</li>
              <li>Política de Privacidad</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="footer-section-title">REDES SOCIALES</h5>
            <ul className="list-unstyled">
              <li>Instagram</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="footer-section-title">MI CUENTA</h5>
            <ul className="list-unstyled">
              <li>Pedir</li>
              <li>Mis pedidos</li>
              <li>Mis direcciones</li>
            </ul>
          </Col>
        </Row>
        <div className="text-center mt-4 footer-powered">
          <p>
            Powered by <span className="footer-branding">JUSTE</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
