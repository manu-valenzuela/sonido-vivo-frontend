import { textoMinimo, textoMaximo, letras, letrasYSimbolos } from "./validacionesTexto";
import { arrobaEmail } from "./validacionesEmail";

// Reglas alineadas con ContactoRequest de servicio-contacto (el email admite cualquier dominio)
export function validarContacto(datos) {
  const nuevosErrores = {};
  // Nombre
  if (!textoMinimo(datos.nombre, 0)) nuevosErrores.nombre = "Nombre obligatorio";
  else if (!letras(datos.nombre)) nuevosErrores.nombre = "El nombre solo puede contener letras";
  else if (!textoMaximo(datos.nombre, 100)) nuevosErrores.nombre = "El nombre no puede exceder 100 caracteres";
  // Apellidos
  if (!textoMinimo(datos.apellidos, 0)) nuevosErrores.apellidos = "Apellidos obligatorios";
  else if (!letras(datos.apellidos)) nuevosErrores.apellidos = "Los apellidos solo pueden contener letras";
  else if (!textoMaximo(datos.apellidos, 100)) nuevosErrores.apellidos = "Los apellidos no pueden exceder 100 caracteres";
  // Email
  if (!textoMinimo(datos.email, 0)) nuevosErrores.email = "Email obligatorio";
  else if (!arrobaEmail(datos.email)) nuevosErrores.email = "El email debe contener un @";
  else if (!textoMaximo(datos.email, 120)) nuevosErrores.email = "El email no puede exceder 120 caracteres";
  // Mensaje
  if (!textoMinimo(datos.mensaje, 0)) nuevosErrores.mensaje = "Mensaje obligatorio";
  else if (!letrasYSimbolos(datos.mensaje)) nuevosErrores.mensaje = "El mensaje contiene caracteres inválidos";
  else if (!textoMaximo(datos.mensaje, 500)) nuevosErrores.mensaje = "El mensaje no puede exceder 500 caracteres";

  return nuevosErrores;
}

export default validarContacto;
