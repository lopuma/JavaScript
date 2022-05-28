////////////////////////////////////////////////////////////////////////////////
// REFERENCIAS
let pantalla = document.querySelector(".pantalla");
// Al loro con esto: estamos obteniendo las referencias a elementos mediante alguno de sus ATRIBUTOS (data-accion, data-texto). Mira en la referencia de selectores CSS del W3Schools para más información
let btnSeta = document.querySelector("[data-accion='seta']");
let btnReset = document.querySelector("[data-accion='reset']");
let btnBorrar = document.querySelector("[data-accion='borrar']");
let btnIgual = document.querySelector("[data-accion='igual']");
// La guinda del pastel. querySelector obtiene UNA referencia a un elemento, pero querySelectorAll obtiene UN ARRAY DE REFERENCIAS a varios elementos. Se usa para obtener múltiples referencias a la vez (por ejemplo, a todos los enlaces de una página)
let arrBtnTexto = document.querySelectorAll("[data-texto]");
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES
// Esta variable contendrá la EXPRESIÓN a ejecutar/evaluar/interpretar por JS
let expresion = "";
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA LOS BOTONES "NORMALES"
// Para asignar eventos o mierdas a muchos elementos a la vez, si están en un array, podemos usar un BUCLE
for(let item of arrBtnTexto) {
	item.onclick = function(evento) {
		// "this" es una REFERENCIA al propio elemento que ha recibido el evento click
		// Es una palabra especial de JS. Es una REFERENCIA al objeto desde donde se ha llamado a esta función. En este caso, ese objeto es el item actual del bucle.
		// PREGUNTA: ¿y por qué no ponemos "item" en ligar de "this"? ¿Eh? ¿Eh?
		expresion += this.dataset.texto;
		pantalla.innerHTML = expresion;
		// Y por cierto: ese parámetro "evento", que aquí no estamos usando, quédate con él, lo verás a menudo
		// Es un parámetro que JS le pasa por su cuenta a esta función, y contiene información extra acerca del evento que se ha producido, para que la usemos si queremos
		// Tiene muchas propiedades. Una de las más importantes es .target, que es una REFERENCIA al elemento HTML donde se ha producido el evento
		console.log(evento)
	}
	
	// -------------------------------------------------------------------------
	// Esto es para usar la librería Mousetrap. Si lo eliminas, no podrás manejar la calculadora con el teclado
	let caracter = item.dataset.texto;
	Mousetrap.bind(caracter, function(evento){
		console.log(evento);
		expresion += evento.key;
		pantalla.innerHTML = expresion;
	})
	// -------------------------------------------------------------------------
	
}
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA BOTONES ESPECIALES
btnSeta.onclick = function() {
	// ...
}
btnReset.onclick = function() {
	pantalla.innerHTML = "0";
	expresion = "";
}
btnBorrar.onclick = function() {
	// Aquí hay que eliminar el último caracter introducido
	// Hay muchos métodos: substring, substr, slice, o split("").pop().join("")
	expresion = expresion.slice(0,-1);
	pantalla.innerHTML = expresion;
}
btnIgual.onclick = function() {
	// Ejecutamos/evaluamos/interpretamos/resolvemos la expresión
	//var resultado = eval(expresion);

	// Pero lo anterior sin más, es rpoblemático. ¿Por qué?
		// - hay expresiones que provocan un error de JS
		// - hay operaciones que me devuelven demasiados decimales. Habría que limitarlos
		// - Después de evaluar una expresión, ésta debería resetearse. Si no, iremos añadiendo 	caracteres a la expresión anterior
	
	// La estructura try/catch se usa para hacer código a prueba de errores de ejecución
	try {
		// Al estar en un bloque try, se intentará ejecutar esto...
		var resultado = eval(expresion);
		// Ahora vamos a "recortar" ese número para que no ocupe más de 12 caracteres (de lo contrario, se nos podría salir de los límites de la pantalla). Una forma de hacerlo es usar la función substr
		// Pero substr se aplica a CADENAS, mientras que resultado es un NÚMERO.
		// Solución: convierto resultado a una CADENA (con toString()) antes de aplicarle substr
		pantalla.innerHTML = resultado.toString().substr(0,12);
		// Traducción de la línea anterior: resultado convertido a CADENA y limitado a 12 caracteres empezando por el 1º (0)
	} catch(error) {
		// ... pero si hay errores, entonces ejecuta esto otro
		pantalla.innerHTML = "ERROR";
		//console.log(error); // Esto contiene info sobre el error
	}
	expresion = "";	// reseteamos la expresión
}
////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////
// EVENTOS DEL TECLADO
// De nuevo, esto no es estrictamente necesario, pero si no lo pones no podrás usar la calculadora con el teclado
Mousetrap.bind("enter", function() {
	// Podría copiar y pegar aquí todo el código del btnIgual.onclick. Pero es más rápido hacerle click a ese botón desde JS. Así es como podemos desencadenar un evento click a lo bestia (hay una forma más "académica", pero es más compleja, y hace lo mismo
	btnIgual.click();
})
Mousetrap.bind("escape", function() {
	btnReset.click();
})
Mousetrap.bind("backspace", function() {
	btnBorrar.click();
})
Mousetrap.bind("s", function() {
	btnSeta.click();
})
/////////////////////////////////////////////////////////////////////////

