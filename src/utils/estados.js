// Etiquetas y colores (variantes de Bootstrap) para los estados de ventas y boletas
export const ESTADOS_VENTA = {
  PAGADA: { texto: "Pagada", color: "success" },
  EN_PREPARACION: { texto: "En preparación", color: "info" },
  ENVIADA: { texto: "Enviada", color: "primary" },
  ENTREGADA: { texto: "Entregada", color: "dark" },
  ANULADA: { texto: "Anulada", color: "secondary" },
  RECHAZADA: { texto: "Rechazada", color: "danger" },
};

export const TIPOS_DESPACHO = {
  DOMICILIO: "Despacho a domicilio",
  RETIRO_TIENDA: "Retiro en tienda",
};

// El backend exige un método de pago; el pago es simulado, por lo que se envía un valor fijo
export const METODO_PAGO_SIMULADO = "Pago simulado";

export const ESTADOS_CONTACTO = {
  PENDIENTE: { texto: "Pendiente", color: "warning" },
  LEIDO: { texto: "Leído", color: "info" },
  RESPONDIDO: { texto: "Respondido", color: "success" },
};

export const ESTADOS_BOLETA = {
  EMITIDA: { texto: "Emitida", color: "success" },
  ANULADA: { texto: "Anulada", color: "secondary" },
};

// Flujo de una venta concretada. El retiro en tienda no pasa por ENVIADA.
// ANULADA y RECHAZADA no avanzan (el backend tampoco lo permite).
export function siguienteEstadoVenta(venta) {
  switch (venta.estado) {
    case "PAGADA": return "EN_PREPARACION";
    case "EN_PREPARACION": return venta.tipoDespacho === "RETIRO_TIENDA" ? "ENTREGADA" : "ENVIADA";
    case "ENVIADA": return "ENTREGADA";
    default: return null;
  }
}
