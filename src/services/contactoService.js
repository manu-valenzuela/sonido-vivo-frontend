import { solicitar } from "./apiCliente";

const CONTACTO_URL = import.meta.env.VITE_CONTACTO_API_URL;

export function enviarMensaje(datos) {
  return solicitar(CONTACTO_URL, "/contacto", { method: "POST", body: datos });
}
