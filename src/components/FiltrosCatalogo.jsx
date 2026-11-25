import { Col, Form, Row } from "react-bootstrap";
import useCargaApi from "../hooks/useCargaApi";
import { listarCategorias } from "../services/categoriaService";
import { listarMarcas } from "../services/marcaService";

function FiltrosCatalogo({ filtros, onCambiar }) {
  const { datos: categorias } = useCargaApi(listarCategorias);
  const { datos: marcas } = useCargaApi(listarMarcas);

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    onCambiar({ ...filtros, [name]: type === "checkbox" ? checked : value });
  }

  return (
    <Form className="mb-4" onSubmit={(e) => e.preventDefault()}>
      <Row className="g-2 align-items-end">
        <Col md={4}>
          <Form.Label htmlFor="busqueda" className="small mb-1">Buscar</Form.Label>
          <Form.Control id="busqueda" name="busqueda" type="search" placeholder="Nombre del producto"
            value={filtros.busqueda} onChange={cambiar} />
        </Col>
        <Col md={3}>
          <Form.Label htmlFor="categoriaId" className="small mb-1">Categoría</Form.Label>
          <Form.Select id="categoriaId" name="categoriaId" value={filtros.categoriaId} onChange={cambiar}>
            <option value="">Todas</option>
            {(categorias ?? []).map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label htmlFor="marcaId" className="small mb-1">Marca</Form.Label>
          <Form.Select id="marcaId" name="marcaId" value={filtros.marcaId} onChange={cambiar}>
            <option value="">Todas</option>
            {(marcas ?? []).map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Check id="enOferta" name="enOferta" type="switch" label="Solo ofertas"
            checked={filtros.enOferta} onChange={cambiar} className="mb-2" />
        </Col>
      </Row>
    </Form>
  );
}

export default FiltrosCatalogo;
