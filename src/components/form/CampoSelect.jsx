import { Form } from "react-bootstrap";

// Lista desplegable genérica. "opciones" es un arreglo de { valor, texto }.
function CampoSelect({ nombre, etiqueta, opciones, datos, errores, onChange, textoVacio = "-- Selecciona --", ...resto }) {
  return (
    <Form.Group className="mb-3" controlId={nombre}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Select name={nombre} value={datos[nombre] ?? ""} onChange={onChange}
        isInvalid={Boolean(errores[nombre])} {...resto}>
        <option value="">{textoVacio}</option>
        {opciones.map(({ valor, texto }) => <option key={valor} value={valor}>{texto}</option>)}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{errores[nombre]}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoSelect;
