import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navegacion from "./Navegacion";

function renderizar(sesion, totalItemsCarrito = 0) {
  render(
    <MemoryRouter>
      <Navegacion sesion={sesion} totalItemsCarrito={totalItemsCarrito} onCerrarSesion={() => {}} />
    </MemoryRouter>
  );
}

describe("Navegacion según el rol", () => {
  test("sin sesión ofrece iniciar sesión, registrarse y el carrito", () => {
    renderizar(null);
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
    expect(screen.getByText(/Carrito/)).toBeInTheDocument();
  });
  test("el cliente ve el carrito con la cantidad de productos", () => {
    renderizar({ email: "ana@gmail.com", rol: "CLIENTE" }, 3);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText(/Panel/)).not.toBeInTheDocument();
  });
  test("el trabajador ve su panel y no el carrito", () => {
    renderizar({ email: "tomas@duoc.cl", rol: "TRABAJADOR" });
    expect(screen.getByText(/Panel trabajador/)).toBeInTheDocument();
    expect(screen.queryByText(/Carrito/)).not.toBeInTheDocument();
  });
  test("el administrador ve su panel", () => {
    renderizar({ email: "admin@duoc.cl", rol: "ADMINISTRADOR" });
    expect(screen.getByText(/Panel administrador/)).toBeInTheDocument();
  });
});
