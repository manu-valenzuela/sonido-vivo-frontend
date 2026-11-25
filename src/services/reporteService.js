import { solicitar } from "./apiCliente";

const REPORTES_URL = import.meta.env.VITE_REPORTES_API_URL;

export function generarReporte(datos) {
  return solicitar(REPORTES_URL, "/reportes/generar", { method: "POST", body: datos });
}

export function listarReportes() {
  return solicitar(REPORTES_URL, "/reportes");
}

export function obtenerReporte(id) {
  return solicitar(REPORTES_URL, `/reportes/${id}`);
}

export function eliminarReporte(id) {
  return solicitar(REPORTES_URL, `/reportes/${id}`, { method: "DELETE" });
}
