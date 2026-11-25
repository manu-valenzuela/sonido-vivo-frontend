import { validarRegistro } from "./validarRegistro";

const datosValidosBase = {
  nombre: "Juan",
  apellidos: "Perez Soto",
  run: "123456785",
  regionId: "7",
  comunaId: "131",
  email: "juan@duoc.cl",
  direccion: "Av. Siempre Viva 123",
  contrasena: "123456",
};

describe("validarRegistro()", () => {
  test("Debe retornar un objeto vacío si todos los datos son válidos", () => {
    expect(validarRegistro(datosValidosBase)).toEqual({});
  });

  describe("Validación de Nombre", () => {
    test("Debe indicar error si el nombre está vacío", () => {
      expect(validarRegistro({ ...datosValidosBase, nombre: "" }).nombre).toBe("Nombre obligatorio");
    });
    test("Debe indicar error si el nombre contiene números", () => {
      expect(validarRegistro({ ...datosValidosBase, nombre: "Juan123" }).nombre).toBe("El nombre solo puede contener letras");
    });
    test("Debe indicar error si el nombre excede los 50 caracteres", () => {
      expect(validarRegistro({ ...datosValidosBase, nombre: "a".repeat(51) }).nombre).toBe("El nombre no puede exceder 50 caracteres");
    });
  });

  describe("Validación de Apellidos", () => {
    test("Debe indicar error si los apellidos están vacíos", () => {
      expect(validarRegistro({ ...datosValidosBase, apellidos: "" }).apellidos).toBe("Apellidos obligatorios");
    });
    test("Debe indicar error si los apellidos contienen símbolos", () => {
      expect(validarRegistro({ ...datosValidosBase, apellidos: "Perez!" }).apellidos).toBe("Los apellidos solo pueden contener letras");
    });
    test("Debe indicar error si los apellidos exceden los 100 caracteres", () => {
      expect(validarRegistro({ ...datosValidosBase, apellidos: "a".repeat(101) }).apellidos).toBe("Los apellidos no pueden exceder 100 caracteres");
    });
  });

  describe("Validación de RUN", () => {
    test("Debe indicar error si el RUN está vacío", () => {
      expect(validarRegistro({ ...datosValidosBase, run: "" }).run).toBe("RUN obligatorio");
    });
    test("Debe indicar error si el RUN tiene menos de 7 caracteres", () => {
      expect(validarRegistro({ ...datosValidosBase, run: "123456" }).run).toBe("El RUN debe contener entre 7 y 9 caracteres");
    });
    test("Debe indicar error si el RUN tiene más de 9 caracteres", () => {
      expect(validarRegistro({ ...datosValidosBase, run: "1234567890" }).run).toBe("El RUN debe contener entre 7 y 9 caracteres");
    });
    test("Debe indicar error si el RUN tiene guion", () => {
      expect(validarRegistro({ ...datosValidosBase, run: "1234567-5" }).run).toBe("Ingrese el RUN sin puntos ni guion");
    });
    test("Debe indicar error si el dígito verificador no corresponde", () => {
      expect(validarRegistro({ ...datosValidosBase, run: "11111111" }).run).toBe("RUN inválido");
    });
  });

  describe("Validación de Región y Comuna", () => {
    test("Debe indicar error si la región está vacía", () => {
      expect(validarRegistro({ ...datosValidosBase, regionId: "" }).regionId).toBe("Región obligatoria");
    });
    test("Debe indicar error si la comuna está vacía", () => {
      expect(validarRegistro({ ...datosValidosBase, comunaId: "" }).comunaId).toBe("Comuna obligatoria");
    });
  });

  describe("Validación de Email", () => {
    test("Debe indicar error si el email está vacío", () => {
      expect(validarRegistro({ ...datosValidosBase, email: "" }).email).toBe("Email obligatorio");
    });
    test("Debe indicar error si el email no contiene @", () => {
      expect(validarRegistro({ ...datosValidosBase, email: "juanduoc.cl" }).email).toBe("El email debe contener un @");
    });
    test("Debe indicar error si el dominio no es permitido", () => {
      expect(validarRegistro({ ...datosValidosBase, email: "juan@hotmail.com" }).email).toBe("El email debe ser @gmail.com, @duoc.cl o @profesor.duoc.cl");
    });
    test("Debe ser válido para los distintos dominios permitidos", () => {
      expect(validarRegistro({ ...datosValidosBase, email: "juan@gmail.com" }).email).toBeUndefined();
      expect(validarRegistro({ ...datosValidosBase, email: "juan@profesor.duoc.cl" }).email).toBeUndefined();
    });
    test("Debe indicar error si el email excede los 100 caracteres", () => {
      expect(validarRegistro({ ...datosValidosBase, email: "a".repeat(95) + "@duoc.cl" }).email).toBe("El email no puede exceder 100 caracteres");
    });
  });

  describe("Validación de Dirección", () => {
    test("Debe indicar error si la dirección está vacía", () => {
      expect(validarRegistro({ ...datosValidosBase, direccion: "" }).direccion).toBe("Dirección obligatoria");
    });
    test("Debe indicar error si contiene caracteres no permitidos", () => {
      expect(validarRegistro({ ...datosValidosBase, direccion: "Calle Falsa #123!" }).direccion).toBe("La dirección contiene caracteres no permitidos");
    });
    test("Debe indicar error si excede los 300 caracteres", () => {
      expect(validarRegistro({ ...datosValidosBase, direccion: "a".repeat(301) }).direccion).toBe("La dirección no puede exceder 300 caracteres");
    });
  });

  describe("Validación de Contraseña", () => {
    test("Debe indicar error si la contraseña está vacía", () => {
      expect(validarRegistro({ ...datosValidosBase, contrasena: "" }).contrasena).toBe("Contraseña obligatoria");
    });
    test("Debe indicar error si tiene menos de 6 caracteres", () => {
      expect(validarRegistro({ ...datosValidosBase, contrasena: "12345" }).contrasena).toBe("La contraseña debe contener entre 6 y 100 caracteres");
    });
    test("Debe aceptar contraseñas con longitud adecuada", () => {
      expect(validarRegistro({ ...datosValidosBase, contrasena: "Admin1234!" }).contrasena).toBeUndefined();
    });
  });
});
