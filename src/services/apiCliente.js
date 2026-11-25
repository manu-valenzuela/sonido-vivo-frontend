import { obtenerToken, borrarSesion, EVENTO_SESION_EXPIRADA } from "../utils/sesion";

function extraerMensaje(cuerpo, estado) {
  const mensaje = cuerpo?.mensaje ?? cuerpo?.message ?? cuerpo?.error;
  if (typeof mensaje === "string") return mensaje;
  if (mensaje && typeof mensaje === "object") return Object.values(mensaje).join(". ");
  return `La API respondió ${estado}`;
}

export async function solicitar(urlBase, ruta, opciones = {}) {
  const token = obtenerToken();
  const headers = { ...opciones.headers };
  const tieneCuerpo = opciones.body !== undefined;

  if (tieneCuerpo) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const respuesta = await fetch(`${urlBase}${ruta}`, {
    ...opciones,
    headers,
    body: tieneCuerpo ? JSON.stringify(opciones.body) : undefined,
  });

  if (!respuesta.ok) {
    if (respuesta.status === 401 && token) {
      borrarSesion();
      window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA));
    }
    const cuerpo = await respuesta.json().catch(() => null);
    const error = new Error(extraerMensaje(cuerpo, respuesta.status));
    error.estado = respuesta.status;
    throw error;
  }

  const texto = await respuesta.text();
  return texto ? JSON.parse(texto) : null;
}
