import { Badge, Card } from "react-bootstrap";
import TablaDetalleProductos from "./TablaDetalleProductos";
import { formatearPrecio } from "../../utils/precio";
import { formatearFecha } from "../../utils/fecha";

function FilaTotal({ etiqueta, valor, destacada = false }) {
  return (
    <tr className={destacada ? "fw-bold fs-5" : ""}>
      <td colSpan={3} className="text-end">{etiqueta}</td>
      <td className="text-end">{formatearPrecio(valor)}</td>
    </tr>
  );
}

function DetalleBoleta({ boleta }) {
  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span className="fw-bold">Boleta N° {boleta.folio}</span>
        <Badge bg={boleta.estado === "ANULADA" ? "secondary" : "success"}>{boleta.estado}</Badge>
      </Card.Header>
      <Card.Body>
        <p className="mb-1"><strong>Fecha de emisión:</strong> {formatearFecha(boleta.fechaEmision)}</p>
        <p className="mb-1"><strong>Cliente:</strong> {boleta.compradorNombreCompleto} ({boleta.compradorEmail})</p>
        <p className="mb-3"><strong>Medio de pago:</strong> {boleta.metodoPago}</p>
        <TablaDetalleProductos
          detalles={boleta.detalles}
          pie={
            <>
              <FilaTotal etiqueta="Neto" valor={boleta.montoNeto} />
              <FilaTotal etiqueta="IVA (19%)" valor={boleta.iva} />
              <FilaTotal etiqueta="Total" valor={boleta.montoTotal} destacada />
            </>
          }
        />
      </Card.Body>
    </Card>
  );
}

export default DetalleBoleta;
