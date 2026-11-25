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
import PanelTrabajador from "../pages/trabajador/PanelTrabajador";

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
        <Route path="/trabajador" element={<PanelTrabajador />} />
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
