export const ROLES = {
  ADMINISTRADOR: "ADMINISTRADOR",
  TRABAJADOR: "TRABAJADOR",
  CLIENTE: "CLIENTE",
};

export function rutaInicioPorRol(rol) {
  if (rol === ROLES.ADMINISTRADOR) return "/admin";
  if (rol === ROLES.TRABAJADOR) return "/trabajador";
  return "/";
}
