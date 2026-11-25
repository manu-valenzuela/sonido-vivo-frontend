import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import TarjetaProducto from "./TarjetaProducto";

describe("Pruebas Unitarias - Componente TarjetaProducto", () => {
  // Datos con la misma forma que ProductoResponse de servicio-productos
  const productoDisponible = { id: "GE006", nombre: "Guitarra Eléctrica Fender Player Stratocaster", categoriaNombre: "Guitarras Eléctricas", marcaNombre: "Fender", precio: 799990, stock: 5, enOferta: false };
  const productoCritico = { id: "BA012", nombre: "Bajo Eléctrico Ibanez SR300E", categoriaNombre: "Bajos Eléctricos", marcaNombre: "Ibanez", precio: 399990, stock: 2, enOferta: true };
  const productoAgotado = { id: "BT006", nombre: "Batería Acústica 5 Piezas Pearl Export EXX", categoriaNombre: "Baterías", marcaNombre: "Pearl", precio: 899990, stock: 0, enOferta: false };

  function renderizar(producto, onAgregar = vi.fn()) {
    render(
      <BrowserRouter>
        <TarjetaProducto producto={producto} onAgregar={onAgregar} />
      </BrowserRouter>
    );
  }

  it("Prueba 1: renderiza correctamente el nombre del instrumento recibido por props", () => {
    renderizar(productoDisponible);
    expect(screen.getByText(productoDisponible.nombre)).toBeInTheDocument();
  });

  it("Prueba 2: muestra la categoría y la marca del producto", () => {
    renderizar(productoDisponible);
    expect(screen.getByText("Guitarras Eléctricas")).toBeInTheDocument();
    expect(screen.getByText("Fender")).toBeInTheDocument();
  });

  it("Prueba 3: muestra '¡Últimas unidades!' y la insignia de oferta cuando corresponde", () => {
    renderizar(productoCritico);
    expect(screen.getByText(/últimas unidades/i)).toBeInTheDocument();
    expect(screen.getByText("Oferta")).toBeInTheDocument();
  });

  it("Prueba 4: deshabilita el botón e indica 'Agotado' si el stock disponible es cero", () => {
    renderizar(productoAgotado);
    expect(screen.getByRole("button", { name: /agotado/i })).toBeDisabled();
  });

  it("Prueba 5: ejecuta onAgregar con el producto al presionar el botón", async () => {
    const usuario = userEvent.setup();
    const funcionEspia = vi.fn();
    renderizar(productoDisponible, funcionEspia);

    await usuario.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(funcionEspia).toHaveBeenCalledWith(productoDisponible);
  });
});
