import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import EstadoBadge from "../../components/comunes/EstadoBadge";
import FiltroEstado from "../../components/comunes/FiltroEstado";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { listarMensajes, cambiarEstadoMensaje } from "../../services/contactoService";
import { ESTADOS_CONTACTO } from "../../utils/estados";
import { formatearFecha } from "../../utils/fecha";

function GestionMensajes() {
  const [estado, setEstado] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(null);
  const { datos, cargando, error, recargar } = useCargaApi(() => listarMensajes(estado), [estado]);
  const accion = useAccionApi();
  const mensajes = datos ?? [];

  async function cambiarEstado(mensaje, nuevoEstado) {
    const listo = await accion.ejecutar(() => cambiarEstadoMensaje(mensaje.id, nuevoEstado),
      `El mensaje de ${mensaje.nombre} quedó como "${ESTADOS_CONTACTO[nuevoEstado].texto}".`);
    if (listo) recargar();
  }

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Mensajes de contacto</h1>
      <FiltroEstado id="filtroMensajes" valor={estado} catalogo={ESTADOS_CONTACTO} onCambiar={setEstado} />
      <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
      <EstadoCarga cargando={cargando} error={error} vacio={mensajes.length === 0} mensajeVacio="No hay mensajes con este estado.">
        <Table responsive hover className="align-middle">
          <thead>
            <tr><th>Fecha</th><th>Remitente</th><th>Estado</th><th>Cambiar estado</th><th></th></tr>
          </thead>
          <tbody>
            {mensajes.map((mensaje) => (
              <tr key={mensaje.id}>
                <td>{formatearFecha(mensaje.fecha)}</td>
                <td>{mensaje.nombre} {mensaje.apellidos}<br /><small className="text-muted">{mensaje.email}</small></td>
                <td><EstadoBadge estado={mensaje.estado} catalogo={ESTADOS_CONTACTO} /></td>
                <td style={{ minWidth: "160px" }}>
                  <Form.Select size="sm" value={mensaje.estado} disabled={accion.procesando}
                    aria-label={`Estado del mensaje de ${mensaje.nombre}`}
                    onChange={(e) => cambiarEstado(mensaje, e.target.value)}>
                    {Object.entries(ESTADOS_CONTACTO).map(([clave, { texto }]) => (
                      <option key={clave} value={clave}>{texto}</option>
                    ))}
                  </Form.Select>
                </td>
                <td><Button size="sm" variant="outline-secondary" onClick={() => setMensajeVisible(mensaje)}>Leer</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EstadoCarga>

      <Modal show={Boolean(mensajeVisible)} onHide={() => setMensajeVisible(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje de {mensajeVisible?.nombre} {mensajeVisible?.apellidos}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted small mb-2">{mensajeVisible?.email} · {formatearFecha(mensajeVisible?.fecha)}</p>
          <p style={{ whiteSpace: "pre-line" }}>{mensajeVisible?.mensaje}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GestionMensajes;
