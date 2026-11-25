import { textoMaximo } from "./validacionesTexto";

// Reglas alineadas con GenerarReporteRequest de servicio-reportes (todos los campos son opcionales)
export function validarReporte(datos) {
  const nuevosErrores = {};
  if (datos.titulo && !textoMaximo(datos.titulo, 150)) nuevosErrores.titulo = "El título no puede superar los 150 caracteres";
  if (datos.fechaInicio && datos.fechaFin && datos.fechaFin < datos.fechaInicio) {
    nuevosErrores.fechaFin = "La fecha de término no puede ser anterior a la de inicio";
  }
  return nuevosErrores;
}

export default validarReporte;
