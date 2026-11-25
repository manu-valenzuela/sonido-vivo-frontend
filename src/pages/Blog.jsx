import { Container } from "react-bootstrap";
import TarjetaBlog from "../components/TarjetaBlog";
import EstadoCarga from "../components/comunes/EstadoCarga";
import useCargaApi from "../hooks/useCargaApi";
import { listarBlogs } from "../services/blogService";

function Blog() {
  const { datos, cargando, error } = useCargaApi(listarBlogs);
  const blogs = datos ?? [];

  return (
    <Container>
      <section className="text-center mb-5 bg-light p-4 rounded shadow-sm">
        <h1 className="mb-3 fw-bold">Blog Sonido Vivo</h1>
        <p className="lead text-muted mb-0">
          Novedades, consejos y datos curiosos del mundo musical.
        </p>
      </section>

      <EstadoCarga cargando={cargando} error={error} vacio={blogs.length === 0}
        mensajeVacio="Aún no hay artículos publicados.">
        {blogs.map((blog) => <TarjetaBlog key={blog.id} blog={blog} />)}
      </EstadoCarga>
    </Container>
  );
}

export default Blog;
