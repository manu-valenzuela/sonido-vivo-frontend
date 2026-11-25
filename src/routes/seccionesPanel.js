// Secciones del menú lateral de cada panel. "ruta" es relativa a la raíz del panel.
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
