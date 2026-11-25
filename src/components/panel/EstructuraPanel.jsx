import { useState } from "react";
import { Button, Col, Container, Nav, Offcanvas, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

// Estructura común de los paneles de trabajador y administrador:
// menú lateral (Offcanvas en pantallas pequeñas) y la sección elegida a la derecha.
function EstructuraPanel({ titulo, secciones }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <Container fluid="lg">
      <Row>
        <Col md={3} lg={2} className="mb-3">
          <Button variant="outline-dark" className="d-md-none w-100" onClick={() => setMenuAbierto(true)}>
            ☰ Menú del panel
          </Button>
          <Offcanvas show={menuAbierto} onHide={() => setMenuAbierto(false)} responsive="md">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>{titulo}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-block">
              <h2 className="h6 text-uppercase text-muted d-none d-md-block mb-3">{titulo}</h2>
              <Nav variant="pills" className="flex-column gap-1">
                {secciones.map((seccion) => (
                  <Nav.Link key={seccion.ruta} as={NavLink} to={seccion.ruta} end={seccion.exacta}
                    onClick={() => setMenuAbierto(false)}>
                    {seccion.icono} {seccion.texto}
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col md={9} lg={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default EstructuraPanel;
