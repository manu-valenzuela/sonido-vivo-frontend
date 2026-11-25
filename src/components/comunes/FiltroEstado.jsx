import { Form } from "react-bootstrap";

function FiltroEstado({ id, valor, catalogo, onCambiar, etiqueta = "Estado" }) {
  return (
    <Form.Group controlId={id} className="mb-3" style={{ maxWidth: "260px" }}>
      <Form.Label className="small mb-1">{etiqueta}</Form.Label>
      <Form.Select value={valor} onChange={(e) => onCambiar(e.target.value)}>
        <option value="">Todos</option>
        {Object.entries(catalogo).map(([clave, { texto }]) => (
          <option key={clave} value={clave}>{texto}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default FiltroEstado;
