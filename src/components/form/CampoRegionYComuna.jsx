import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { listarRegiones, listarComunas } from "../../services/ubicacionService";

function CampoRegionYComuna({ datos, errores, onChange }) {
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    listarRegiones().then(setRegiones).catch((e) => setErrorCarga(e.message));
  }, []);

  useEffect(() => {
    if (!datos.regionId) return;
    listarComunas(datos.regionId).then(setComunas).catch((e) => setErrorCarga(e.message));
  }, [datos.regionId]);

  function cambiarRegion(evento) {
    onChange(evento);
    onChange({ target: { name: "comunaId", value: "" } });
  }

  const comunasVisibles = datos.regionId ? comunas : [];

  return (
    <>
      <Form.Group className="mb-3" controlId="regionId">
        <Form.Label>Región:</Form.Label>
        <Form.Select
          name="regionId"
          value={datos.regionId || ""}
          onChange={cambiarRegion}
          isInvalid={Boolean(errores.regionId)}
        >
          <option value="">-- Selecciona región --</option>
          {regiones.map((region) => (
            <option key={region.id} value={region.id}>{region.nombre}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errores.regionId}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="comunaId">
        <Form.Label>Comuna:</Form.Label>
        <Form.Select
          name="comunaId"
          value={datos.comunaId || ""}
          onChange={onChange}
          disabled={!datos.regionId}
          isInvalid={Boolean(errores.comunaId)}
        >
          <option value="">
            {datos.regionId ? "-- Selecciona comuna --" : "-- Primero elige región --"}
          </option>
          {comunasVisibles.map((comuna) => (
            <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errores.comunaId}</Form.Control.Feedback>
        {errorCarga && <Form.Text className="text-danger">{errorCarga}</Form.Text>}
      </Form.Group>
    </>
  );
}

export default CampoRegionYComuna;
