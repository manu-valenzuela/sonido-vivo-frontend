import { textoMinimo, textoMaximo } from "./validacionesTexto";
import { arrobaEmail, dominioEmail } from "./validacionesEmail";

export function validarLogin(datos) {
  const nuevosErrores = {};
  // Email
  if (!textoMinimo(datos.email, 0)) nuevosErrores.email = "Email obligatorio";
  else if (!arrobaEmail(datos.email)) nuevosErrores.email = "El email debe contener un @";
  else if (!dominioEmail(datos.email)) nuevosErrores.email = "El email debe ser @gmail.com, @duoc.cl o @profesor.duoc.cl";
  else if (!textoMaximo(datos.email, 100)) nuevosErrores.email = "El email no puede exceder 100 caracteres";
  // Contraseña
  if (!textoMinimo(datos.contrasena, 0)) nuevosErrores.contrasena = "Contraseña obligatoria";

  return nuevosErrores;
}

export default validarLogin;
