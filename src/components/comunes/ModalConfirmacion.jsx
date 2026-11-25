import { Button, Modal } from "react-bootstrap";

function ModalConfirmacion({ mostrar, titulo, mensaje, textoConfirmar = "Confirmar", variante = "danger", procesando, onConfirmar, onCancelar }) {
  return (
    <Modal show={mostrar} onHide={onCancelar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelar} disabled={procesando}>Cancelar</Button>
        <Button variant={variante} onClick={onConfirmar} disabled={procesando}>
          {procesando ? "Procesando..." : textoConfirmar}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmacion;
