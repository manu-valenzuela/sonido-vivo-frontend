import { Form } from "react-bootstrap";

// Campo de texto genérico para formularios de gestión (blog, productos, etc.)
function CampoTexto({ nombre, etiqueta, datos, errores, onChange, multilinea = false, filas = 3, tipo = "text", ayuda, ...resto }) {
  return (
    <Form.Group className="mb-3" controlId={nombre}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        as={multilinea ? "textarea" : "input"}
        rows={multilinea ? filas : undefined}
        type={multilinea ? undefined : tipo}
        name={nombre}
        value={datos[nombre] ?? ""}
        onChange={onChange}
        isInvalid={Boolean(errores[nombre])}
        {...resto}
      />
      {ayuda && <Form.Text muted>{ayuda}</Form.Text>}
      <Form.Control.Feedback type="invalid">{errores[nombre]}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoTexto;
