import { Alert, Spinner } from "react-bootstrap";

function EstadoCarga({ cargando, error, vacio = false, mensajeVacio = "No hay datos para mostrar.", children }) {
  if (cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" aria-label="Cargando" />
      </div>
    );
  }
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (vacio) return <Alert variant="secondary">{mensajeVacio}</Alert>;
  return children;
}

export default EstadoCarga;
