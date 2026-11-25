import { useEffect, useState } from "react";

// Ejecuta una función de servicio y expone su resultado, el estado de carga y el error.
// "dependencias" indica cuándo volver a consultar la API (por ejemplo, al cambiar un filtro).
function useCargaApi(funcionServicio, dependencias = []) {
  const [version, setVersion] = useState(0);
  const [resultado, setResultado] = useState({ clave: null, datos: null, error: "" });
  const clave = JSON.stringify([...dependencias, version]);

  useEffect(() => {
    let vigente = true;
    funcionServicio()
      .then((datos) => vigente && setResultado({ clave, datos, error: "" }))
      .catch((e) => vigente && setResultado({ clave, datos: null, error: e.message }));
    return () => {
      vigente = false;
    };
    // funcionServicio cambia en cada render; la consulta se repite solo cuando cambia "clave"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  return {
    datos: resultado.datos,
    error: resultado.error,
    cargando: resultado.clave !== clave,
    recargar: () => setVersion((actual) => actual + 1),
  };
}

export default useCargaApi;
