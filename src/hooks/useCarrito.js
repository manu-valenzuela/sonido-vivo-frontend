import { useEffect, useState } from "react";
import { guardarCarritoLocalStorage, limpiarCheckout } from "../utils/persistencia";

// Temporal: en la fase 3 el carrito pasa a usar servicio-ventas (/api/carrito)
function useCarrito() {
  const [carrito, setCarrito] = useState(() => {
    const guardados = localStorage.getItem("carrito_productos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    guardarCarritoLocalStorage(carrito);
  }, [carrito]);

  function agregarProducto(producto) {
    setCarrito((actual) =>
      actual.some((item) => item.id === producto.id) ? actual : [...actual, producto]
    );
  }

  function eliminarProducto(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  function limpiarCarrito() {
    setCarrito([]);
    limpiarCheckout();
  }

  return { carrito, agregarProducto, eliminarProducto, limpiarCarrito };
}

export default useCarrito;
