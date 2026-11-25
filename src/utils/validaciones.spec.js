import { validarLogin } from "./validarLogin";
import { validarContacto } from "./validarContacto";
import { validarCheckout } from "./validarCheckout";
import { validarBlog } from "./validarBlog";
import { validarProducto } from "./validarProducto";
import { validarUsuario } from "./validarUsuario";
import { validarReporte } from "./validarReporte";

describe("validarLogin()", () => {
  test("acepta credenciales completas", () => {
    expect(validarLogin({ email: "admin@duoc.cl", contrasena: "Admin1234!" })).toEqual({});
  });
  test("exige email con dominio permitido y contraseña", () => {
    const errores = validarLogin({ email: "admin@hotmail.com", contrasena: "" });
    expect(errores.email).toMatch(/@gmail.com/);
    expect(errores.contrasena).toBe("Contraseña obligatoria");
  });
});

describe("validarContacto()", () => {
  const valido = { nombre: "Camila", apellidos: "Fuentes", email: "camila@empresa.com", mensaje: "Quisiera saber si tienen stock." };
  test("acepta cualquier dominio de email", () => {
    expect(validarContacto(valido)).toEqual({});
  });
  test("rechaza mensajes con caracteres no permitidos o demasiado largos", () => {
    expect(validarContacto({ ...valido, mensaje: "Hola <script>" }).mensaje).toBe("El mensaje contiene caracteres inválidos");
    expect(validarContacto({ ...valido, mensaje: "a".repeat(501) }).mensaje).toBe("El mensaje no puede exceder 500 caracteres");
  });
});

describe("validarCheckout()", () => {
  test("exige un tipo de despacho válido", () => {
    expect(validarCheckout({ tipoDespacho: "", lugarDespacho: "" }).tipoDespacho).toBeDefined();
    expect(validarCheckout({ tipoDespacho: "RETIRO_TIENDA", lugarDespacho: "" })).toEqual({});
  });
  test("la dirección alternativa es opcional pero se valida si se escribe", () => {
    expect(validarCheckout({ tipoDespacho: "DOMICILIO", lugarDespacho: "Av. Prat 123, Valparaíso" })).toEqual({});
    expect(validarCheckout({ tipoDespacho: "DOMICILIO", lugarDespacho: "a".repeat(251) }).lugarDespacho).toMatch(/250/);
  });
});

describe("validarBlog()", () => {
  const valido = {
    titulo: "Título", resumen: "Resumen", imagen: "https://ejemplo.cl/foto.jpg", parrafo1: "Uno",
    subtitulo1: "Sub 1", parrafo2: "Dos", cita: "Cita", subtitulo2: "Sub 2", parrafo3: "Tres",
  };
  test("acepta un artículo completo", () => {
    expect(validarBlog(valido)).toEqual({});
  });
  test("exige todos los campos y una URL de imagen", () => {
    expect(Object.keys(validarBlog({ ...valido, titulo: "", cita: "" }))).toEqual(["titulo", "cita"]);
    expect(validarBlog({ ...valido, imagen: "foto.jpg" }).imagen).toMatch(/URL/);
  });
});

describe("validarProducto()", () => {
  const valido = { id: "GA035", nombre: "Guitarra", categoriaId: "1", marcaId: "2", precio: "99990", stock: "5", descripcion: "", imagen: "" };
  test("acepta un producto completo", () => {
    expect(validarProducto(valido, false)).toEqual({});
  });
  test("el ID se exige al crear, no al editar", () => {
    expect(validarProducto({ ...valido, id: "" }, false).id).toBe("El ID es obligatorio");
    expect(validarProducto({ ...valido, id: "" }, true).id).toBeUndefined();
  });
  test("precio y stock deben ser enteros no negativos", () => {
    const errores = validarProducto({ ...valido, precio: "-1", stock: "2.5" }, false);
    expect(errores.precio).toBeDefined();
    expect(errores.stock).toBeDefined();
  });
});

describe("validarUsuario()", () => {
  const valido = {
    nombre: "Paula", apellidos: "Soto", run: "123456785", regionId: "7", comunaId: "131",
    email: "paula@duoc.cl", direccion: "Calle 1", contrasena: "Clave123", rol: "TRABAJADOR", telefono: "",
  };
  test("al crear exige contraseña; al editar es opcional", () => {
    expect(validarUsuario({ ...valido, contrasena: "" }, false).contrasena).toBe("Contraseña obligatoria");
    expect(validarUsuario({ ...valido, contrasena: "" }, true)).toEqual({});
  });
  test("exige un rol existente", () => {
    expect(validarUsuario({ ...valido, rol: "GERENTE" }, false).rol).toBe("Selecciona un rol");
  });
});

describe("validarReporte()", () => {
  test("todos los campos son opcionales", () => {
    expect(validarReporte({ titulo: "", fechaInicio: "", fechaFin: "" })).toEqual({});
  });
  test("la fecha de término no puede ser anterior a la de inicio", () => {
    expect(validarReporte({ titulo: "", fechaInicio: "2026-12-01", fechaFin: "2026-11-01" }).fechaFin).toBeDefined();
  });
});
