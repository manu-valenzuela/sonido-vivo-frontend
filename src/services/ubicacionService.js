import { solicitar } from "./apiCliente";

const USUARIOS_URL = import.meta.env.VITE_USUARIOS_API_URL;

export function listarRegiones() {
  return solicitar(USUARIOS_URL, "/ubicaciones/regiones");
}

export function listarComunas(regionId) {
  return solicitar(USUARIOS_URL, `/ubicaciones/regiones/${regionId}/comunas`);
}
