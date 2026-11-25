import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, ProgressBar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CampoDespacho from "../components/form/CampoDespacho";
import TablaDetalleProductos from "../components/compras/TablaDetalleProductos";
import EstadoCarga from "../components/comunes/EstadoCarga";
import useCargaApi from "../hooks/useCargaApi";
import useCuentaRegresiva from "../hooks/useCuentaRegresiva";
import { obtenerPerfil } from "../services/usuarioService";
import { crearVenta, registrarVentaRechazada } from "../services/ventaService";
import { validarCheckout } from "../utils/validarCheckout";
import { METODO_PAGO_SIMULADO } from "../utils/estados";
import { formatearPrecio } from "../utils/precio";

const SEGUNDOS_PAGO = 5;
const inicial = { tipoDespacho: "DOMICILIO", lugarDespacho: "" };

function Checkout({ carrito }) {
  const { items, total } = carrito.carrito;
  const { datos: perfil, cargando, error } = useCargaApi(obtenerPerfil);
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);
  const navigate = useNavigate();

  const solicitud = {
    tipoDespacho: datos.tipoDespacho,
    lugarDespacho: datos.tipoDespacho === "DOMICILIO" ? datos.lugarDespacho.trim() || undefined : undefined,
    metodoPago: METODO_PAGO_SIMULADO,
  };

  async function confirmarPago() {
    try {
      const venta = await crearVenta(solicitud);
      await carrito.recargar();
      navigate(`/pago-exitoso/${venta.id}`, { replace: true });
    } catch (e) {
      navigate("/pago-error", { replace: true, state: { mensaje: e.message } });
    }
  }

  const { segundos } = useCuentaRegresiva(procesando, SEGUNDOS_PAGO, confirmarPago);

  async function cancelarPago() {
    setProcesando(false);
    let mensaje = "Cancelaste el pago. La compra quedó registrada como rechazada y tus productos siguen en el carrito.";
    try {
      await registrarVentaRechazada(solicitud);
    } catch (e) {
      mensaje = `Cancelaste el pago, pero no se pudo registrar la compra rechazada: ${e.message}`;
    }
    navigate("/pago-error", { replace: true, state: { mensaje } });
  }

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  }

  function pagar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarCheckout(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) setProcesando(true);
  }

  if (items.length === 0 && !procesando) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="secondary">No hay productos en tu carrito para pagar.</Alert>
        <Button as={Link} to="/">Ir al catálogo</Button>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4 text-center fw-bold">Finalizar compra</h2>
      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Resumen del pedido</Card.Header>
            <Card.Body>
              <TablaDetalleProductos
                detalles={items}
                pie={
                  <tr className="fw-bold fs-5">
                    <td colSpan={3} className="text-end">Total</td>
                    <td className="text-end">{formatearPrecio(total)}</td>
                  </tr>
                }
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Datos de despacho</Card.Header>
            <Card.Body>
              <EstadoCarga cargando={cargando} error={error}>
                {perfil && (
                  <>
                    <p className="mb-1"><strong>{perfil.nombre} {perfil.apellidos}</strong></p>
                    <p className="mb-1 text-muted">{perfil.email}</p>
                    <p className="mb-3 text-muted">{perfil.direccion}, {perfil.comunaNombre}, {perfil.regionNombre}</p>
                    <Form onSubmit={pagar} noValidate>
                      <fieldset disabled={procesando}>
                        <CampoDespacho datos={datos} errores={errores} onChange={cambiar}
                          direccionPerfil={perfil.direccion} />
                      </fieldset>
                      {procesando ? (
                        <div className="text-center">
                          <p className="fw-bold mb-2">Procesando pago... {segundos} s</p>
                          <ProgressBar animated now={((SEGUNDOS_PAGO - segundos) / SEGUNDOS_PAGO) * 100} className="mb-3" />
                          <Button variant="outline-danger" className="w-100" onClick={cancelarPago}>Cancelar pago</Button>
                        </div>
                      ) : (
                        <Button type="submit" variant="success" className="w-100 fw-bold">
                          Pagar {formatearPrecio(total)}
                        </Button>
                      )}
                    </Form>
                  </>
                )}
              </EstadoCarga>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
