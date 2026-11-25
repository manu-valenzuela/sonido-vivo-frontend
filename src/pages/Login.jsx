import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CampoEmail from "../components/form/CampoEmail";
import CampoContrasena from "../components/form/CampoContrasena";
import { validarLogin } from "../utils/validarLogin";
import { rutaInicioPorRol } from "../utils/roles";

const inicial = { email: "", contrasena: "" };

function Login({ onIniciarSesion }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [errorApi, setErrorApi] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const ubicacion = useLocation();

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarLogin(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    setErrorApi("");
    try {
      const usuario = await onIniciarSesion({ email: datos.email.trim(), contrasena: datos.contrasena });
      navigate(ubicacion.state?.desde ?? rutaInicioPorRol(usuario.rol), { replace: true });
    } catch (e) {
      setErrorApi(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="mb-4 text-center fw-bold">Iniciar sesión</h2>
              {errorApi && <Alert variant="danger">{errorApi}</Alert>}
              <Form onSubmit={enviar} noValidate>
                <CampoEmail datos={datos} errores={errores} onChange={cambiar} />
                <CampoContrasena datos={datos} errores={errores} onChange={cambiar} />
                <Button type="submit" className="w-100" disabled={enviando}>
                  {enviando ? "Ingresando..." : "Ingresar"}
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0 small">
                ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
