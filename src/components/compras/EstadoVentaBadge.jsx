import EstadoBadge from "../comunes/EstadoBadge";
import { ESTADOS_VENTA } from "../../utils/estados";

function EstadoVentaBadge({ estado }) {
  return <EstadoBadge estado={estado} catalogo={ESTADOS_VENTA} />;
}

export default EstadoVentaBadge;
