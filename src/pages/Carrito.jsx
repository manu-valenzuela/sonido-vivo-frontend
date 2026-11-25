import { useState } from "react";
import { Alert, Button, Card, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCarrito from "../components/carrito/ItemCarrito";
import { formatearPrecio } from "../utils/precio";

function Carrito({ carrito }) {
  const { items, total } = carrito.carrito;
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState("");

  async function ejecutar(operacion) {
    setOcupado(true);
    setError("");
    try {
      await operacion();
    } catch (e) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  }

  if (items.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h2 className="mb-3 fw-bold">Tu carrito está vacío 🛒</h2>
        <p className="text-muted">Aún no has agregado ningún instrumento musical.</p>
        <Button as={Link} to="/" className="mt-2">Ir al catálogo de productos</Button>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4 text-center fw-bold">Carrito de compras</h2>
      {(error || carrito.error) && <Alert variant="danger">{error || carrito.error}</Alert>}
      <Card className="shadow-sm">
        <ListGroup variant="flush">
          {items.map((item) => (
            <ItemCarrito key={item.productoId} item={item} deshabilitado={ocupado}
              onCambiarCantidad={(id, cantidad) => ejecutar(() => carrito.cambiarCantidad(id, cantidad))}
              onEliminar={(id) => ejecutar(() => carrito.eliminarProducto(id))} />
          ))}
        </ListGroup>
        <Card.Footer className="bg-white">
          <div className="d-flex justify-content-between align-items-center py-2">
            <Button variant="outline-danger" size="sm" disabled={ocupado} onClick={() => ejecutar(carrito.vaciar)}>
              Vaciar carrito
            </Button>
            <span className="fs-4 fw-bold">Total: {formatearPrecio(total)}</span>
          </div>
          <div className="d-flex justify-content-between flex-wrap gap-2 pt-2 border-top">
            <Button as={Link} to="/" variant="outline-secondary">← Seguir comprando</Button>
            <Button as={Link} to="/checkout" variant="success" className="px-4 fw-bold" disabled={ocupado}>
              Proceder al pago
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Carrito;
