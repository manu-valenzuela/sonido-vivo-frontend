import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CampoNombreYApellido from "../components/form/CampoNombreYApellido";
import CampoRun from "../components/form/CampoRun";
import CampoRegionYComuna from "../components/form/CampoRegionYComuna";
import CampoDireccion from "../components/form/CampoDireccion";
import CampoEmail from "../components/form/CampoEmail";
import CampoContrasena from "../components/form/CampoContrasena";
import { validarRegistro } from "../utils/validarRegistro";
import { registrarCliente } from "../services/usuarioService";

const inicial = {
  nombre: "",
  apellidos: "",
  run: "",
  regionId: "",
  comunaId: "",
  direccion: "",
  email: "",
  contrasena: "",
};

function Registro() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [errorApi, setErrorApi] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarRegistro(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    setErrorApi("");
    try {
      await registrarCliente({
        ...datos,
        run: datos.run.trim().toUpperCase(),
        email: datos.email.trim(),
        regionId: Number(datos.regionId),
        comunaId: Number(datos.comunaId),
      });
      setRegistrado(true);
      setDatos(inicial);
    } catch (e) {
      setErrorApi(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="mb-4 text-center fw-bold">Registro de usuario</h2>
              {registrado && (
                <Alert variant="success">
                  Cuenta creada correctamente. Ya puedes <Link to="/login">iniciar sesión</Link>.
                </Alert>
              )}
              {errorApi && <Alert variant="danger">{errorApi}</Alert>}
              <Form onSubmit={enviar} noValidate>
                <CampoNombreYApellido datos={datos} errores={errores} onChange={cambiar} />
                <CampoRun datos={datos} errores={errores} onChange={cambiar} />
                <CampoRegionYComuna datos={datos} errores={errores} onChange={cambiar} />
                <CampoDireccion datos={datos} errores={errores} onChange={cambiar} />
                <CampoEmail datos={datos} errores={errores} onChange={cambiar} />
                <CampoContrasena datos={datos} errores={errores} onChange={cambiar} />
                <Button type="submit" className="w-100" disabled={enviando}>
                  {enviando ? "Registrando..." : "Registrarme"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registro;
