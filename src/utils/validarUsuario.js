import { validarRegistro } from "./validarRegistro";
import { textoMaximo } from "./validacionesTexto";
import { ROLES } from "./roles";

// Formulario de usuarios del administrador: mismas reglas del registro, más rol y teléfono
export function validarUsuario(datos, esEdicion) {
  const nuevosErrores = validarRegistro(datos, { contrasenaOpcional: esEdicion });
  if (!Object.values(ROLES).includes(datos.rol)) nuevosErrores.rol = "Selecciona un rol";
  if (datos.telefono && !textoMaximo(datos.telefono, 30)) nuevosErrores.telefono = "El teléfono no puede exceder 30 caracteres";
  return nuevosErrores;
}

export default validarUsuario;
