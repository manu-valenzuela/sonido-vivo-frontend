import { solicitar } from "./apiCliente";

const CONTACTO_URL = import.meta.env.VITE_CONTACTO_API_URL;

export function enviarMensaje(datos) {
  return solicitar(CONTACTO_URL, "/contacto", { method: "POST", body: datos });
}

export function listarMensajes(estado) {
  return solicitar(CONTACTO_URL, `/contacto${estado ? `?estado=${estado}` : ""}`);
}

export function cambiarEstadoMensaje(id, estado) {
  return solicitar(CONTACTO_URL, `/contacto/${id}/estado`, { method: "PATCH", body: { estado } });
}

export function eliminarMensaje(id) {
  return solicitar(CONTACTO_URL, `/contacto/${id}`, { method: "DELETE" });
}
