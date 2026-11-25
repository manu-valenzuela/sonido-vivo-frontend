const CLAVE_TOKEN = "token";
const CLAVE_USUARIO = "usuario";

export const EVENTO_SESION_EXPIRADA = "sesionExpirada";

export function guardarSesion(token, usuario) {
  sessionStorage.setItem(CLAVE_TOKEN, token);
  sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
}

export function obtenerSesion() {
  const texto = sessionStorage.getItem(CLAVE_USUARIO);
  return texto ? JSON.parse(texto) : null;
}

export function obtenerToken() {
  return sessionStorage.getItem(CLAVE_TOKEN);
}

export function borrarSesion() {
  sessionStorage.removeItem(CLAVE_TOKEN);
  sessionStorage.removeItem(CLAVE_USUARIO);
}
