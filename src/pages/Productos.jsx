import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";
import CarruselOfertas from "../components/CarruselOfertas";
import FiltrosCatalogo from "../components/FiltrosCatalogo";
import EstadoCarga from "../components/comunes/EstadoCarga";
import Paginacion from "../components/comunes/Paginacion";
import useCargaApi from "../hooks/useCargaApi";
import { listarProductos } from "../services/productoService";

const PRODUCTOS_POR_PAGINA = 12;
const filtrosIniciales = { busqueda: "", categoriaId: "", marcaId: "", enOferta: false };

function Productos({ onAgregar }) {
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [pagina, setPagina] = useState(1);
  const { datos, cargando, error } = useCargaApi(() => listarProductos(filtros), [filtros]);

  const productos = datos ?? [];
  const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA);
  const inicio = (pagina - 1) * PRODUCTOS_POR_PAGINA;
  const visibles = productos.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

  function cambiarFiltros(nuevosFiltros) {
    setFiltros(nuevosFiltros);
    setPagina(1);
  }

  function cambiarPagina(nuevaPagina) {
    setPagina(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Container>
      <h2 className="mb-4 text-center fw-bold">Nuestro catálogo de instrumentos 🎸</h2>
      <CarruselOfertas />
      <FiltrosCatalogo filtros={filtros} onCambiar={cambiarFiltros} />

      <EstadoCarga cargando={cargando} error={error} vacio={productos.length === 0}
        mensajeVacio="No hay productos que coincidan con los filtros.">
        <p className="text-muted small">{productos.length} productos encontrados</p>
        <Row className="g-4">
          {visibles.map((producto) => (
            <Col xs={12} md={6} lg={4} key={producto.id}>
              <TarjetaProducto producto={producto} onAgregar={onAgregar} />
            </Col>
          ))}
        </Row>
        <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} onCambiar={cambiarPagina} />
      </EstadoCarga>
    </Container>
  );
}

export default Productos;
