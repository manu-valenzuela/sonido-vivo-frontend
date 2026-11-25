import { Button, Card, Col, ListGroup, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import useCargaApi from "../../hooks/useCargaApi";
import { obtenerReporte } from "../../services/reporteService";
import { formatearFecha, formatearPeriodo } from "../../utils/fecha";
import { formatearPrecio, formatearMonto } from "../../utils/precio";

function Indicador({ titulo, valor, detalle }) {
  return (
    <Col sm={6} lg={4}>
      <Card className="shadow-sm h-100">
        <Card.Body>
          <Card.Text className="text-muted small mb-1">{titulo}</Card.Text>
          <Card.Title as="p" className="h3 fw-bold mb-0">{valor}</Card.Title>
          {detalle && <small className="text-muted">{detalle}</small>}
        </Card.Body>
      </Card>
    </Col>
  );
}

function TablaAlertaStock({ titulo, productos }) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="fw-bold">{titulo} ({productos.length})</Card.Header>
      <Card.Body className="p-0" style={{ maxHeight: "360px", overflowY: "auto" }}>
        <Table size="sm" className="mb-0 align-middle">
          <thead><tr><th>ID</th><th>Producto</th><th className="text-end">Precio</th><th className="text-end">Stock</th></tr></thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}><td>{p.id}</td><td>{p.nombre}</td><td className="text-end">{formatearPrecio(p.precio)}</td><td className="text-end">{p.stock}</td></tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

function DetalleReporte({ base }) {
  const { id } = useParams();
  const { datos: r, cargando, error } = useCargaApi(() => obtenerReporte(id), [id]);

  return (
    <>
      <Button as={Link} to={`${base}/reportes`} variant="outline-secondary" size="sm" className="mb-3">← Volver a reportes</Button>
      <EstadoCarga cargando={cargando} error={error}>
        {r && (
          <>
            <h1 className="h3 fw-bold mb-1">{r.titulo}</h1>
            <p className="text-muted">
              Reporte #{r.id} · emitido el {formatearFecha(r.fechaEmision)} por {r.emitidoPor} · período: {formatearPeriodo(r.fechaInicio, r.fechaFin)}
            </p>

            <h2 className="h5 fw-bold mt-4 mb-3">Ventas</h2>
            <Row className="g-3">
              <Indicador titulo="Monto total vendido" valor={formatearMonto(r.montoTotalVentas)} />
              <Indicador titulo="Ventas válidas" valor={r.cantidadVentasValidas} />
              <Indicador titulo="Ventas anuladas / rechazadas" valor={`${r.cantidadVentasAnuladas} / ${r.cantidadVentasRechazadas}`} />
              <Indicador titulo="Despacho a domicilio" valor={r.ventasDespachoCantidad} detalle={formatearMonto(r.ventasDespachoMonto)} />
              <Indicador titulo="Retiro en tienda" valor={r.ventasRetiroCantidad} detalle={formatearMonto(r.ventasRetiroMonto)} />
            </Row>

            <h2 className="h5 fw-bold mt-4 mb-3">Inventario</h2>
            <Row className="g-3">
              <Indicador titulo="Productos en catálogo" valor={r.totalProductosCatalogo} />
              <Indicador titulo="Unidades en stock" valor={r.totalUnidadesStock} />
              <Indicador titulo="Valor del inventario" valor={formatearMonto(r.valorTotalInventario)} />
              <Indicador titulo="Productos con stock bajo" valor={r.cantidadBajoStock} />
              <Indicador titulo="Productos sin stock" valor={r.cantidadSinStock} />
            </Row>

            <h2 className="h5 fw-bold mt-4 mb-3">Usuarios</h2>
            <Row className="g-3">
              <Indicador titulo="Usuarios registrados" valor={r.totalUsuarios} />
              <Col sm={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <ListGroup variant="flush">
                    {Object.entries(r.usuariosPorRol ?? {}).map(([rol, cantidad]) => (
                      <ListGroup.Item key={rol} className="d-flex justify-content-between">
                        <span>{rol}</span><strong>{cantidad}</strong>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row className="g-3 mt-2">
              <Col lg={6}><TablaAlertaStock titulo="Stock bajo" productos={r.productosBajoStock ?? []} /></Col>
              <Col lg={6}><TablaAlertaStock titulo="Sin stock" productos={r.productosSinStock ?? []} /></Col>
            </Row>
          </>
        )}
      </EstadoCarga>
    </>
  );
}

export default DetalleReporte;
