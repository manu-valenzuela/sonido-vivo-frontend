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
import EstructuraPanel from "../components/panel/EstructuraPanel";
import { seccionesGestion, seccionesAdministrador } from "./seccionesPanel";
import ResumenGestion from "../pages/gestion/ResumenGestion";
import GestionVentas from "../pages/gestion/GestionVentas";
import GestionBoletas from "../pages/gestion/GestionBoletas";
import GestionInventario from "../pages/gestion/GestionInventario";
import GestionMensajes from "../pages/gestion/GestionMensajes";
import GestionBlog from "../pages/gestion/GestionBlog";
import FormularioBlog from "../pages/gestion/FormularioBlog";
import GestionUsuarios from "../pages/gestion/GestionUsuarios";
import FormularioUsuario from "../pages/gestion/FormularioUsuario";
import GestionProductos from "../pages/gestion/GestionProductos";
import FormularioProducto from "../pages/gestion/FormularioProducto";
import GestionCategoriasMarcas from "../pages/gestion/GestionCategoriasMarcas";
import GestionReportes from "../pages/gestion/GestionReportes";
import DetalleReporte from "../pages/gestion/DetalleReporte";

const BASE_TRABAJADOR = "/trabajador";
const BASE_ADMIN = "/admin";

// Pantallas de gestión compartidas por ambos paneles. Con esAdmin se muestran las acciones exclusivas del administrador.
function rutasGestion(base, sesion, esAdmin = false) {
  return (
    <>
      <Route index element={<ResumenGestion base={base} />} />
      <Route path="ventas" element={<GestionVentas esAdmin={esAdmin} />} />
      <Route path="boletas" element={<GestionBoletas />} />
      <Route path="inventario" element={<GestionInventario />} />
      <Route path="mensajes" element={<GestionMensajes esAdmin={esAdmin} />} />
      <Route path="blog" element={<GestionBlog base={base} esAdmin={esAdmin} />} />
      <Route path="blog/nuevo" element={<FormularioBlog base={base} />} />
      <Route path="blog/:id/editar" element={<FormularioBlog base={base} />} />
      <Route path="usuarios" element={<GestionUsuarios base={base} esAdmin={esAdmin} emailSesion={sesion?.email} />} />
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
          {rutasGestion(BASE_TRABAJADOR, sesion)}
        </Route>
      </Route>

      {/* Administrador */}
      <Route element={<RutaProtegida sesion={sesion} roles={[ROLES.ADMINISTRADOR]} />}>
        <Route path={BASE_ADMIN}
          element={<EstructuraPanel titulo="Panel administrador" secciones={seccionesAdministrador(BASE_ADMIN)} />}>
          {rutasGestion(BASE_ADMIN, sesion, true)}
          <Route path="productos" element={<GestionProductos base={BASE_ADMIN} />} />
          <Route path="productos/nuevo" element={<FormularioProducto base={BASE_ADMIN} />} />
          <Route path="productos/:id/editar" element={<FormularioProducto base={BASE_ADMIN} />} />
          <Route path="categorias-marcas" element={<GestionCategoriasMarcas />} />
          <Route path="usuarios/nuevo" element={<FormularioUsuario base={BASE_ADMIN} />} />
          <Route path="usuarios/:id/editar" element={<FormularioUsuario base={BASE_ADMIN} />} />
          <Route path="reportes" element={<GestionReportes base={BASE_ADMIN} />} />
          <Route path="reportes/:id" element={<DetalleReporte base={BASE_ADMIN} />} />
        </Route>
      </Route>

      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default RutasApp;
