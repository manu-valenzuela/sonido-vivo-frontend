import { useState } from "react";
import { Badge, Button, Form, InputGroup, Table } from "react-bootstrap";
import FiltrosCatalogo from "../../components/FiltrosCatalogo";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import Paginacion from "../../components/comunes/Paginacion";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { listarProductos, actualizarInventario } from "../../services/productoService";
import { formatearPrecio } from "../../utils/precio";

const POR_PAGINA = 20;
const STOCK_CRITICO = 3;
const filtrosIniciales = { busqueda: "", categoriaId: "", marcaId: "", enOferta: false };

function FilaInventario({ producto, procesando, onGuardar }) {
  const [stock, setStock] = useState(String(producto.stock));
  const valido = /^\d+$/.test(stock);
  const cambiado = valido && Number(stock) !== producto.stock;

  return (
    <tr>
      <td>{producto.id}</td>
      <td>{producto.nombre}<br /><small className="text-muted">{producto.categoriaNombre} · {producto.marcaNombre}</small></td>
      <td className="text-end">{formatearPrecio(producto.precio)}</td>
      <td>
        {producto.stock === 0 && <Badge bg="danger">Sin stock</Badge>}
        {producto.stock > 0 && producto.stock <= STOCK_CRITICO && <Badge bg="warning" text="dark">Crítico</Badge>}
      </td>
      <td style={{ minWidth: "170px" }}>
        <InputGroup size="sm">
          <Form.Control type="number" min="0" step="1" value={stock} isInvalid={!valido}
            aria-label={`Stock de ${producto.nombre}`} onChange={(e) => setStock(e.target.value)} />
          <Button variant="primary" disabled={!cambiado || procesando} onClick={() => onGuardar(producto, Number(stock))}>
            Guardar
          </Button>
        </InputGroup>
      </td>
    </tr>
  );
}

function GestionInventario() {
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [pagina, setPagina] = useState(1);
  const { datos, cargando, error, recargar } = useCargaApi(() => listarProductos(filtros), [filtros]);
  const accion = useAccionApi();

  const productos = datos ?? [];
  const totalPaginas = Math.ceil(productos.length / POR_PAGINA);
  const visibles = productos.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  async function guardar(producto, stock) {
    const listo = await accion.ejecutar(() => actualizarInventario(producto.id, stock),
      `Stock de "${producto.nombre}" actualizado a ${stock}.`);
    if (listo) recargar();
  }

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Inventario</h1>
      <FiltrosCatalogo filtros={filtros} onCambiar={(nuevos) => { setFiltros(nuevos); setPagina(1); }} />
      <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
      <EstadoCarga cargando={cargando} error={error} vacio={productos.length === 0} mensajeVacio="No hay productos con estos filtros.">
        <Table responsive hover size="sm" className="align-middle">
          <thead>
            <tr><th>ID</th><th>Producto</th><th className="text-end">Precio</th><th></th><th>Stock</th></tr>
          </thead>
          <tbody>
            {visibles.map((producto) => (
              <FilaInventario key={`${producto.id}-${producto.stock}`} producto={producto}
                procesando={accion.procesando} onGuardar={guardar} />
            ))}
          </tbody>
        </Table>
        <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} onCambiar={setPagina} />
      </EstadoCarga>
    </>
  );
}

export default GestionInventario;
