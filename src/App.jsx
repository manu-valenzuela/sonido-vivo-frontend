import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import RutasApp from "./routes/RutasApp";
import useSesion from "./hooks/useSesion";
import useCarrito from "./hooks/useCarrito";

function App() {
  const { sesion, iniciarSesion, cerrarSesion } = useSesion();
  const carrito = useCarrito();

  return (
    <>
      <Navegacion sesion={sesion} onCerrarSesion={cerrarSesion} />
      <main className="py-4">
        <RutasApp sesion={sesion} onIniciarSesion={iniciarSesion} carrito={carrito} />
      </main>
      <PiePagina />
    </>
  );
}

export default App;
