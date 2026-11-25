import { Modal } from "react-bootstrap";
import DetalleBoleta from "./DetalleBoleta";
import EstadoCarga from "../comunes/EstadoCarga";
import useCargaApi from "../../hooks/useCargaApi";
import { obtenerBoletaPorVenta } from "../../services/boletaService";

function ContenidoBoleta({ ventaId }) {
  const { datos, cargando, error } = useCargaApi(() => obtenerBoletaPorVenta(ventaId), [ventaId]);
  return (
    <EstadoCarga cargando={cargando} error={error}>
      {datos && <DetalleBoleta boleta={datos} />}
    </EstadoCarga>
  );
}

// Solo consulta la boleta cuando el modal está abierto
function ModalBoleta({ ventaId, onCerrar }) {
  return (
    <Modal show={Boolean(ventaId)} onHide={onCerrar} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Boleta de la compra #{ventaId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ventaId && <ContenidoBoleta ventaId={ventaId} />}</Modal.Body>
    </Modal>
  );
}

export default ModalBoleta;
