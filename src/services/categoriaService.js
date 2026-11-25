import { solicitar } from "./apiCliente";

const PRODUCTOS_URL = import.meta.env.VITE_PRODUCTOS_API_URL;

export function listarCategorias() {
  return solicitar(PRODUCTOS_URL, "/categorias");
}

export function crearCategoria(datos) {
  return solicitar(PRODUCTOS_URL, "/categorias", { method: "POST", body: datos });
}

export function actualizarCategoria(id, datos) {
  return solicitar(PRODUCTOS_URL, `/categorias/${id}`, { method: "PUT", body: datos });
}

export function eliminarCategoria(id) {
  return solicitar(PRODUCTOS_URL, `/categorias/${id}`, { method: "DELETE" });
}
