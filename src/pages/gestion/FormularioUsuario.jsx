import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CampoNombreYApellido from "../../components/form/CampoNombreYApellido";
import CampoRun from "../../components/form/CampoRun";
import CampoEmail from "../../components/form/CampoEmail";
import CampoContrasena from "../../components/form/CampoContrasena";
import CampoRegionYComuna from "../../components/form/CampoRegionYComuna";
import CampoDireccion from "../../components/form/CampoDireccion";
import CampoTexto from "../../components/form/CampoTexto";
import CampoSelect from "../../components/form/CampoSelect";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import useAccionApi from "../../hooks/useAccionApi";
import { obtenerUsuario, crearUsuario, actualizarUsuario } from "../../services/usuarioService";
import { validarUsuario } from "../../utils/validarUsuario";
import { ROLES } from "../../utils/roles";

const vacio = {
  nombre: "", apellidos: "", run: "", email: "", contrasena: "", telefono: "",
  regionId: "", comunaId: "", direccion: "", rol: ROLES.CLIENTE, activo: true,
};
const OPCIONES_ROL = Object.values(ROLES).map((rol) => ({ valor: rol, texto: rol }));

// Un único formulario para crear (sin id en la ruta) y editar (con id) usuarios
function FormularioUsuario({ base }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [errorCarga, setErrorCarga] = useState("");
  const accion = useAccionApi();

  useEffect(() => {
    if (!id) return;
    obtenerUsuario(id)
      .then((u) => setDatos({
        nombre: u.nombre, apellidos: u.apellidos, run: u.run, email: u.email, contrasena: "",
        telefono: u.telefono ?? "", regionId: String(u.regionId), comunaId: String(u.comunaId),
        direccion: u.direccion, rol: u.rol, activo: u.activo,
      }))
      .catch((e) => setErrorCarga(e.message));
  }, [id]);

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: type === "checkbox" ? checked : value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarUsuario(datos, Boolean(id));
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const cuerpo = {
      ...datos,
      run: datos.run.trim().toUpperCase(),
      email: datos.email.trim(),
      telefono: datos.telefono.trim() || null,
      contrasena: datos.contrasena || null,
      regionId: Number(datos.regionId),
      comunaId: Number(datos.comunaId),
    };
    const listo = await accion.ejecutar(() => (id ? actualizarUsuario(id, cuerpo) : crearUsuario(cuerpo)));
    if (listo) navigate(`${base}/usuarios`);
  }

  const propsCampo = { datos, errores, onChange: cambiar };

  return (
    <>
      <h1 className="h3 fw-bold mb-4">{id ? "Editar" : "Nuevo"} usuario</h1>
      <AlertaResultado error={errorCarga || accion.error} onCerrar={accion.limpiar} />
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={enviar} noValidate>
            <Row>
              <Col md={6}>
                <CampoNombreYApellido {...propsCampo} />
                <CampoRun {...propsCampo} />
                <CampoEmail {...propsCampo} />
                <CampoContrasena {...propsCampo} />
                {id && <Form.Text muted className="d-block mt-n2 mb-3">Déjala vacía para mantener la contraseña actual.</Form.Text>}
              </Col>
              <Col md={6}>
                <CampoTexto nombre="telefono" etiqueta="Teléfono (opcional):" maxLength={30} {...propsCampo} />
                <CampoRegionYComuna {...propsCampo} />
                <CampoDireccion {...propsCampo} />
                <CampoSelect nombre="rol" etiqueta="Rol:" opciones={OPCIONES_ROL} {...propsCampo} />
                <Form.Check type="switch" id="activo" name="activo" label="Cuenta activa"
                  checked={datos.activo} onChange={cambiar} className="mb-3" />
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2">
              <Button as={Link} to={`${base}/usuarios`} variant="secondary">Cancelar</Button>
              <Button type="submit" disabled={accion.procesando}>{accion.procesando ? "Guardando..." : "Guardar"}</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default FormularioUsuario;
