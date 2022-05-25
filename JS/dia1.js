// cambiar el color a NAV
/*
var enlaces  = document.querySelectorAll(" nav A");
for(let item of enlaces){
    item.style.color="white";
}
*/

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

/* Bucle for (OF)

var notas = [2,4,5,6,8,7,4];

for(let i = 0; i < notas.length; i++){
    console.log("Notas es " +i);
}
*/

//  Generar archivos binario, se pasa 2 datos [ARRAY, objeto]
    //  var data = new Blob([JSON.stringify(datos)], {type: 'text/plain'})

// Crear URL a partir de umn objeto
    // var url = window.URL.createObjectURL(data)

// Elance, se crea un enlace al darle click, 
    // btnExport.href = url;

// Subir archivo a una web, crear un input "btn Examinar, idd yuyu"
// Personalizar css # yuyu { display:none}

// se puede simular eventos desde JS a HTML.

// event onchange, se ejecuta cuando se ha cambiado el valor de un objeto.

// event fileImportar.onchange = function(evento) {
	// Este evento se produce cuando hemos escogido un archivo con el input. La función recibe un parámetro (lo llamo "evento"), que es un objeto que contiene muchas cosas. 
	// evento.target.files[0] es un objeto File (nuevo en JS) con información sobre el archivo que hemos escogido
	//var archivo = evento.target.files[0];
	//console.log(archivo);
	//return;

    // Importa archivo y muestra por consola
    