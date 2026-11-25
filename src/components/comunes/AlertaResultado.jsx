import { Alert } from "react-bootstrap";

function AlertaResultado({ error, exito, onCerrar }) {
  if (error) return <Alert variant="danger" dismissible onClose={onCerrar}>{error}</Alert>;
  if (exito) return <Alert variant="success" dismissible onClose={onCerrar}>{exito}</Alert>;
  return null;
}

export default AlertaResultado;
