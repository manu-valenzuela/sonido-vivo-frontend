import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import EstadoBadge from "../../components/comunes/EstadoBadge";
import FiltroEstado from "../../components/comunes/FiltroEstado";
import DetalleBoleta from "../../components/compras/DetalleBoleta";
import useCargaApi from "../../hooks/useCargaApi";
import { listarBoletas } from "../../services/boletaService";
import { ESTADOS_BOLETA } from "../../utils/estados";
import { formatearPrecio } from "../../utils/precio";
import { formatearFecha } from "../../utils/fecha";

function GestionBoletas() {
  const [estado, setEstado] = useState("");
  const [boletaVisible, setBoletaVisible] = useState(null);
  const { datos, cargando, error } = useCargaApi(listarBoletas);
  const boletas = (datos ?? []).filter((boleta) => !estado || boleta.estado === estado);

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Boletas</h1>
      <FiltroEstado id="filtroBoletas" valor={estado} catalogo={ESTADOS_BOLETA} onCambiar={setEstado} />
      <EstadoCarga cargando={cargando} error={error} vacio={boletas.length === 0} mensajeVacio="No hay boletas para mostrar.">
        <Table responsive hover className="align-middle">
          <thead>
            <tr><th>Folio</th><th>Venta</th><th>Fecha</th><th>Cliente</th><th className="text-end">Total</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {boletas.map((boleta) => (
              <tr key={boleta.folio}>
                <td>{boleta.folio}</td>
                <td>#{boleta.ventaId}</td>
                <td>{formatearFecha(boleta.fechaEmision)}</td>
                <td>{boleta.compradorNombreCompleto}</td>
                <td className="text-end">{formatearPrecio(boleta.montoTotal)}</td>
                <td><EstadoBadge estado={boleta.estado} catalogo={ESTADOS_BOLETA} /></td>
                <td><Button size="sm" variant="outline-secondary" onClick={() => setBoletaVisible(boleta)}>Ver</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EstadoCarga>

      <Modal show={Boolean(boletaVisible)} onHide={() => setBoletaVisible(null)} size="lg" centered>
        <Modal.Header closeButton><Modal.Title>Boleta N° {boletaVisible?.folio}</Modal.Title></Modal.Header>
        <Modal.Body>{boletaVisible && <DetalleBoleta boleta={boletaVisible} />}</Modal.Body>
      </Modal>
    </>
  );
}

export default GestionBoletas;
