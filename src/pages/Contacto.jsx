import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import CampoNombreYApellido from "../components/form/CampoNombreYApellido";
import CampoEmail from "../components/form/CampoEmail";
import CampoMensaje from "../components/form/CampoMensaje";
import { validarContacto } from "../utils/validarContacto";
import { enviarMensaje } from "../services/contactoService";

const inicial = { nombre: "", apellidos: "", email: "", mensaje: "" };

function Contacto() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [errorApi, setErrorApi] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarContacto(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    setErrorApi("");
    setEnviado(false);
    try {
      await enviarMensaje({ ...datos, email: datos.email.trim() });
      setEnviado(true);
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
              <h2 className="mb-4 text-center fw-bold">Formulario de contacto</h2>
              {enviado && <Alert variant="success">Mensaje enviado. Te responderemos a la brevedad.</Alert>}
              {errorApi && <Alert variant="danger">{errorApi}</Alert>}
              <Form onSubmit={enviar} noValidate>
                <CampoNombreYApellido datos={datos} errores={errores} onChange={cambiar} />
                <CampoEmail datos={datos} errores={errores} onChange={cambiar} />
                <CampoMensaje datos={datos} errores={errores} onChange={cambiar} />
                <Button type="submit" className="w-100" disabled={enviando}>
                  {enviando ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
