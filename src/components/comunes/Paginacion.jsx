import { Pagination } from "react-bootstrap";

function Paginacion({ paginaActual, totalPaginas, onCambiar }) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, indice) => indice + 1);

  return (
    <Pagination className="justify-content-center mt-4 flex-wrap">
      <Pagination.Prev disabled={paginaActual === 1} onClick={() => onCambiar(paginaActual - 1)} />
      {paginas.map((pagina) => (
        <Pagination.Item key={pagina} active={pagina === paginaActual} onClick={() => onCambiar(pagina)}>
          {pagina}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={paginaActual === totalPaginas} onClick={() => onCambiar(paginaActual + 1)} />
    </Pagination>
  );
}

export default Paginacion;
