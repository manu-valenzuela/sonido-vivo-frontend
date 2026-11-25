import { Form } from "react-bootstrap";

function CampoContrasena({ datos, errores, onChange }) {
  return (
    <Form.Group className="mb-3" controlId="contrasena">
      <Form.Label>Contraseña:</Form.Label>
      <Form.Control
        type="password"
        name="contrasena"
        value={datos.contrasena || ""}
        onChange={onChange}
        isInvalid={Boolean(errores.contrasena)}
      />
      <Form.Control.Feedback type="invalid">{errores.contrasena}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoContrasena;
