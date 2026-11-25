// src/utils/persistencia.js
// Temporal: lo usa AdminUsuarios hasta la fase 5, que lo conecta a servicio-usuarios.

export function guardarFormulario(registro, nuevo) {
  const registroExistente = localStorage.getItem(registro);
  const lista = registroExistente ? JSON.parse(registroExistente) : [];
  lista.push(nuevo);
  localStorage.setItem(registro, JSON.stringify(lista));
}

export function obtenerRegistro(clave) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : [];
}
