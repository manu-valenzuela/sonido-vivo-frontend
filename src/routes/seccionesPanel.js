// Secciones del menú lateral de cada panel
export function seccionesGestion(base) {
  return [
    { ruta: base, texto: "Resumen", icono: "📊", exacta: true },
    { ruta: `${base}/ventas`, texto: "Ventas", icono: "🧾" },
    { ruta: `${base}/boletas`, texto: "Boletas", icono: "🗂️" },
    { ruta: `${base}/inventario`, texto: "Inventario", icono: "📦" },
    { ruta: `${base}/mensajes`, texto: "Mensajes", icono: "✉️" },
    { ruta: `${base}/blog`, texto: "Blog", icono: "📰" },
    { ruta: `${base}/usuarios`, texto: "Usuarios", icono: "👥" },
  ];
}

// El administrador ve las mismas secciones más las exclusivas de su rol
export function seccionesAdministrador(base) {
  const secciones = seccionesGestion(base);
  secciones.splice(3, 0,
    { ruta: `${base}/productos`, texto: "Productos", icono: "🎸" },
    { ruta: `${base}/categorias-marcas`, texto: "Categorías y marcas", icono: "🏷️" },
  );
  secciones.push({ ruta: `${base}/reportes`, texto: "Reportes", icono: "📈" });
  return secciones;
}
