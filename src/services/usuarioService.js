import { solicitar } from "./apiCliente";

const USUARIOS_URL = import.meta.env.VITE_USUARIOS_API_URL;

export function registrarCliente(datos) {
  return solicitar(USUARIOS_URL, "/usuarios/registro", { method: "POST", body: datos });
}

export function obtenerPerfil() {
  return solicitar(USUARIOS_URL, "/usuarios/perfil");
}

export function listarUsuarios() {
  return solicitar(USUARIOS_URL, "/usuarios");
}

export function obtenerUsuario(id) {
  return solicitar(USUARIOS_URL, `/usuarios/${id}`);
}

export function crearUsuario(datos) {
  return solicitar(USUARIOS_URL, "/usuarios", { method: "POST", body: datos });
}

export function actualizarUsuario(id, datos) {
  return solicitar(USUARIOS_URL, `/usuarios/${id}`, { method: "PUT", body: datos });
}

export function cambiarEstadoUsuario(id, activo) {
  return solicitar(USUARIOS_URL, `/usuarios/${id}/estado?activo=${activo}`, { method: "PATCH" });
}
