import { solicitar } from "./apiCliente";

const PRODUCTOS_URL = import.meta.env.VITE_PRODUCTOS_API_URL;

export function listarProductos(filtros = {}) {
  const parametros = new URLSearchParams();
  Object.entries(filtros).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== "" && valor !== false) {
      parametros.append(clave, valor);
    }
  });
  const consulta = parametros.toString();
  return solicitar(PRODUCTOS_URL, `/productos${consulta ? `?${consulta}` : ""}`);
}

export function obtenerProducto(id) {
  return solicitar(PRODUCTOS_URL, `/productos/${id}`);
}
