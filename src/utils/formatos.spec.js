import { formatearFecha, formatearPeriodo } from "./fecha";
import { formatearMonto } from "./precio";
import { siguienteEstadoVenta } from "./estados";

describe("formatearFecha()", () => {
  test("una fecha sin hora no se corre al día anterior", () => {
    expect(formatearFecha("2026-11-01")).toBe("1 de noviembre de 2026");
  });
  test("acepta fechas con hora y valores vacíos", () => {
    expect(formatearFecha("2026-09-04T10:00:00")).toBe("4 de septiembre de 2026");
    expect(formatearFecha(null)).toBe("");
  });
});

describe("formatearPeriodo()", () => {
  test("sin fechas indica todo el historial", () => {
    expect(formatearPeriodo(null, null)).toBe("Todo el historial");
  });
  test("con una sola fecha completa el otro extremo", () => {
    expect(formatearPeriodo("2026-11-01", null)).toBe("1 de noviembre de 2026 – hoy");
  });
});

describe("formatearMonto()", () => {
  test("muestra el cero como $0", () => {
    expect(formatearMonto(0)).toBe("$0");
    expect(formatearMonto(1599980)).toBe("$1.599.980");
  });
});

describe("siguienteEstadoVenta()", () => {
  test("sigue el flujo de despacho a domicilio", () => {
    expect(siguienteEstadoVenta({ estado: "PAGADA", tipoDespacho: "DOMICILIO" })).toBe("EN_PREPARACION");
    expect(siguienteEstadoVenta({ estado: "EN_PREPARACION", tipoDespacho: "DOMICILIO" })).toBe("ENVIADA");
    expect(siguienteEstadoVenta({ estado: "ENVIADA", tipoDespacho: "DOMICILIO" })).toBe("ENTREGADA");
  });
  test("el retiro en tienda no pasa por ENVIADA", () => {
    expect(siguienteEstadoVenta({ estado: "EN_PREPARACION", tipoDespacho: "RETIRO_TIENDA" })).toBe("ENTREGADA");
  });
  test("las ventas terminadas, anuladas o rechazadas no avanzan", () => {
    ["ENTREGADA", "ANULADA", "RECHAZADA"].forEach((estado) =>
      expect(siguienteEstadoVenta({ estado, tipoDespacho: "DOMICILIO" })).toBeNull());
  });
});
