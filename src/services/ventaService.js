import { solicitar } from "./apiCliente";

const VENTAS_URL = import.meta.env.VITE_VENTAS_API_URL;

export function crearVenta(datos) {
  return solicitar(VENTAS_URL, "/ventas", { method: "POST", body: datos });
}

export function registrarVentaRechazada(datos) {
  return solicitar(VENTAS_URL, "/ventas/rechazadas", { method: "POST", body: datos });
}

export function listarMisCompras() {
  return solicitar(VENTAS_URL, "/ventas/mis-compras");
}

export function obtenerVenta(id) {
  return solicitar(VENTAS_URL, `/ventas/${id}`);
}

export function listarVentas(estado) {
  return solicitar(VENTAS_URL, `/ventas${estado ? `?estado=${estado}` : ""}`);
}

export function cambiarEstadoVenta(id, estado) {
  return solicitar(VENTAS_URL, `/ventas/${id}/estado`, { method: "PATCH", body: { estado } });
}
