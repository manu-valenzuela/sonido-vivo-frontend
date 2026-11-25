export function formatearFecha(fechaIso) {
  if (!fechaIso) return "";
  // Una fecha sin hora ("2026-11-01") se interpretaría en UTC y en Chile mostraría el día anterior
  const fecha = /^\d{4}-\d{2}-\d{2}$/.test(fechaIso) ? `${fechaIso}T00:00:00` : fechaIso;
  return new Date(fecha).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

export function formatearPeriodo(fechaInicio, fechaFin) {
  if (!fechaInicio && !fechaFin) return "Todo el historial";
  return `${formatearFecha(fechaInicio) || "inicio"} – ${formatearFecha(fechaFin) || "hoy"}`;
}
