import { useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import FiltrosCatalogo from "../../components/FiltrosCatalogo";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import Paginacion from "../../components/comunes/Paginacion";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import ModalConfirmacion from "../../components/comunes/ModalConfirmacion";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { listarProductos, eliminarProducto } from "../../services/productoService";
import { formatearPrecio } from "../../utils/precio";

const POR_PAGINA = 20;
const filtrosIniciales = { busqueda: "", categoriaId: "", marcaId: "", enOferta: false };

function GestionProductos({ base }) {
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [pagina, setPagina] = useState(1);
  const [porEliminar, setPorEliminar] = useState(null);
  const { datos, cargando, error, recargar } = useCargaApi(() => listarProductos(filtros), [filtros]);
  const accion = useAccionApi();

  const productos = datos ?? [];
  const totalPaginas = Math.ceil(productos.length / POR_PAGINA);
  const visibles = productos.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  async function confirmarEliminacion() {
    const listo = await accion.ejecutar(() => eliminarProducto(porEliminar.id), `Producto "${porEliminar.nombre}" eliminado.`);
    setPorEliminar(null);
    if (listo) recargar();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h1 className="h3 fw-bold mb-0">Productos</h1>
        <Button as={Link} to={`${base}/productos/nuevo`}>➕ Nuevo producto</Button>
      </div>
      <FiltrosCatalogo filtros={filtros} onCambiar={(nuevos) => { setFiltros(nuevos); setPagina(1); }} />
      <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
      <EstadoCarga cargando={cargando} error={error} vacio={productos.length === 0} mensajeVacio="No hay productos con estos filtros.">
        <Table responsive hover size="sm" className="align-middle">
          <thead>
            <tr><th>ID</th><th>Producto</th><th className="text-end">Precio</th><th className="text-end">Stock</th><th></th><th></th></tr>
          </thead>
          <tbody>
            {visibles.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}<br /><small className="text-muted">{producto.categoriaNombre} · {producto.marcaNombre}</small></td>
                <td className="text-end">{formatearPrecio(producto.precio)}</td>
                <td className="text-end">{producto.stock}</td>
                <td>{producto.enOferta && <Badge bg="danger">Oferta</Badge>}</td>
                <td className="text-nowrap">
                  <Button as={Link} to={`${base}/productos/${producto.id}/editar`} size="sm" variant="primary" className="me-1">Editar</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => setPorEliminar(producto)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} onCambiar={setPagina} />
      </EstadoCarga>
      <ModalConfirmacion mostrar={Boolean(porEliminar)} titulo="Eliminar producto"
        mensaje={`¿Eliminar "${porEliminar?.nombre}" del catálogo? Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar" procesando={accion.procesando}
        onConfirmar={confirmarEliminacion} onCancelar={() => setPorEliminar(null)} />
    </>
  );
}

export default GestionProductos;
