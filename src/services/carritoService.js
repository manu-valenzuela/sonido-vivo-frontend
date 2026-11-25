import { solicitar } from "./apiCliente";

const VENTAS_URL = import.meta.env.VITE_VENTAS_API_URL;

// Todas las operaciones devuelven el carrito actualizado (CarritoResponse)
export function obtenerCarrito() {
  return solicitar(VENTAS_URL, "/carrito");
}

export function agregarItem(productoId, cantidad = 1) {
  return solicitar(VENTAS_URL, "/carrito/items", { method: "POST", body: { productoId, cantidad } });
}

export function actualizarCantidad(productoId, cantidad) {
  return solicitar(VENTAS_URL, `/carrito/items/${productoId}`, { method: "PUT", body: { cantidad } });
}

export function eliminarItem(productoId) {
  return solicitar(VENTAS_URL, `/carrito/items/${productoId}`, { method: "DELETE" });
}

export function vaciarCarrito() {
  return solicitar(VENTAS_URL, "/carrito", { method: "DELETE" });
}
