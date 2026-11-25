import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import useCargaApi from "../../hooks/useCargaApi";
import { listarBlogs } from "../../services/blogService";
import { formatearFecha } from "../../utils/fecha";

function GestionBlog({ base }) {
  const { datos, cargando, error } = useCargaApi(listarBlogs);
  const blogs = datos ?? [];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h1 className="h3 fw-bold mb-0">Blog</h1>
        <Button as={Link} to={`${base}/blog/nuevo`}>➕ Nuevo artículo</Button>
      </div>
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EstadoCarga>
    </>
  );
}

export default GestionBlog;
