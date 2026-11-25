import { useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import EstadoCarga from "../comunes/EstadoCarga";
import AlertaResultado from "../comunes/AlertaResultado";
import ModalConfirmacion from "../comunes/ModalConfirmacion";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { textoMinimo, textoMaximo } from "../../utils/validacionesTexto";

function nombreValido(nombre) {
  return textoMinimo(nombre, 0) && textoMaximo(nombre, 100);
}

// Lista de elementos { id, nombre } con creación, renombre y eliminación (categorías y marcas)
function ListaEditable({ titulo, listar, crear, actualizar, eliminar }) {
  const { datos, cargando, error, recargar } = useCargaApi(listar);
  const accion = useAccionApi();
  const [nuevo, setNuevo] = useState("");
  const [edicion, setEdicion] = useState({ id: null, nombre: "" });
  const [porEliminar, setPorEliminar] = useState(null);
  const elementos = datos ?? [];

  async function ejecutar(operacion, mensaje) {
    const listo = await accion.ejecutar(operacion, mensaje);
    if (listo) recargar();
    return listo;
  }

  async function agregar(evento) {
    evento.preventDefault();
    if (!nombreValido(nuevo)) return;
    if (await ejecutar(() => crear({ nombre: nuevo.trim() }), `"${nuevo.trim()}" agregado.`)) setNuevo("");
  }

  async function guardarEdicion() {
    if (!nombreValido(edicion.nombre)) return;
    if (await ejecutar(() => actualizar(edicion.id, { nombre: edicion.nombre.trim() }), "Nombre actualizado.")) {
      setEdicion({ id: null, nombre: "" });
    }
  }

  async function confirmarEliminacion() {
    await ejecutar(() => eliminar(porEliminar.id), `"${porEliminar.nombre}" eliminado.`);
    setPorEliminar(null);
  }

  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="fw-bold">{titulo} ({elementos.length})</Card.Header>
      <Card.Body>
        <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
        <Form onSubmit={agregar} className="mb-3">
          <InputGroup>
            <Form.Control placeholder="Nuevo nombre" aria-label={`Nuevo elemento de ${titulo}`} maxLength={100}
              value={nuevo} onChange={(e) => setNuevo(e.target.value)} />
            <Button type="submit" disabled={!nombreValido(nuevo) || accion.procesando}>Agregar</Button>
          </InputGroup>
        </Form>
        <EstadoCarga cargando={cargando} error={error} vacio={elementos.length === 0}>
          <ListGroup variant="flush" style={{ maxHeight: "460px", overflowY: "auto" }}>
            {elementos.map((elemento) => (
              <ListGroup.Item key={elemento.id} className="d-flex align-items-center gap-2">
                {edicion.id === elemento.id ? (
                  <>
                    <Form.Control size="sm" value={edicion.nombre} maxLength={100} aria-label="Nuevo nombre"
                      onChange={(e) => setEdicion({ ...edicion, nombre: e.target.value })} />
                    <Button size="sm" disabled={!nombreValido(edicion.nombre) || accion.procesando} onClick={guardarEdicion}>Guardar</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEdicion({ id: null, nombre: "" })}>Cancelar</Button>
                  </>
                ) : (
                  <>
                    <span className="me-auto">{elemento.nombre}</span>
                    <Button size="sm" variant="outline-primary" onClick={() => setEdicion(elemento)}>Renombrar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => setPorEliminar(elemento)}>Eliminar</Button>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </EstadoCarga>
      </Card.Body>
      <ModalConfirmacion mostrar={Boolean(porEliminar)} titulo="Eliminar"
        mensaje={`¿Eliminar "${porEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar" procesando={accion.procesando}
        onConfirmar={confirmarEliminacion} onCancelar={() => setPorEliminar(null)} />
    </Card>
  );
}

export default ListaEditable;
