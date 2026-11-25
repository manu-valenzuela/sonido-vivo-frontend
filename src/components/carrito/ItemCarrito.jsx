import { Button, ButtonGroup, Col, Image, ListGroup, Row } from "react-bootstrap";
import { formatearPrecio } from "../../utils/precio";

function ItemCarrito({ item, deshabilitado, onCambiarCantidad, onEliminar }) {
  return (
    <ListGroup.Item className="py-3">
      <Row className="align-items-center g-3">
        <Col xs={3} md={2}>
          <Image src={item.imagen} alt={item.nombreProducto} rounded fluid style={{ aspectRatio: "1", objectFit: "cover" }} />
        </Col>
        <Col xs={9} md={4}>
          <h5 className="mb-1 fw-bold">{item.nombreProducto}</h5>
          <span className="text-muted">{formatearPrecio(item.precioUnitario)} c/u</span>
        </Col>
        <Col xs={6} md={3}>
          <ButtonGroup aria-label={`Cantidad de ${item.nombreProducto}`}>
            <Button variant="outline-secondary" disabled={deshabilitado || item.cantidad <= 1}
              onClick={() => onCambiarCantidad(item.productoId, item.cantidad - 1)}>−</Button>
            <Button variant="outline-secondary" disabled className="text-dark">{item.cantidad}</Button>
            <Button variant="outline-secondary" disabled={deshabilitado}
              onClick={() => onCambiarCantidad(item.productoId, item.cantidad + 1)}>+</Button>
          </ButtonGroup>
        </Col>
        <Col xs={6} md={3} className="text-end">
          <div className="fw-bold text-primary fs-5">{formatearPrecio(item.subtotal)}</div>
          <Button variant="link" className="text-danger p-0" disabled={deshabilitado}
            onClick={() => onEliminar(item.productoId)}>Eliminar</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default ItemCarrito;
