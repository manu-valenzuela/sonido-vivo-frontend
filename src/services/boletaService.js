import { solicitar } from "./apiCliente";

const BOLETAS_URL = import.meta.env.VITE_BOLETAS_API_URL;

export function obtenerBoletaPorVenta(ventaId) {
  return solicitar(BOLETAS_URL, `/boletas/venta/${ventaId}`);
}

export function listarBoletas() {
  return solicitar(BOLETAS_URL, "/boletas");
}
