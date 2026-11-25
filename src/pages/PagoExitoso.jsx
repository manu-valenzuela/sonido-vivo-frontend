import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DetalleBoleta from "../components/compras/DetalleBoleta";
import EstadoCarga from "../components/comunes/EstadoCarga";
import BtnProductos from "../components/buttons/BtnProductos";
import useCargaApi from "../hooks/useCargaApi";
import { obtenerBoletaPorVenta } from "../services/boletaService";

function PagoExitoso() {
  const { ventaId } = useParams();
  const { datos: boleta, cargando, error } = useCargaApi(() => obtenerBoletaPorVenta(ventaId), [ventaId]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-4">
            <span className="fs-1">✅</span>
            <h2 className="fw-bold text-success">¡Pago confirmado!</h2>
            <p className="text-muted">Tu compra #{ventaId} fue procesada con éxito. Este es tu comprobante:</p>
          </div>
          <EstadoCarga cargando={cargando} error={error}>
            {boleta && <DetalleBoleta boleta={boleta} />}
          </EstadoCarga>
          <div className="d-flex gap-2 mt-4">
            <Button as={Link} to="/mis-compras" variant="outline-primary" className="w-100">Ver mis compras</Button>
            <BtnProductos className="w-100">Seguir comprando</BtnProductos>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PagoExitoso;
