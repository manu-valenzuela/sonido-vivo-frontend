import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";
import BtnAgregarAlCarrito from "./buttons/BtnAgregarAlCarrito";

const STOCK_CRITICO = 3;

function TarjetaProducto({ producto, onAgregar }) {
  return (
    <Card as="article" className="h-100 shadow-sm overflow-hidden">
      <Card.Img variant="top" src={producto.imagen} alt={producto.nombre}
        style={{ height: "220px", objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex gap-1 flex-wrap mb-2">
            <Badge bg="secondary">{producto.categoriaNombre}</Badge>
            {producto.enOferta && <Badge bg="danger">Oferta</Badge>}
          </div>
          <Card.Title as="h2" className="h5 fw-bold">{producto.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted small">{producto.marcaNombre}</Card.Subtitle>
          <p className="fw-bold text-primary h4">{formatearPrecio(producto.precio)}</p>
          <p className="text-muted mb-1">Stock disponible: {producto.stock}</p>
          {producto.stock > 0 && producto.stock <= STOCK_CRITICO && (
            <p className="text-danger fw-bold m-0">¡Últimas unidades!</p>
          )}
        </div>
        <div className="mt-3">
          <Link to={`/productos/${producto.id}`} className="btn btn-outline-secondary w-100 mb-2">
            Ver detalle
          </Link>
          <BtnAgregarAlCarrito producto={producto} onAgregar={onAgregar} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;
