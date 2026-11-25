import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import EstadoCarga from "../../components/comunes/EstadoCarga";
import useCargaApi from "../../hooks/useCargaApi";
import { obtenerPerfil } from "../../services/usuarioService";
import { formatearFecha } from "../../utils/fecha";

function Dato({ etiqueta, valor }) {
  return (
    <ListGroup.Item className="d-flex justify-content-between flex-wrap gap-2">
      <span className="text-muted">{etiqueta}</span>
      <span className="fw-semibold text-end">{valor || "—"}</span>
    </ListGroup.Item>
  );
}

function MiPerfil() {
  const { datos: perfil, cargando, error } = useCargaApi(obtenerPerfil);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-4 fw-bold">Mi perfil</h2>
          <EstadoCarga cargando={cargando} error={error}>
            {perfil && (
              <Card className="shadow-sm">
                <ListGroup variant="flush">
                  <Dato etiqueta="Nombre" valor={`${perfil.nombre} ${perfil.apellidos}`} />
                  <Dato etiqueta="RUN" valor={perfil.run} />
                  <Dato etiqueta="Email" valor={perfil.email} />
                  <Dato etiqueta="Teléfono" valor={perfil.telefono} />
                  <Dato etiqueta="Dirección" valor={perfil.direccion} />
                  <Dato etiqueta="Comuna" valor={perfil.comunaNombre} />
                  <Dato etiqueta="Región" valor={perfil.regionNombre} />
                  <Dato etiqueta="Rol" valor={perfil.rol} />
                  <Dato etiqueta="Cliente desde" valor={formatearFecha(perfil.fechaRegistro)} />
                </ListGroup>
              </Card>
            )}
          </EstadoCarga>
        </Col>
      </Row>
    </Container>
  );
}

export default MiPerfil;
