export function formatearFecha(fechaIso) {
  if (!fechaIso) return "";
  return new Date(fechaIso).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}
