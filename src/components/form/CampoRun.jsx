import { Form } from "react-bootstrap";

function CampoRun({ datos, errores, onChange }) {
  return (
    <Form.Group className="mb-3" controlId="run">
      <Form.Label>RUN:</Form.Label>
      <Form.Control
        type="text"
        name="run"
        placeholder="12345678K"
        value={datos.run || ""}
        onChange={onChange}
        isInvalid={Boolean(errores.run)}
      />
      <Form.Text muted>Sin puntos ni guion.</Form.Text>
      <Form.Control.Feedback type="invalid">{errores.run}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoRun;
