import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";

function renderizar(sesion) {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route element={<RutaProtegida sesion={sesion} roles={["ADMINISTRADOR"]} />}>
          <Route path="/admin" element={<p>Panel administrador</p>} />
        </Route>
        <Route path="/login" element={<p>Pantalla de login</p>} />
        <Route path="/" element={<p>Inicio</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("RutaProtegida", () => {
  test("sin sesión redirige al login", () => {
    renderizar(null);
    expect(screen.getByText("Pantalla de login")).toBeInTheDocument();
  });
  test("con un rol no permitido redirige al inicio", () => {
    renderizar({ email: "ana@gmail.com", rol: "CLIENTE" });
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });
  test("con el rol permitido muestra la página", () => {
    renderizar({ email: "admin@duoc.cl", rol: "ADMINISTRADOR" });
    expect(screen.getByText("Panel administrador")).toBeInTheDocument();
  });
});
