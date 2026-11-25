import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import EstadoCarga from "../components/comunes/EstadoCarga";
import useCargaApi from "../hooks/useCargaApi";
import { obtenerBlog } from "../services/blogService";
import { formatearFecha } from "../utils/fecha";

function DetalleBlog() {
  const { id } = useParams();
  const { datos: blog, cargando, error } = useCargaApi(() => obtenerBlog(id), [id]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={9}>
          <EstadoCarga cargando={cargando} error={error && "Artículo no encontrado."}>
            {blog && (
              <article>
                <header className="mb-4">
                  <h1 className="fw-bold mb-2">{blog.titulo}</h1>
                  <p className="text-muted small">Publicado el {formatearFecha(blog.fecha)}</p>
                </header>

                <Image src={blog.imagen} alt={blog.titulo} fluid rounded
                  className="w-100 mb-4 shadow-sm" style={{ maxHeight: "420px", objectFit: "cover" }} />

                <div className="fs-5 mb-5">
                  <p className="mb-4">{blog.parrafo1}</p>

                  <h2 className="h4 fw-bold mt-4 mb-3">{blog.subtitulo1}</h2>
                  <p>{blog.parrafo2}</p>

                  <blockquote className="fst-italic my-4 p-3 bg-light border-start border-4 border-dark rounded">
                    {blog.cita}
                  </blockquote>

                  <h2 className="h4 fw-bold mt-4 mb-3">{blog.subtitulo2}</h2>
                  <p>{blog.parrafo3}</p>
                </div>
              </article>
            )}
          </EstadoCarga>

          <div className="border-top pt-4">
            <Button as={Link} to="/blog" variant="outline-dark">← Volver al blog</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleBlog;
