import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ROLES } from "../utils/roles";

function Navegacion({ sesion, onCerrarSesion }) {
  const navigate = useNavigate();
  const esAdmin = sesion?.rol === ROLES.ADMINISTRADOR;
  const esTrabajador = sesion?.rol === ROLES.TRABAJADOR;
  const puedeComprar = !sesion || sesion.rol === ROLES.CLIENTE;

  function salir() {
    onCerrarSesion();
    navigate("/");
  }

  return (
    <Navbar expand="md" bg="light" data-bs-theme="light" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">🎸 SONIDO VIVO</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-md-center">
            <Nav.Link as={NavLink} to="/" end>Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            {puedeComprar && <Nav.Link as={NavLink} to="/carrito">🛒 Carrito</Nav.Link>}
            {esAdmin && <Nav.Link as={NavLink} to="/admin">⚙️ Panel administrador</Nav.Link>}
            {esTrabajador && <Nav.Link as={NavLink} to="/trabajador">🧰 Panel trabajador</Nav.Link>}

            {sesion ? (
              <NavDropdown title={sesion.email} id="menu-usuario" align="end">
                <NavDropdown.ItemText className="small text-secondary">{sesion.rol}</NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={salir}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
