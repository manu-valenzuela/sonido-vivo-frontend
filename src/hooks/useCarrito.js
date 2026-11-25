import { useEffect, useState } from "react";
import * as carritoService from "../services/carritoService";
import { ROLES } from "../utils/roles";

const CARRITO_VACIO = { items: [], total: 0, totalItems: 0 };

// Carrito del cliente almacenado en servicio-ventas. Solo lo usa el rol CLIENTE.
function useCarrito(sesion) {
  const esCliente = sesion?.rol === ROLES.CLIENTE;
  const [carrito, setCarrito] = useState(CARRITO_VACIO);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!esCliente) return;
    carritoService.obtenerCarrito().then(setCarrito).catch((e) => setError(e.message));
  }, [esCliente, sesion?.email]);

  async function ejecutar(operacion) {
    setError("");
    const actualizado = await operacion();
    setCarrito(actualizado);
    return actualizado;
  }

  function agregarProducto(producto, cantidad = 1) {
    if (!sesion) {
      const error = new Error("Debes iniciar sesión para agregar productos al carrito");
      error.estado = 401;
      return Promise.reject(error);
    }
    return ejecutar(() => carritoService.agregarItem(producto.id, cantidad));
  }

  return {
    carrito: esCliente ? carrito : CARRITO_VACIO,
    error,
    agregarProducto,
    cambiarCantidad: (productoId, cantidad) => ejecutar(() => carritoService.actualizarCantidad(productoId, cantidad)),
    eliminarProducto: (productoId) => ejecutar(() => carritoService.eliminarItem(productoId)),
    vaciar: () => ejecutar(carritoService.vaciarCarrito),
    recargar: () => ejecutar(carritoService.obtenerCarrito),
  };
}

export default useCarrito;
