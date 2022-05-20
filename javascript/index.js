var miSaludo = "\t\thola mundito\n\n";
var miSustantivo = "bicleta";
var miAdjetivo = "pequeña";
var miVerbo = "volo";
var miAdverbio = "lentamente";

console.log(miSaludo.toUpperCase());

var Nombre = ['Jose', 'Alvaro', 'Cedeño', 'Panchana'];
var Edad = 32;

console.log("Nombre y Apellidos : ", Nombre.join(' '));
console.log("\n");
for (let index = 0; index < Nombre.length; index++) {
    const element = Nombre[index];
    console.log(index + " : " +element)
};

/*
La bicilceta pequeña volo a tienda lentamente
*/
console.log("\nLa edad es : ", Edad);

var palabrasLocas = "La " + miSustantivo + " " + miAdjetivo + " " + miVerbo + " a la tienda " + miAdverbio + ".";

