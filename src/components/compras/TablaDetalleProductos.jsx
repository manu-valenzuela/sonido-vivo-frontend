import { Table } from "react-bootstrap";
import { formatearPrecio } from "../../utils/precio";

// Sirve para detalles de venta, de boleta y de carrito: todos tienen nombreProducto, precioUnitario, cantidad y subtotal
function TablaDetalleProductos({ detalles, pie }) {
  return (
    <Table responsive size="sm" className="align-middle mb-0">
      <thead>
        <tr>
          <th>Producto</th>
          <th className="text-end">Precio</th>
          <th className="text-center">Cantidad</th>
          <th className="text-end">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {detalles.map((detalle) => (
          <tr key={detalle.id ?? detalle.productoId}>
            <td>{detalle.nombreProducto}</td>
            <td className="text-end">{formatearPrecio(detalle.precioUnitario)}</td>
            <td className="text-center">{detalle.cantidad}</td>
            <td className="text-end">{formatearPrecio(detalle.subtotal)}</td>
          </tr>
        ))}
      </tbody>
      {pie && <tfoot>{pie}</tfoot>}
    </Table>
  );
}

export default TablaDetalleProductos;
