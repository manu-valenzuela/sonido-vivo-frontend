import { useState } from "react";
import { Badge, Col, Form, Row, Table } from "react-bootstrap";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import useCargaApi from "../../hooks/useCargaApi";
import { listarUsuarios } from "../../services/usuarioService";
import { ROLES } from "../../utils/roles";

function coincide(usuario, texto) {
  const busqueda = texto.trim().toLowerCase();
  return !busqueda || [usuario.nombre, usuario.apellidos, usuario.email, usuario.run]
    .some((valor) => valor?.toLowerCase().includes(busqueda));
}

function GestionUsuarios() {
  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState("");
  const { datos, cargando, error } = useCargaApi(listarUsuarios);
  const usuarios = (datos ?? []).filter((u) => coincide(u, busqueda) && (!rol || u.rol === rol));

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Usuarios</h1>
      <Row className="g-2 mb-3">
        <Col md={6}>
          <Form.Control type="search" placeholder="Buscar por nombre, email o RUN" aria-label="Buscar usuario"
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Select aria-label="Filtrar por rol" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="">Todos los roles</option>
            {Object.values(ROLES).map((r) => <option key={r} value={r}>{r}</option>)}
          </Form.Select>
        </Col>
      </Row>
      <EstadoCarga cargando={cargando} error={error} vacio={usuarios.length === 0} mensajeVacio="No hay usuarios que coincidan.">
        <Table responsive hover className="align-middle">
          <thead><tr><th>Nombre</th><th>RUN</th><th>Email</th><th>Comuna</th><th>Rol</th><th>Estado</th></tr></thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre} {usuario.apellidos}</td>
                <td>{usuario.run}</td>
                <td>{usuario.email}</td>
                <td>{usuario.comunaNombre}</td>
                <td><Badge bg="dark">{usuario.rol}</Badge></td>
                <td><Badge bg={usuario.activo ? "success" : "secondary"}>{usuario.activo ? "Activo" : "Inactivo"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EstadoCarga>
    </>
  );
}

export default GestionUsuarios;
