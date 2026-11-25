import { useState } from "react";

// Ejecuta acciones que modifican datos (crear, actualizar, cambiar estado) y expone su resultado.
// "ejecutar" devuelve true si la acción terminó bien, para que la página decida si recargar o navegar.
function useAccionApi() {
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  async function ejecutar(operacion, mensajeExito = "") {
    setProcesando(true);
    setError("");
    setExito("");
    try {
      await operacion();
      setExito(mensajeExito);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setProcesando(false);
    }
  }

  function limpiar() {
    setError("");
    setExito("");
  }

  return { ejecutar, procesando, error, exito, limpiar };
}

export default useAccionApi;
