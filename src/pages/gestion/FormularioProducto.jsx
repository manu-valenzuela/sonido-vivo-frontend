import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CampoTexto from "../../components/form/CampoTexto";
import CampoSelect from "../../components/form/CampoSelect";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import useCargaApi from "../../hooks/useCargaApi";
import useAccionApi from "../../hooks/useAccionApi";
import { obtenerProducto, crearProducto, actualizarProducto } from "../../services/productoService";
import { listarCategorias } from "../../services/categoriaService";
import { listarMarcas } from "../../services/marcaService";
import { validarProducto } from "../../utils/validarProducto";

const vacio = {
  id: "", nombre: "", categoriaId: "", marcaId: "", precio: "", stock: "",
  descripcion: "", imagen: "", enOferta: false,
};
const aOpciones = (lista) => (lista ?? []).map(({ id, nombre }) => ({ valor: id, texto: nombre }));

// Un único formulario para crear (sin id en la ruta) y editar (con id) productos
function FormularioProducto({ base }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [errorCarga, setErrorCarga] = useState("");
  const { datos: categorias } = useCargaApi(listarCategorias);
  const { datos: marcas } = useCargaApi(listarMarcas);
  const accion = useAccionApi();

  useEffect(() => {
    if (!id) return;
    obtenerProducto(id)
      .then((p) => setDatos({
        id: p.id, nombre: p.nombre, categoriaId: String(p.categoriaId), marcaId: String(p.marcaId),
        precio: String(p.precio), stock: String(p.stock), descripcion: p.descripcion ?? "",
        imagen: p.imagen ?? "", enOferta: Boolean(p.enOferta),
      }))
      .catch((e) => setErrorCarga(e.message));
  }, [id]);

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: type === "checkbox" ? checked : value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarProducto(datos, Boolean(id));
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const cuerpo = {
      ...datos,
      id: datos.id.trim().toUpperCase(),
      nombre: datos.nombre.trim(),
      categoriaId: Number(datos.categoriaId),
      marcaId: Number(datos.marcaId),
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      descripcion: datos.descripcion.trim() || null,
      imagen: datos.imagen.trim() || null,
    };
    const listo = await accion.ejecutar(() => (id ? actualizarProducto(id, cuerpo) : crearProducto(cuerpo)));
    if (listo) navigate(`${base}/productos`);
  }

  const propsCampo = { datos, errores, onChange: cambiar };

  return (
    <>
      <h1 className="h3 fw-bold mb-4">{id ? `Editar producto ${id}` : "Nuevo producto"}</h1>
      <AlertaResultado error={errorCarga || accion.error} onCerrar={accion.limpiar} />
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={enviar} noValidate>
            <Row>
              <Col md={6}>
                {!id && <CampoTexto nombre="id" etiqueta="ID" maxLength={5} ayuda="Entre 3 y 5 caracteres, por ejemplo GA035." {...propsCampo} />}
                <CampoTexto nombre="nombre" etiqueta="Nombre" maxLength={100} {...propsCampo} />
                <CampoSelect nombre="categoriaId" etiqueta="Categoría" opciones={aOpciones(categorias)} {...propsCampo} />
                <CampoSelect nombre="marcaId" etiqueta="Marca" opciones={aOpciones(marcas)} {...propsCampo} />
                <Row>
                  <Col><CampoTexto nombre="precio" etiqueta="Precio" tipo="number" min="0" step="1" {...propsCampo} /></Col>
                  <Col><CampoTexto nombre="stock" etiqueta="Stock" tipo="number" min="0" step="1" {...propsCampo} /></Col>
                </Row>
                <Form.Check type="switch" id="enOferta" name="enOferta" label="Producto en oferta"
                  checked={datos.enOferta} onChange={cambiar} className="mb-3" />
              </Col>
              <Col md={6}>
                <CampoTexto nombre="descripcion" etiqueta="Descripción (opcional)" multilinea filas={4} maxLength={500} {...propsCampo} />
                <CampoTexto nombre="imagen" etiqueta="URL de la imagen (opcional)" maxLength={500} {...propsCampo} />
                {datos.imagen && (
                  <Image src={datos.imagen} alt="Vista previa" rounded className="mb-3" style={{ maxHeight: "180px" }} />
                )}
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2">
              <Button as={Link} to={`${base}/productos`} variant="secondary">Cancelar</Button>
              <Button type="submit" disabled={accion.procesando}>{accion.procesando ? "Guardando..." : "Guardar"}</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default FormularioProducto;
