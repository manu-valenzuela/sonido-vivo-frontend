import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCargaApi from "../hooks/useCargaApi";
import { listarProductos } from "../services/productoService";
import { formatearPrecio } from "../utils/precio";

const MAXIMO_OFERTAS = 8;

function CarruselOfertas() {
  const { datos } = useCargaApi(() => listarProductos({ enOferta: true }));
  const ofertas = (datos ?? []).slice(0, MAXIMO_OFERTAS);

  if (!ofertas.length) return null;

  return (
    <section className="mb-4">
      <h3 className="fw-bold text-center text-danger mb-3">¡Ofertas exclusivas!</h3>
      <Carousel className="rounded overflow-hidden bg-dark">
        {ofertas.map((producto) => (
          <Carousel.Item key={producto.id}>
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center text-white p-4"
              style={{
                height: "300px",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${producto.imagen})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h4 className="mb-2">{producto.nombre}</h4>
              <p className="small mb-3">{producto.descripcion}</p>
              <span className="fs-3 fw-bold text-warning mb-3">{formatearPrecio(producto.precio)}</span>
              <Link to={`/productos/${producto.id}`} className="btn btn-outline-light btn-sm">Ver detalle</Link>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default CarruselOfertas;
