// src/utils/precio.js
export function formatearPrecio(valor) {
  if (valor === 0) return "Gratis";
  return `$${valor.toLocaleString("es-CL")}`;
}

// Montos de reportes: el cero se muestra como $0 (no como "Gratis")
export function formatearMonto(valor) {
  return `$${(valor ?? 0).toLocaleString("es-CL")}`;
}
