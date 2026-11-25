import { useState } from "react";
import { Badge, Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import ModalConfirmacion from "../../components/comunes/ModalConfirmacion";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { listarUsuarios, cambiarEstadoUsuario } from "../../services/usuarioService";
import { ROLES } from "../../utils/roles";

function coincide(usuario, texto) {
  const busqueda = texto.trim().toLowerCase();
  return !busqueda || [usuario.nombre, usuario.apellidos, usuario.email, usuario.run]
    .some((valor) => valor?.toLowerCase().includes(busqueda));
}

// El trabajador solo consulta; el administrador además crea, edita y activa o desactiva cuentas
function GestionUsuarios({ base, esAdmin = false, emailSesion }) {
  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState("");
  const [porCambiar, setPorCambiar] = useState(null);
  const { datos, cargando, error, recargar } = useCargaApi(listarUsuarios);
  const accion = useAccionApi();
  const usuarios = (datos ?? []).filter((u) => coincide(u, busqueda) && (!rol || u.rol === rol));

  async function confirmarCambioEstado() {
    const activo = !porCambiar.activo;
    const listo = await accion.ejecutar(() => cambiarEstadoUsuario(porCambiar.id, activo),
      `La cuenta de ${porCambiar.email} quedó ${activo ? "activa" : "desactivada"}.`);
    setPorCambiar(null);
    if (listo) recargar();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h1 className="h3 fw-bold mb-0">Usuarios</h1>
        {esAdmin && <Button as={Link} to={`${base}/usuarios/nuevo`}>➕ Nuevo usuario</Button>}
      </div>
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
      <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
      <EstadoCarga cargando={cargando} error={error} vacio={usuarios.length === 0} mensajeVacio="No hay usuarios que coincidan.">
        <Table responsive hover className="align-middle">
          <thead>
            <tr><th>Nombre</th><th>RUN</th><th>Email</th><th>Comuna</th><th>Rol</th><th>Estado</th>{esAdmin && <th></th>}</tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre} {usuario.apellidos}</td>
                <td>{usuario.run}</td>
                <td>{usuario.email}</td>
                <td>{usuario.comunaNombre}</td>
                <td><Badge bg="dark">{usuario.rol}</Badge></td>
                <td><Badge bg={usuario.activo ? "success" : "secondary"}>{usuario.activo ? "Activo" : "Inactivo"}</Badge></td>
                {esAdmin && (
                  <td className="text-nowrap">
                    <Button as={Link} to={`${base}/usuarios/${usuario.id}/editar`} size="sm" variant="primary" className="me-1">Editar</Button>
                    {usuario.email !== emailSesion && (
                      <Button size="sm" variant={usuario.activo ? "outline-danger" : "outline-success"}
                        onClick={() => setPorCambiar(usuario)}>
                        {usuario.activo ? "Desactivar" : "Activar"}
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </EstadoCarga>
      <ModalConfirmacion mostrar={Boolean(porCambiar)}
        titulo={porCambiar?.activo ? "Desactivar cuenta" : "Activar cuenta"}
        mensaje={porCambiar?.activo
          ? `${porCambiar?.email} no podrá iniciar sesión mientras su cuenta esté desactivada.`
          : `${porCambiar?.email} podrá volver a iniciar sesión.`}
        textoConfirmar={porCambiar?.activo ? "Desactivar" : "Activar"}
        variante={porCambiar?.activo ? "danger" : "success"} procesando={accion.procesando}
        onConfirmar={confirmarCambioEstado} onCancelar={() => setPorCambiar(null)} />
    </>
  );
}

export default GestionUsuarios;
