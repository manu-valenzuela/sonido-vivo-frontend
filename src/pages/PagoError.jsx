import { Button, Card, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import BtnProductos from "../components/buttons/BtnProductos";

function PagoError() {
  const { state } = useLocation();
  const mensaje = state?.mensaje ?? "No pudimos procesar tu pago. Inténtalo nuevamente.";

  return (
    <Container className="text-center" style={{ maxWidth: "540px" }}>
      <Card className="shadow-sm p-5 border-0 bg-light">
        <span className="fs-1 mb-3">❌</span>
        <h2 className="fw-bold text-danger mb-3">Transacción no completada</h2>
        <p className="text-muted mb-4">{mensaje}</p>
        <div className="d-flex gap-2">
          <Button as={Link} to="/carrito" variant="outline-danger" className="w-100 fw-bold">Volver al carrito</Button>
          <BtnProductos className="w-100" />
        </div>
      </Card>
    </Container>
  );
}

export default PagoError;
