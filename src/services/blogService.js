import { solicitar } from "./apiCliente";

const BLOG_URL = import.meta.env.VITE_BLOG_API_URL;

export function listarBlogs() {
  return solicitar(BLOG_URL, "/blog");
}

export function obtenerBlog(id) {
  return solicitar(BLOG_URL, `/blog/${id}`);
}
