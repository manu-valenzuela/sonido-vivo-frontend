import { solicitar } from "./apiCliente";

const BLOG_URL = import.meta.env.VITE_BLOG_API_URL;

export function listarBlogs() {
  return solicitar(BLOG_URL, "/blog");
}

export function obtenerBlog(id) {
  return solicitar(BLOG_URL, `/blog/${id}`);
}

export function crearBlog(datos) {
  return solicitar(BLOG_URL, "/blog", { method: "POST", body: datos });
}

export function actualizarBlog(id, datos) {
  return solicitar(BLOG_URL, `/blog/${id}`, { method: "PUT", body: datos });
}

export function eliminarBlog(id) {
  return solicitar(BLOG_URL, `/blog/${id}`, { method: "DELETE" });
}
