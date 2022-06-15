////////////////////////////////////////////////////////////////////////////////
// REFERENCIAS
let pantalla = document.querySelector(".pantalla");
let btnSeta = document.querySelector("[data-accion='seta']");
let btnReset = document.querySelector("[data-accion='reset']");
let btnBorrar = document.querySelector("[data-accion='borrar']");
let btnIgual = document.querySelector("[data-accion='igual']");
let arrBtnTexto = document.querySelectorAll("[data-texto]");
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES
let expresion = "";
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA LOS BOTONES "NORMALES"
for(let item of arrBtnTexto) {
	item.onclick = function(evento) {
		expresion += this.dataset.texto;
		pantalla.innerHTML = expresion;
		console.log(evento)
	}
	
	let caracter = item.dataset.texto;
	Mousetrap.bind(caracter, function(evento){
		console.log(evento);
		expresion += evento.key;
		pantalla.innerHTML = expresion;
	})
	
}
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA BOTONES ESPECIALES
btnSeta.onclick = function() {
}
btnReset.onclick = function() {
	pantalla.innerHTML = "0";
	expresion = "";
}
btnBorrar.onclick = function() {
	expresion = expresion.slice(0,-1);
	pantalla.innerHTML = expresion;
}
btnIgual.onclick = function() {
	try {
		var resultado = eval(expresion);
		pantalla.innerHTML = resultado.toString().substr(0,12);
	} catch(error) {
		pantalla.innerHTML = "ERROR";
	}
	expresion = "";
}
////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////
// EVENTOS DEL TECLADO
Mousetrap.bind("enter", function() {
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


