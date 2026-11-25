import { Badge, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EstadoCarga from "../components/comunes/EstadoCarga";
import BtnProductos from "../components/buttons/BtnProductos";
import BtnAgregarAlCarrito from "../components/buttons/BtnAgregarAlCarrito";
import useCargaApi from "../hooks/useCargaApi";
import { obtenerProducto } from "../services/productoService";
import { formatearPrecio } from "../utils/precio";

function DetalleProducto({ onAgregar }) {
  const { id } = useParams();
  const { datos: producto, cargando, error } = useCargaApi(() => obtenerProducto(id), [id]);

  return (
    <Container className="mt-4">
      <EstadoCarga cargando={cargando} error={error && "El instrumento solicitado no existe."}>
        {producto && (
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-4 mb-md-0">
              <Image src={producto.imagen} alt={producto.nombre} rounded fluid
                className="shadow-sm w-100" style={{ maxHeight: "450px", objectFit: "cover" }} />
            </Col>
            <Col xs={12} md={6}>
              <div className="d-flex gap-1 mb-2">
                <Badge bg="secondary">{producto.categoriaNombre}</Badge>
                {producto.enOferta && <Badge bg="danger">Oferta</Badge>}
              </div>
              <h1 className="fw-bold">{producto.nombre}</h1>
              <p className="text-muted mb-1">Marca: {producto.marcaNombre}</p>
              <p className="fs-5">{producto.descripcion}</p>
              <h3 className="text-primary fw-bold">{formatearPrecio(producto.precio)}</h3>
              <p className="text-muted">Stock disponible: {producto.stock}</p>
              <BtnAgregarAlCarrito producto={producto} onAgregar={onAgregar} className="w-100 mb-2" />
              <BtnProductos className="w-100" />
            </Col>
          </Row>
        )}
      </EstadoCarga>
      {error && <BtnProductos className="mt-2">Volver al catálogo</BtnProductos>}
    </Container>
  );
}

export default DetalleProducto;
