import { Form } from "react-bootstrap";

function CampoMensaje({ datos, errores, onChange }) {
  return (
    <Form.Group className="mb-3" controlId="mensaje">
      <Form.Label>Mensaje:</Form.Label>
      <Form.Control
        as="textarea"
        rows={6}
        name="mensaje"
        value={datos.mensaje || ""}
        onChange={onChange}
        isInvalid={Boolean(errores.mensaje)}
      />
      <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoMensaje;
