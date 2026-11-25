import { render, screen } from "@testing-library/react";
import EstadoCarga from "./EstadoCarga";

describe("EstadoCarga", () => {
  test("muestra un indicador mientras carga", () => {
    render(<EstadoCarga cargando><p>Contenido</p></EstadoCarga>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("Contenido")).not.toBeInTheDocument();
  });
  test("muestra el error en lugar del contenido", () => {
    render(<EstadoCarga error="La API respondió 500"><p>Contenido</p></EstadoCarga>);
    expect(screen.getByText("La API respondió 500")).toBeInTheDocument();
  });
  test("muestra el aviso de lista vacía", () => {
    render(<EstadoCarga vacio mensajeVacio="No hay ventas."><p>Contenido</p></EstadoCarga>);
    expect(screen.getByText("No hay ventas.")).toBeInTheDocument();
  });
  test("muestra el contenido cuando todo está listo", () => {
    render(<EstadoCarga><p>Contenido</p></EstadoCarga>);
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });
});
