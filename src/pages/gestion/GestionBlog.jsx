import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import ModalConfirmacion from "../../components/comunes/ModalConfirmacion";
import useAccionApi from "../../hooks/useAccionApi";
import useCargaApi from "../../hooks/useCargaApi";
import { listarBlogs, eliminarBlog } from "../../services/blogService";
import { formatearFecha } from "../../utils/fecha";

function GestionBlog({ base, esAdmin = false }) {
  const { datos, cargando, error, recargar } = useCargaApi(listarBlogs);
  const accion = useAccionApi();
  const [porEliminar, setPorEliminar] = useState(null);
  const blogs = datos ?? [];

  async function confirmarEliminacion() {
    const listo = await accion.ejecutar(() => eliminarBlog(porEliminar.id), `Artículo "${porEliminar.titulo}" eliminado.`);
    setPorEliminar(null);
    if (listo) recargar();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h1 className="h3 fw-bold mb-0">Blog</h1>
        <Button as={Link} to={`${base}/blog/nuevo`}>➕ Nuevo artículo</Button>
      </div>
      <AlertaResultado error={accion.error} exito={accion.exito} onCerrar={accion.limpiar} />
      <EstadoCarga cargando={cargando} error={error} vacio={blogs.length === 0} mensajeVacio="Aún no hay artículos.">
        <Table responsive hover className="align-middle">
          <thead><tr><th>Título</th><th>Fecha</th><th></th></tr></thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.titulo}</td>
                <td className="text-nowrap">{formatearFecha(blog.fecha)}</td>
                <td className="text-nowrap">
                  <Button as={Link} to={`/blog/${blog.id}`} size="sm" variant="outline-secondary" className="me-1">Ver</Button>
                  <Button as={Link} to={`${base}/blog/${blog.id}/editar`} size="sm" variant="primary">Editar</Button>
                  {esAdmin && (
                    <Button size="sm" variant="outline-danger" className="ms-1" onClick={() => setPorEliminar(blog)}>Eliminar</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EstadoCarga>
      <ModalConfirmacion mostrar={Boolean(porEliminar)} titulo="Eliminar artículo"
        mensaje={`¿Eliminar "${porEliminar?.titulo}"? Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar" procesando={accion.procesando}
        onConfirmar={confirmarEliminacion} onCancelar={() => setPorEliminar(null)} />
    </>
  );
}

export default GestionBlog;
