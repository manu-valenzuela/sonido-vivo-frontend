import { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function BtnAgregarAlCarrito({ producto, onAgregar, className = "mb-2 mb-md-0 w-100", children = "Agregar al carrito" }) {
  const [estado, setEstado] = useState("listo"); // listo | agregando | agregado | error
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const sinStock = !producto || producto.stock <= 0;

  async function agregar() {
    setEstado("agregando");
    try {
      await onAgregar(producto);
      setEstado("agregado");
      setTimeout(() => setEstado("listo"), 1500);
    } catch (e) {
      if (e.estado === 401) {
        navigate("/login", { state: { desde: ubicacion.pathname } });
        return;
      }
      setEstado("error");
      setTimeout(() => setEstado("listo"), 2500);
    }
  }

  const textos = { listo: children, agregando: "Agregando...", agregado: "✓ Agregado", error: "No se pudo agregar" };
  const variantes = { listo: "primary", agregando: "primary", agregado: "success", error: "danger" };

  return (
    <Button
      variant={sinStock ? "secondary" : variantes[estado]}
      className={className}
      onClick={agregar}
      disabled={sinStock || estado === "agregando"}
    >
      {sinStock ? "Producto agotado" : textos[estado]}
    </Button>
  );
}

export default BtnAgregarAlCarrito;
