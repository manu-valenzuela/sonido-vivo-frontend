import { useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CampoTexto from "../../components/form/CampoTexto";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import ModalConfirmacion from "../../components/comunes/ModalConfirmacion";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { generarReporte, listarReportes, eliminarReporte } from "../../services/reporteService";
import { validarReporte } from "../../utils/validarReporte";
import { formatearFecha, formatearPeriodo } from "../../utils/fecha";

const vacio = { titulo: "", fechaInicio: "", fechaFin: "" };

function GestionReportes({ base }) {
  const navigate = useNavigate();
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [porEliminar, setPorEliminar] = useState(null);
  const { datos: lista, cargando, error, recargar } = useCargaApi(listarReportes);
  const accion = useAccionApi();
  const reportes = lista ?? [];

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  }

  async function generar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarReporte(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    let reporte = null;
    const listo = await accion.ejecutar(async () => {
      reporte = await generarReporte({
        titulo: datos.titulo.trim() || undefined,
        fechaInicio: datos.fechaInicio || undefined,
        fechaFin: datos.fechaFin || undefined,
      });
    });
    if (listo) navigate(`${base}/reportes/${reporte.id}`);
  }

  async function confirmarEliminacion() {
    const listo = await accion.ejecutar(() => eliminarReporte(porEliminar.id), `Reporte #${porEliminar.id} eliminado.`);
    setPorEliminar(null);
    if (listo) recargar();
  }

  const propsCampo = { datos, errores, onChange: cambiar };

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Reportes</h1>
      <Card className="shadow-sm mb-4">
        <Card.Header className="fw-bold">Generar reporte</Card.Header>
        <Card.Body>
          <Form onSubmit={generar} noValidate>
            <Row className="align-items-end">
              <Col md={5}><CampoTexto nombre="titulo" etiqueta="Título (opcional)" maxLength={150} {...propsCampo} /></Col>
              <Col md={3}><CampoTexto nombre="fechaInicio" etiqueta="Desde (opcional)" tipo="date" {...propsCampo} /></Col>
              <Col md={3}><CampoTexto nombre="fechaFin" etiqueta="Hasta (opcional)" tipo="date" {...propsCampo} /></Col>
            </Row>
            <Button type="submit" disabled={accion.procesando}>{accion.procesando ? "Generando..." : "Generar reporte"}</Button>
          </Form>
        </Card.Body>
      </Card>

      <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
      <h2 className="h5 fw-bold mb-3">Historial</h2>
      <EstadoCarga cargando={cargando} error={error} vacio={reportes.length === 0} mensajeVacio="Aún no se han generado reportes.">
        <Table responsive hover className="align-middle">
          <thead><tr><th>#</th><th>Título</th><th>Emitido</th><th>Por</th><th>Período</th><th></th></tr></thead>
          <tbody>
            {reportes.map((reporte) => (
              <tr key={reporte.id}>
                <td>{reporte.id}</td>
                <td>{reporte.titulo}</td>
                <td className="text-nowrap">{formatearFecha(reporte.fechaEmision)}</td>
                <td>{reporte.emitidoPor}</td>
                <td>{formatearPeriodo(reporte.fechaInicio, reporte.fechaFin)}</td>
                <td className="text-nowrap">
                  <Button as={Link} to={`${base}/reportes/${reporte.id}`} size="sm" variant="primary" className="me-1">Ver</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => setPorEliminar(reporte)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EstadoCarga>
      <ModalConfirmacion mostrar={Boolean(porEliminar)} titulo="Eliminar reporte"
        mensaje={`¿Eliminar el reporte #${porEliminar?.id}? Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar" procesando={accion.procesando}
        onConfirmar={confirmarEliminacion} onCancelar={() => setPorEliminar(null)} />
    </>
  );
}

export default GestionReportes;
