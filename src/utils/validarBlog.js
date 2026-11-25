import { textoMinimo, textoMaximo } from "./validacionesTexto";

// Reglas alineadas con BlogRequest de servicio-blog
const CAMPOS = [
  { campo: "titulo", etiqueta: "El título", maximo: 200 },
  { campo: "resumen", etiqueta: "El resumen", maximo: 500 },
  { campo: "parrafo1", etiqueta: "El primer párrafo" },
  { campo: "subtitulo1", etiqueta: "El primer subtítulo", maximo: 200 },
  { campo: "parrafo2", etiqueta: "El segundo párrafo" },
  { campo: "subtitulo2", etiqueta: "El segundo subtítulo", maximo: 200 },
  { campo: "parrafo3", etiqueta: "El tercer párrafo" },
  { campo: "imagen", etiqueta: "La URL de la imagen", maximo: 500 },
  { campo: "cita", etiqueta: "La cita", maximo: 500 },
];

export function validarBlog(datos) {
  const nuevosErrores = {};
  CAMPOS.forEach(({ campo, etiqueta, maximo }) => {
    if (!textoMinimo(datos[campo], 0)) nuevosErrores[campo] = `${etiqueta} es obligatorio`;
    else if (maximo && !textoMaximo(datos[campo], maximo)) nuevosErrores[campo] = `${etiqueta} no puede superar los ${maximo} caracteres`;
  });
  if (!nuevosErrores.imagen && !/^(https?:\/\/|\/)/.test(datos.imagen.trim())) {
    nuevosErrores.imagen = "La imagen debe ser una URL (http, https o una ruta que empiece con /)";
  }
  return nuevosErrores;
}

export default validarBlog;
