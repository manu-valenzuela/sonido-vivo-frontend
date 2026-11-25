import { useEffect, useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CampoTexto from "../../components/form/CampoTexto";
import AlertaResultado from "../../components/comunes/AlertaResultado";
import useAccionApi from "../../hooks/useAccionApi";
import { obtenerBlog, crearBlog, actualizarBlog } from "../../services/blogService";
import { validarBlog } from "../../utils/validarBlog";

const vacio = {
  titulo: "", resumen: "", imagen: "", parrafo1: "", subtitulo1: "",
  parrafo2: "", cita: "", subtitulo2: "", parrafo3: "",
};

// Un único formulario para crear (sin id en la ruta) y editar (con id)
function FormularioBlog({ base }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [errorCarga, setErrorCarga] = useState("");
  const accion = useAccionApi();

  useEffect(() => {
    if (!id) return;
    obtenerBlog(id)
      .then((blog) => setDatos(Object.fromEntries(Object.keys(vacio).map((campo) => [campo, blog[campo] ?? ""]))))
      .catch((e) => setErrorCarga(e.message));
  }, [id]);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarBlog(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const listo = await accion.ejecutar(() => (id ? actualizarBlog(id, datos) : crearBlog(datos)));
    if (listo) navigate(`${base}/blog`);
  }

  const propsCampo = { datos, errores, onChange: cambiar };

  return (
    <>
      <h1 className="h3 fw-bold mb-4">{id ? "Editar" : "Nuevo"} artículo</h1>
      <AlertaResultado error={errorCarga || accion.error} onCerrar={accion.limpiar} />
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={enviar} noValidate>
            <CampoTexto nombre="titulo" etiqueta="Título" maxLength={200} {...propsCampo} />
            <CampoTexto nombre="resumen" etiqueta="Resumen" multilinea filas={2} maxLength={500} {...propsCampo} />
            <CampoTexto nombre="imagen" etiqueta="URL de la imagen" maxLength={500} {...propsCampo}
              ayuda="Dirección web de la imagen principal del artículo." />
            {datos.imagen && !errores.imagen && (
              <Image src={datos.imagen} alt="Vista previa" rounded className="mb-3" style={{ maxHeight: "160px" }} />
            )}
            <CampoTexto nombre="parrafo1" etiqueta="Párrafo 1" multilinea filas={4} {...propsCampo} />
            <CampoTexto nombre="subtitulo1" etiqueta="Subtítulo 1" maxLength={200} {...propsCampo} />
            <CampoTexto nombre="parrafo2" etiqueta="Párrafo 2" multilinea filas={4} {...propsCampo} />
            <CampoTexto nombre="cita" etiqueta="Cita destacada" multilinea filas={2} maxLength={500} {...propsCampo} />
            <CampoTexto nombre="subtitulo2" etiqueta="Subtítulo 2" maxLength={200} {...propsCampo} />
            <CampoTexto nombre="parrafo3" etiqueta="Párrafo 3" multilinea filas={4} {...propsCampo} />
            <div className="d-flex justify-content-end gap-2">
              <Button as={Link} to={`${base}/blog`} variant="secondary">Cancelar</Button>
              <Button type="submit" disabled={accion.procesando}>
                {accion.procesando ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default FormularioBlog;
