# 🎸 Sonido Vivo - Frontend (React)

Tienda de instrumentos musicales desarrollada en **React** con **React-Bootstrap**, que consume los microservicios **Spring Boot** del repositorio [sonido-vivo-tienda](https://github.com/RomanMateos/sonido-vivo-tienda). Proyecto de **Desarrollo FullStack II** (Duoc UC, EA3).

---

## 📌 Estado del proyecto
1. **Integración con el backend:** completa. Todas las pantallas consumen la API; ya no hay datos locales ni `localStorage`.
2. **Sesión y roles:** login con JWT emitido por `servicio-autenticacion`; rutas protegidas para `CLIENTE`, `TRABAJADOR` y `ADMINISTRADOR`.
3. **Compra:** carrito en `servicio-ventas`, checkout con pago simulado (5 segundos, cancelable) y boleta emitida por `servicio-boletas`. Las compras canceladas se guardan como `RECHAZADA`.
4. **Paneles:** el trabajador gestiona ventas, boletas, inventario, mensajes, blog y consulta usuarios. El administrador además gestiona productos, categorías, marcas, usuarios y reportes.
5. **Despliegue en AWS:** preparado (`.env.production`), pendiente de ejecutar según la Guía 18. Ver [Despliegue](#-despliegue-en-aws-ec2).

---

## 🧩 Microservicios que consume
| Servicio | Puerto local | Variable de entorno | Uso en el front |
|---|---|---|---|
| servicio-autenticacion | 8081 | `VITE_AUTH_API_URL` | Login (JWT) |
| servicio-usuarios | 8082 | `VITE_USUARIOS_API_URL` | Registro, perfil, regiones y comunas, gestión de usuarios |
| servicio-productos | 8083 | `VITE_PRODUCTOS_API_URL` | Catálogo, categorías, marcas, inventario |
| servicio-ventas | 8084 | `VITE_VENTAS_API_URL` | Carrito, compras, gestión de ventas |
| servicio-boletas | 8085 | `VITE_BOLETAS_API_URL` | Boletas |
| servicio-blog | 8086 | `VITE_BLOG_API_URL` | Blog |
| servicio-contacto | 8087 | `VITE_CONTACTO_API_URL` | Formulario y gestión de mensajes |
| servicio-reportes | 8088 | `VITE_REPORTES_API_URL` | Reportes del administrador |

Cada servicio tiene su propia variable, como en la Guía 17. Los valores están en `.env.development` (local) y `.env.production` (AWS). No contienen secretos: el navegador puede leerlos.

---

## 🚀 Ejecución local
Requisitos: **Node 20.19 o superior** y el backend corriendo (base de datos cargada con `db.sql` y `datos.sql`).

```bash
npm install
npm run dev
```

La aplicación queda en `http://localhost:5173`, el único origen que el backend autoriza por CORS en desarrollo.

Usuario inicial: `admin@duoc.cl` / `Admin1234!` (lo crea el backend al iniciar). Los clientes se registran desde la página; los trabajadores los crea el administrador desde su panel.

| Script | Uso |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Versión de producción en `dist/` |
| `npm run lint` | Revisión con ESLint |
| `npm run test:run` | Ejecuta los tests una vez |
| `npm run coverage` | Tests con reporte de cobertura |

---

## 📂 Estructura del proyecto
```text
src/
├── components/      # Componentes visuales reutilizables (reciben props)
│   ├── buttons/     # Botones del catálogo
│   ├── carrito/     # Ítems del carrito
│   ├── compras/     # Boleta, detalle de productos, estado de venta
│   ├── comunes/     # Carga, errores, paginación, filtros, confirmaciones
│   ├── form/        # Campos de formulario reutilizables
│   └── panel/       # Estructura de los paneles y listas editables
├── hooks/           # useSesion, useCarrito, useCargaApi, useAccionApi, useCuentaRegresiva
├── pages/           # Páginas públicas, cliente/ y gestion/ (paneles)
├── routes/          # Rutas, protección por rol y secciones de los paneles
├── services/        # Un archivo por recurso del backend; apiCliente agrega el JWT
├── utils/           # Validaciones, formatos, roles, estados y sesión
└── App.jsx          # Solo arma navegación, rutas y pie de página
```

---

## 🔐 Roles y rutas
| Rol | Rutas |
|---|---|
| Público | `/`, `/productos/:id`, `/blog`, `/contacto`, `/nosotros`, `/registro`, `/login` |
| Cualquier sesión | `/mi-perfil` |
| CLIENTE | `/carrito`, `/checkout`, `/pago-exitoso/:ventaId`, `/pago-error`, `/mis-compras` |
| TRABAJADOR | `/trabajador/*` |
| ADMINISTRADOR | `/admin/*` (incluye todo lo del trabajador) |

La protección en React mejora la navegación, pero la seguridad real la aplica el backend: cada servicio valida el JWT y el rol.

---

## 🧪 Testing (Vitest)
9 archivos y 69 pruebas: validaciones de todos los formularios, formatos de fecha y monto, flujo de estados de venta, protección de rutas, navegación por rol, componentes del catálogo y flujos de tienda con servicios simulados (`vi.mock`), por lo que no requieren el backend.

```bash
npm run test:run
```

---

## ☁️ Despliegue en AWS (EC2)
Según la Guía 18, en una sola instancia EC2:

1. **Nginx** publica `dist/` en el puerto **80** y reenvía cada prefijo de `.env.production` (por ejemplo `/api/auth-service/`) a `127.0.0.1:<puerto>/api/` del servicio correspondiente.
2. **Grupo de seguridad:** solo puertos **80** (sitio y API) y **22** (SSH). Los puertos 8081 a 8088 y 3306 no se abren.
3. **Rutas internas bloqueadas en Nginx:** `/api/auth/sincronizar` y `PATCH /api/productos/{id}/stock` solo se usan entre servicios por `127.0.0.1`, por lo que Nginx las rechaza desde Internet.
4. **CORS:** en producción el backend recibe el origen real en `APP_CORS_ALLOWED_ORIGIN` (`http://IP_PUBLICA`).
5. **Después de desplegar:** cambiar la contraseña de `admin@duoc.cl` desde el panel (Usuarios › Editar).

```bash
npm run build
```
