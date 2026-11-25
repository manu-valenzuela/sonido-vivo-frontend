import { solicitar } from "./apiCliente";

const USUARIOS_URL = import.meta.env.VITE_USUARIOS_API_URL;

export function registrarCliente(datos) {
  return solicitar(USUARIOS_URL, "/usuarios/registro", { method: "POST", body: datos });
}

export function obtenerPerfil() {
  return solicitar(USUARIOS_URL, "/usuarios/perfil");
}
