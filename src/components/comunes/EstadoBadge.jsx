import { Badge } from "react-bootstrap";

// Muestra un estado usando un catálogo { CLAVE: { texto, color } } de utils/estados.js
function EstadoBadge({ estado, catalogo }) {
  const { texto, color } = catalogo[estado] ?? { texto: estado, color: "secondary" };
  return <Badge bg={color}>{texto}</Badge>;
}

export default EstadoBadge;
