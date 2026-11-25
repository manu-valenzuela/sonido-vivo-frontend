# Utils

Acá es necesario ubicar las funciones que se puedan extraer de nuestros componentes, como las funciones de guardado de formularios, lectura de datos, validaciones, menús desplegables, etc y sus respectivos tests. 

Debemos mantener un registro de las funciones y tests que vayamos creando, que bien podría ir en este mismo documento, describiendo brevemente lo que hacen y **sobre todo quién lo hizo. Servirá para presentar.**

validacionTexto.js      :   Este script contiene funciones para validar todos los textos según largo y composición (letras, letras y números y/o símbolos). Es utilizable para cualquier campo, junto con otras validaciones propias de la naturaleza del mismo.

## Tests

validarRegistro.spec.js
    validarRegistro     :   comprueba cada regla del formulario de registro (nombre, apellidos, RUN, región y comuna, email, dirección y contraseña).

Nuevos tests:

    Verificar el cambio de estado en formularios al agregar texto.
    Verificar que se ejecute un error solo cuando hay error
    Verificar el cambio de estado en una página al ejecutarse una acción
    
