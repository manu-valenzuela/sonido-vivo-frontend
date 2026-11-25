import { textoMinimo, textoMaximo, letrasYSimbolos } from "./validacionesTexto";
import { TIPOS_DESPACHO } from "./estados";

// Reglas alineadas con CrearVentaRequest de servicio-ventas
export function validarCheckout(datos) {
  const nuevosErrores = {};
  if (!TIPOS_DESPACHO[datos.tipoDespacho]) nuevosErrores.tipoDespacho = "Selecciona un tipo de despacho";
  if (textoMinimo(datos.lugarDespacho, 0)) {
    if (!letrasYSimbolos(datos.lugarDespacho)) nuevosErrores.lugarDespacho = "La dirección contiene caracteres no permitidos";
    else if (!textoMaximo(datos.lugarDespacho, 250)) nuevosErrores.lugarDespacho = "La dirección no puede exceder 250 caracteres";
  }
  return nuevosErrores;
}

export default validarCheckout;
