import { useEffect, useEffectEvent, useState } from "react";

// Cuenta regresiva de "segundosIniciales" mientras "activa" sea verdadero; al llegar a cero ejecuta "alTerminar".
function useCuentaRegresiva(activa, segundosIniciales, alTerminar) {
  const [segundos, setSegundos] = useState(segundosIniciales);
  const terminar = useEffectEvent(alTerminar);

  useEffect(() => {
    if (!activa) return;
    const temporizador = setTimeout(() => {
      if (segundos > 1) setSegundos((actual) => actual - 1);
      else terminar();
    }, 1000);
    return () => clearTimeout(temporizador);
  }, [activa, segundos]);

  return { segundos, reiniciar: () => setSegundos(segundosIniciales) };
}

export default useCuentaRegresiva;
