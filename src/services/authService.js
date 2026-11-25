import { solicitar } from "./apiCliente";

const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

export function iniciarSesion(credenciales) {
  return solicitar(AUTH_URL, "/auth/login", { method: "POST", body: credenciales });
}
