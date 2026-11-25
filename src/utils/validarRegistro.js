import { textoMinimo, textoMaximo, letras, letrasYSimbolos } from "./validacionesTexto";
import { validacionFormatoRut, validacionRut } from "./validacionesRut";
import { arrobaEmail, dominioEmail } from "./validacionesEmail";

// Reglas alineadas con RegistroClienteRequest y UsuarioAdminRequest de servicio-usuarios.
// Con contrasenaOpcional (edición de usuario) la contraseña vacía significa "no cambiarla".
export function validarRegistro(datos, { contrasenaOpcional = false } = {}) {
  const nuevosErrores = {};
  // Nombre
  if (!textoMinimo(datos.nombre, 0)) nuevosErrores.nombre = "Nombre obligatorio";
  else if (!letras(datos.nombre)) nuevosErrores.nombre = "El nombre solo puede contener letras";
  else if (!textoMaximo(datos.nombre, 50)) nuevosErrores.nombre = "El nombre no puede exceder 50 caracteres";
  // Apellidos
  if (!textoMinimo(datos.apellidos, 0)) nuevosErrores.apellidos = "Apellidos obligatorios";
  else if (!letras(datos.apellidos)) nuevosErrores.apellidos = "Los apellidos solo pueden contener letras";
  else if (!textoMaximo(datos.apellidos, 100)) nuevosErrores.apellidos = "Los apellidos no pueden exceder 100 caracteres";
  // RUN
  if (!textoMinimo(datos.run, 0)) nuevosErrores.run = "RUN obligatorio";
  else if (!textoMinimo(datos.run, 6) || !textoMaximo(datos.run, 9)) nuevosErrores.run = "El RUN debe contener entre 7 y 9 caracteres";
  else if (!validacionFormatoRut(datos.run)) nuevosErrores.run = "Ingrese el RUN sin puntos ni guion";
  else if (!validacionRut(datos.run)) nuevosErrores.run = "RUN inválido";
  // Región y comuna
  if (!datos.regionId) nuevosErrores.regionId = "Región obligatoria";
  if (!datos.comunaId) nuevosErrores.comunaId = "Comuna obligatoria";
  // Email
  if (!textoMinimo(datos.email, 0)) nuevosErrores.email = "Email obligatorio";
  else if (!arrobaEmail(datos.email)) nuevosErrores.email = "El email debe contener un @";
  else if (!dominioEmail(datos.email)) nuevosErrores.email = "El email debe ser @gmail.com, @duoc.cl o @profesor.duoc.cl";
  else if (!textoMaximo(datos.email, 100)) nuevosErrores.email = "El email no puede exceder 100 caracteres";
  // Dirección
  if (!textoMinimo(datos.direccion, 0)) nuevosErrores.direccion = "Dirección obligatoria";
  else if (!letrasYSimbolos(datos.direccion)) nuevosErrores.direccion = "La dirección contiene caracteres no permitidos";
  else if (!textoMaximo(datos.direccion, 300)) nuevosErrores.direccion = "La dirección no puede exceder 300 caracteres";
  // Contraseña
  if (!textoMinimo(datos.contrasena, 0)) {
    if (!contrasenaOpcional) nuevosErrores.contrasena = "Contraseña obligatoria";
  } else if (!textoMinimo(datos.contrasena, 5) || !textoMaximo(datos.contrasena, 100)) nuevosErrores.contrasena = "La contraseña debe contener entre 6 y 100 caracteres";

  return nuevosErrores;
}

export default validarRegistro;
