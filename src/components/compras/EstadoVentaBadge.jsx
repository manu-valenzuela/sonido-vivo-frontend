import { Badge } from "react-bootstrap";
import { ESTADOS_VENTA } from "../../utils/estados";

function EstadoVentaBadge({ estado }) {
  const { texto, color } = ESTADOS_VENTA[estado] ?? { texto: estado, color: "secondary" };
  return <Badge bg={color}>{texto}</Badge>;
}

export default EstadoVentaBadge;
