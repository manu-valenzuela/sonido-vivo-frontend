import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Productos from "../pages/Productos";
import DetalleProducto from "../pages/DetalleProducto";
import { guardarCarritoLocalStorage } from "../utils/persistencia";
import { listarProductos, obtenerProducto } from "../services/productoService";

// Se simulan los servicios para no depender de que el backend esté corriendo
vi.mock("../services/productoService", () => ({
  listarProductos: vi.fn(),
  obtenerProducto: vi.fn(),
}));
vi.mock("../services/categoriaService", () => ({
  listarCategorias: vi.fn().mockResolvedValue([
    { id: 1, nombre: "Guitarras Eléctricas" },
    { id: 3, nombre: "Bajos Eléctricos" },
  ]),
}));
vi.mock("../services/marcaService", () => ({
  listarMarcas: vi.fn().mockResolvedValue([]),
}));

describe("Pruebas Unitarias Avanzadas - Flujos de Tienda", () => {
  const guitarra = { id: "GE001", nombre: "Guitarra Eléctrica Squier", categoriaNombre: "Guitarras Eléctricas", precio: 249990, stock: 5 };
  const bajo = { id: "BA001", nombre: "Bajo Eléctrico Squier", categoriaNombre: "Bajos Eléctricos", precio: 299990, stock: 3 };

  beforeEach(() => {
    vi.mocked(listarProductos).mockImplementation(async (filtros = {}) => {
      if (filtros.enOferta) return [];
      if (filtros.categoriaId === "3") return [bajo];
      return [guitarra, bajo];
    });
  });

  it("Prueba 8: cambia los resultados de la grilla al seleccionar una categoría en el filtro", async () => {
    const usuario = userEvent.setup();
    render(
      <MemoryRouter>
        <Productos onAgregar={vi.fn()} />
      </MemoryRouter>
    );

    expect(await screen.findByText("Guitarra Eléctrica Squier")).toBeInTheDocument();
    expect(screen.getByText("Bajo Eléctrico Squier")).toBeInTheDocument();

    await screen.findByRole("option", { name: "Bajos Eléctricos" });
    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Bajos Eléctricos");

    expect(await screen.findByText("1 productos encontrados")).toBeInTheDocument();
    expect(screen.queryByText("Guitarra Eléctrica Squier")).not.toBeInTheDocument();
    expect(listarProductos).toHaveBeenLastCalledWith(expect.objectContaining({ categoriaId: "3" }));
  });

  it("Prueba 9: sincroniza y escribe el formato serializado correcto en localStorage mediante un espía", () => {
    const espiaItem = vi.spyOn(Storage.prototype, "setItem");
    const datosSimulados = [{ id: "GE001", nombre: "Guitarra Eléctrica Squier" }];

    guardarCarritoLocalStorage(datosSimulados);

    expect(espiaItem).toHaveBeenCalledWith("carrito_productos", JSON.stringify(datosSimulados));
    espiaItem.mockRestore();
  });

  it("Prueba 10: muestra de forma segura una alerta controlada si el instrumento solicitado no existe", async () => {
    vi.mocked(obtenerProducto).mockRejectedValue(new Error("Producto no encontrado"));
    render(
      <MemoryRouter initialEntries={["/productos/XX999"]}>
        <Routes>
          <Route path="/productos/:id" element={<DetalleProducto onAgregar={vi.fn()} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/el instrumento solicitado no existe/i)).toBeInTheDocument();
  });
});
