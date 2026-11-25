import { useState } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import EstadoVentaBadge from "../../components/compras/EstadoVentaBadge";
import TablaDetalleProductos from "../../components/compras/TablaDetalleProductos";
import ModalBoleta from "../../components/compras/ModalBoleta";
import useCargaApi from "../../hooks/useCargaApi";
import { listarMisCompras } from "../../services/ventaService";
import { formatearPrecio } from "../../utils/precio";
import { formatearFecha } from "../../utils/fecha";
import { TIPOS_DESPACHO } from "../../utils/estados";

function MisCompras() {
  const { datos, cargando, error } = useCargaApi(listarMisCompras);
  const [ventaConBoleta, setVentaConBoleta] = useState(null);
  const compras = datos ?? [];

  return (
    <Container>
      <h2 className="mb-4 fw-bold">Mis compras</h2>
      <EstadoCarga cargando={cargando} error={error} vacio={compras.length === 0}
        mensajeVacio="Aún no has realizado compras.">
        <Accordion>
          {compras.map((venta) => (
            <Accordion.Item eventKey={String(venta.id)} key={venta.id}>
              <Accordion.Header>
                <div className="d-flex flex-wrap gap-3 align-items-center w-100 me-3">
                  <span className="fw-bold">Compra #{venta.id}</span>
                  <span className="text-muted small">{formatearFecha(venta.fecha)}</span>
                  <EstadoVentaBadge estado={venta.estado} />
                  <span className="ms-auto fw-bold">{formatearPrecio(venta.total)}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p className="mb-1"><strong>{TIPOS_DESPACHO[venta.tipoDespacho]}:</strong> {venta.lugarDespacho}</p>
                <TablaDetalleProductos detalles={venta.detalles} />
                {venta.estado !== "RECHAZADA" && (
                  <Button variant="outline-primary" size="sm" className="mt-3"
                    onClick={() => setVentaConBoleta(venta.id)}>Ver boleta</Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </EstadoCarga>
      <ModalBoleta ventaId={ventaConBoleta} onCerrar={() => setVentaConBoleta(null)} />
    </Container>
  );
}

export default MisCompras;
