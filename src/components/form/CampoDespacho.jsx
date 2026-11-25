import { Form } from "react-bootstrap";
import { TIPOS_DESPACHO } from "../../utils/estados";

function CampoDespacho({ datos, errores, onChange, direccionPerfil }) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Tipo de despacho:</Form.Label>
        {Object.entries(TIPOS_DESPACHO).map(([valor, texto]) => (
          <Form.Check key={valor} type="radio" id={`despacho-${valor}`} name="tipoDespacho"
            value={valor} label={texto} checked={datos.tipoDespacho === valor} onChange={onChange}
            isInvalid={Boolean(errores.tipoDespacho)} />
        ))}
        {errores.tipoDespacho && <div className="invalid-feedback d-block">{errores.tipoDespacho}</div>}
      </Form.Group>

      {datos.tipoDespacho === "DOMICILIO" && (
        <Form.Group className="mb-3" controlId="lugarDespacho">
          <Form.Label>Dirección de despacho (opcional):</Form.Label>
          <Form.Control type="text" name="lugarDespacho" value={datos.lugarDespacho} onChange={onChange}
            placeholder={direccionPerfil} isInvalid={Boolean(errores.lugarDespacho)} />
          <Form.Text muted>Si la dejas vacía, usaremos la dirección de tu perfil.</Form.Text>
          <Form.Control.Feedback type="invalid">{errores.lugarDespacho}</Form.Control.Feedback>
        </Form.Group>
      )}
    </>
  );
}

export default CampoDespacho;
