import { useEffect, useState } from "react";
import { iniciarSesion as solicitarLogin } from "../services/authService";
import {
  guardarSesion, obtenerSesion, borrarSesion, EVENTO_SESION_EXPIRADA,
} from "../utils/sesion";

function useSesion() {
  const [sesion, setSesion] = useState(obtenerSesion);

  useEffect(() => {
    const alExpirar = () => setSesion(null);
    window.addEventListener(EVENTO_SESION_EXPIRADA, alExpirar);
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, alExpirar);
  }, []);

  async function iniciarSesion(credenciales) {
    const respuesta = await solicitarLogin(credenciales);
    const usuario = { email: respuesta.email, rol: respuesta.rol };
    guardarSesion(respuesta.token, usuario);
    setSesion(usuario);
    return usuario;
  }

  function cerrarSesion() {
    borrarSesion();
    setSesion(null);
  }

  return { sesion, iniciarSesion, cerrarSesion };
}

export default useSesion;
