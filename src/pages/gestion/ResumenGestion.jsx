import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCargaApi from "../../hooks/useCargaApi";
import { listarVentas } from "../../services/ventaService";
import { listarMensajes } from "../../services/contactoService";
import { listarProductos } from "../../services/productoService";

const STOCK_CRITICO = 3;

function TarjetaIndicador({ titulo, consulta, contar, ruta, color }) {
  const { datos, cargando, error } = useCargaApi(consulta);
  const valor = cargando ? "…" : error ? "—" : contar(datos);
  return (
    <Col md={4}>
      <Card as={Link} to={ruta} className={`text-decoration-none border-0 shadow-sm bg-${color} text-white h-100`}>
        <Card.Body className="p-4">
          <Card.Text className="mb-1">{titulo}</Card.Text>
          <Card.Title as="p" className="display-6 fw-bold mb-0">{valor}</Card.Title>
          {error && <small>{error}</small>}
        </Card.Body>
      </Card>
    </Col>
  );
}

function ResumenGestion({ base }) {
  return (
    <>
      <h1 className="h3 fw-bold mb-4">Resumen</h1>
      <Row className="g-3">
        <TarjetaIndicador titulo="Ventas por preparar" color="primary" ruta={`${base}/ventas`}
          consulta={() => listarVentas("PAGADA")} contar={(ventas) => ventas.length} />
        <TarjetaIndicador titulo="Mensajes pendientes" color="warning" ruta={`${base}/mensajes`}
          consulta={() => listarMensajes("PENDIENTE")} contar={(mensajes) => mensajes.length} />
        <TarjetaIndicador titulo="Productos con stock crítico" color="danger" ruta={`${base}/inventario`}
          consulta={() => listarProductos()} contar={(productos) => productos.filter((p) => p.stock <= STOCK_CRITICO).length} />
      </Row>
    </>
  );
}

export default ResumenGestion;
