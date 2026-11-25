import { Routes, Route } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";
import { ROLES } from "../utils/roles";
import Productos from "../pages/Productos";
import DetalleProducto from "../pages/DetalleProducto";
import Carrito from "../pages/Carrito";
import Checkout from "../pages/Checkout";
import PagoExitoso from "../pages/PagoExitoso";
import PagoError from "../pages/PagoError";
import Nosotros from "../pages/Nosotros";
import Blog from "../pages/Blog";
import DetalleBlog from "../pages/DetalleBlog";
import Contacto from "../pages/Contacto";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import NoEncontrada from "../pages/NoEncontrada";
import MisCompras from "../pages/cliente/MisCompras";
import MiPerfil from "../pages/cliente/MiPerfil";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductos from "../pages/admin/AdminProductos";
import AdminUsuarios from "../pages/admin/AdminUsuarios";
import EstructuraPanel from "../components/panel/EstructuraPanel";
import { seccionesGestion } from "./seccionesPanel";
import ResumenGestion from "../pages/gestion/ResumenGestion";
import GestionVentas from "../pages/gestion/GestionVentas";
import GestionBoletas from "../pages/gestion/GestionBoletas";
import GestionInventario from "../pages/gestion/GestionInventario";
import GestionMensajes from "../pages/gestion/GestionMensajes";
import GestionBlog from "../pages/gestion/GestionBlog";
import FormularioBlog from "../pages/gestion/FormularioBlog";
import GestionUsuarios from "../pages/gestion/GestionUsuarios";

const BASE_TRABAJADOR = "/trabajador";

// Pantallas de gestión compartidas por el panel de trabajador y (en la fase 5) el de administrador
function rutasGestion(base) {
  return (
    <>
      <Route index element={<ResumenGestion base={base} />} />
      <Route path="ventas" element={<GestionVentas />} />
      <Route path="boletas" element={<GestionBoletas />} />
      <Route path="inventario" element={<GestionInventario />} />
      <Route path="mensajes" element={<GestionMensajes />} />
      <Route path="blog" element={<GestionBlog base={base} />} />
      <Route path="blog/nuevo" element={<FormularioBlog base={base} />} />
      <Route path="blog/:id/editar" element={<FormularioBlog base={base} />} />
      <Route path="usuarios" element={<GestionUsuarios />} />
    </>
  );
}

function RutasApp({ sesion, onIniciarSesion, carrito }) {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Productos onAgregar={carrito.agregarProducto} />} />
      <Route path="/productos/:id" element={<DetalleProducto onAgregar={carrito.agregarProducto} />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<DetalleBlog />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login onIniciarSesion={onIniciarSesion} />} />

      {/* Cualquier usuario con sesión */}
      <Route element={<RutaProtegida sesion={sesion} />}>
        <Route path="/mi-perfil" element={<MiPerfil />} />
      </Route>

      {/* Cliente */}
      <Route element={<RutaProtegida sesion={sesion} roles={[ROLES.CLIENTE]} />}>
        <Route path="/carrito" element={<Carrito carrito={carrito} />} />
        <Route path="/checkout" element={<Checkout carrito={carrito} />} />
        <Route path="/pago-exitoso/:ventaId" element={<PagoExitoso />} />
        <Route path="/pago-error" element={<PagoError />} />
        <Route path="/mis-compras" element={<MisCompras />} />
      </Route>

      {/* Trabajador (el administrador también puede entrar) */}
      <Route element={<RutaProtegida sesion={sesion} roles={[ROLES.ADMINISTRADOR, ROLES.TRABAJADOR]} />}>
        <Route path={BASE_TRABAJADOR}
          element={<EstructuraPanel titulo="Panel trabajador" secciones={seccionesGestion(BASE_TRABAJADOR)} />}>
          {rutasGestion(BASE_TRABAJADOR)}
        </Route>
      </Route>

      {/* Administrador */}
      <Route element={<RutaProtegida sesion={sesion} roles={[ROLES.ADMINISTRADOR]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
      </Route>

      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default RutasApp;
