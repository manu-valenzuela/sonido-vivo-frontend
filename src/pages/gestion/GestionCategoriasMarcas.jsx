import { Col, Row } from "react-bootstrap";
import ListaEditable from "../../components/panel/ListaEditable";
import { listarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from "../../services/categoriaService";
import { listarMarcas, crearMarca, actualizarMarca, eliminarMarca } from "../../services/marcaService";

function GestionCategoriasMarcas() {
  return (
    <>
      <h1 className="h3 fw-bold mb-4">Categorías y marcas</h1>
      <Row className="g-4">
        <Col lg={6}>
          <ListaEditable titulo="Categorías" listar={listarCategorias} crear={crearCategoria}
            actualizar={actualizarCategoria} eliminar={eliminarCategoria} />
        </Col>
        <Col lg={6}>
          <ListaEditable titulo="Marcas" listar={listarMarcas} crear={crearMarca}
            actualizar={actualizarMarca} eliminar={eliminarMarca} />
        </Col>
      </Row>
    </>
  );
}

export default GestionCategoriasMarcas;
