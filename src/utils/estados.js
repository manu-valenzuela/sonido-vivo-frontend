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
