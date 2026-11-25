import { Form } from "react-bootstrap";

function CampoNombreYApellido({ datos, errores, onChange }) {
  return (
    <>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={datos.nombre || ""}
          onChange={onChange}
          isInvalid={Boolean(errores.nombre)}
        />
        <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="apellidos">
        <Form.Label>Apellidos:</Form.Label>
        <Form.Control
          type="text"
          name="apellidos"
          value={datos.apellidos || ""}
          onChange={onChange}
          isInvalid={Boolean(errores.apellidos)}
        />
        <Form.Control.Feedback type="invalid">{errores.apellidos}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default CampoNombreYApellido;
