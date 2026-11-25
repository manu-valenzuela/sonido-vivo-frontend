import { textoMinimo, textoMaximo } from "./validacionesTexto";

const ENTERO_NO_NEGATIVO = /^\d+$/;

// Reglas alineadas con ProductoRequest de servicio-productos
export function validarProducto(datos, esEdicion) {
  const nuevosErrores = {};
  if (!esEdicion) {
    if (!textoMinimo(datos.id, 0)) nuevosErrores.id = "El ID es obligatorio";
    else if (!textoMinimo(datos.id, 2) || !textoMaximo(datos.id, 5)) nuevosErrores.id = "El ID debe tener entre 3 y 5 caracteres";
  }
  if (!textoMinimo(datos.nombre, 0)) nuevosErrores.nombre = "El nombre es obligatorio";
  else if (!textoMaximo(datos.nombre, 100)) nuevosErrores.nombre = "El nombre no puede superar los 100 caracteres";
  if (!datos.categoriaId) nuevosErrores.categoriaId = "La categoría es obligatoria";
  if (!datos.marcaId) nuevosErrores.marcaId = "La marca es obligatoria";
  if (!ENTERO_NO_NEGATIVO.test(String(datos.precio))) nuevosErrores.precio = "El precio debe ser un número entero mayor o igual a 0";
  if (!ENTERO_NO_NEGATIVO.test(String(datos.stock))) nuevosErrores.stock = "El stock debe ser un número entero mayor o igual a 0";
  if (datos.descripcion && !textoMaximo(datos.descripcion, 500)) nuevosErrores.descripcion = "La descripción no puede superar los 500 caracteres";
  if (datos.imagen && !textoMaximo(datos.imagen, 500)) nuevosErrores.imagen = "La URL de imagen no puede superar los 500 caracteres";
  return nuevosErrores;
}

export default validarProducto;
