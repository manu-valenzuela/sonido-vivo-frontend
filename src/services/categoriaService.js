import { solicitar } from "./apiCliente";

const PRODUCTOS_URL = import.meta.env.VITE_PRODUCTOS_API_URL;

export function listarCategorias() {
  return solicitar(PRODUCTOS_URL, "/categorias");
}
