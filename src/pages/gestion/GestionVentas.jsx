import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import FiltroEstado from "../../components/comunes/FiltroEstado";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import ModalConfirmacion from "../../components/comunes/ModalConfirmacion";
import EstadoVentaBadge from "../../components/compras/EstadoVentaBadge";
import TablaDetalleProductos from "../../components/compras/TablaDetalleProductos";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { listarVentas, cambiarEstadoVenta, anularVenta } from "../../services/ventaService";
import { ESTADOS_VENTA, TIPOS_DESPACHO, siguienteEstadoVenta } from "../../utils/estados";
import { formatearPrecio } from "../../utils/precio";
import { formatearFecha } from "../../utils/fecha";

const NO_ANULABLES = ["ANULADA", "RECHAZADA"];

function GestionVentas({ esAdmin = false }) {
  const [estado, setEstado] = useState("");
  const [ventaVisible, setVentaVisible] = useState(null);
  const [ventaPorAnular, setVentaPorAnular] = useState(null);
  const { datos, cargando, error, recargar } = useCargaApi(() => listarVentas(estado), [estado]);
  const accion = useAccionApi();
  const ventas = datos ?? [];

  async function avanzar(venta) {
    const nuevoEstado = siguienteEstadoVenta(venta);
    const listo = await accion.ejecutar(() => cambiarEstadoVenta(venta.id, nuevoEstado),
      `La venta #${venta.id} pasó a "${ESTADOS_VENTA[nuevoEstado].texto}".`);
    if (listo) recargar();
  }

  async function confirmarAnulacion() {
    const listo = await accion.ejecutar(() => anularVenta(ventaPorAnular.id),
      `La venta #${ventaPorAnular.id} fue anulada: se repuso el stock y se anuló su boleta.`);
    setVentaPorAnular(null);
    if (listo) recargar();
  }

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Ventas</h1>
      <FiltroEstado id="filtroVentas" valor={estado} catalogo={ESTADOS_VENTA} onCambiar={setEstado} />
      <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
      <EstadoCarga cargando={cargando} error={error} vacio={ventas.length === 0} mensajeVacio="No hay ventas con este estado.">
        <Table responsive hover className="align-middle">
          <thead>
            <tr><th>#</th><th>Fecha</th><th>Cliente</th><th>Despacho</th><th className="text-end">Total</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {ventas.map((venta) => {
              const siguiente = siguienteEstadoVenta(venta);
              return (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{formatearFecha(venta.fecha)}</td>
                  <td>{venta.compradorNombre} {venta.compradorApellidos}<br /><small className="text-muted">{venta.compradorEmail}</small></td>
                  <td>{TIPOS_DESPACHO[venta.tipoDespacho]}</td>
                  <td className="text-end">{formatearPrecio(venta.total)}</td>
                  <td><EstadoVentaBadge estado={venta.estado} /></td>
                  <td className="text-nowrap">
                    <Button size="sm" variant="outline-secondary" className="me-1" onClick={() => setVentaVisible(venta)}>Ver</Button>
                    {siguiente && (
                      <Button size="sm" variant="primary" disabled={accion.procesando} onClick={() => avanzar(venta)}>
                        Avanzar a: {ESTADOS_VENTA[siguiente].texto}
                      </Button>
                    )}
                    {esAdmin && !NO_ANULABLES.includes(venta.estado) && (
                      <Button size="sm" variant="outline-danger" className="ms-1" disabled={accion.procesando}
                        onClick={() => setVentaPorAnular(venta)}>Anular</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </EstadoCarga>

      <ModalConfirmacion mostrar={Boolean(ventaPorAnular)} titulo={`Anular venta #${ventaPorAnular?.id}`}
        mensaje="Se repondrá el stock de los productos y se anulará la boleta asociada. Esta acción no se puede deshacer."
        textoConfirmar="Anular venta" procesando={accion.procesando}
        onConfirmar={confirmarAnulacion} onCancelar={() => setVentaPorAnular(null)} />

      <Modal show={Boolean(ventaVisible)} onHide={() => setVentaVisible(null)} size="lg" centered>
        <Modal.Header closeButton><Modal.Title>Venta #{ventaVisible?.id}</Modal.Title></Modal.Header>
        <Modal.Body>
          {ventaVisible && (
            <>
              <p className="mb-1"><strong>Cliente:</strong> {ventaVisible.compradorNombre} {ventaVisible.compradorApellidos} ({ventaVisible.compradorEmail})</p>
              <p className="mb-1"><strong>{TIPOS_DESPACHO[ventaVisible.tipoDespacho]}:</strong> {ventaVisible.lugarDespacho}</p>
              <p className="mb-3"><strong>Estado:</strong> <EstadoVentaBadge estado={ventaVisible.estado} /></p>
              <TablaDetalleProductos detalles={ventaVisible.detalles} />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GestionVentas;
