import { Navigate, Outlet, useLocation } from "react-router-dom";

function RutaProtegida({ sesion, roles }) {
  const ubicacion = useLocation();

  if (!sesion) {
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
  }
  if (roles && !roles.includes(sesion.rol)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default RutaProtegida;
