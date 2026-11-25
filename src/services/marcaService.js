import { solicitar } from "./apiCliente";

const PRODUCTOS_URL = import.meta.env.VITE_PRODUCTOS_API_URL;

export function listarMarcas() {
  return solicitar(PRODUCTOS_URL, "/marcas");
}

export function crearMarca(datos) {
  return solicitar(PRODUCTOS_URL, "/marcas", { method: "POST", body: datos });
}

export function actualizarMarca(id, datos) {
  return solicitar(PRODUCTOS_URL, `/marcas/${id}`, { method: "PUT", body: datos });
}

export function eliminarMarca(id) {
  return solicitar(PRODUCTOS_URL, `/marcas/${id}`, { method: "DELETE" });
}
