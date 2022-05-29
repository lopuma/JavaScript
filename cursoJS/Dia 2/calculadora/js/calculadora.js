////////////////////////////////////////////////////////////////////////////////
// REFERENCIAS
let pantalla = document.querySelector(".pantalla");
let teclado = document.querySelector(".pantalla");
let calculadora = document.querySelector(".calculadora");
let btnSeta = document.querySelector("[data-accion='seta']");
let btnReset = document.querySelector("[data-accion='reset']");
let btnBorrar = document.querySelector("[data-accion='borrar']");
let btnIgual = document.querySelector("[data-accion='igual']");
let arrBtnTexto = document.querySelectorAll("[data-texto]");
let btnExpandir = document.getElementById('expandir');

///////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES
let expresion = "0";
let cero = "0";
let igual = "";
var voltea = false;
var exp = false;
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA LOS BOTONES "NORMALES"
for(let item of arrBtnTexto) {
	item.onclick = function(evento) {
		inicializarExpresion(); 
		expresion += this.dataset.texto;
		pantalla.innerHTML = expresion;
	}
	
	let caracter = item.dataset.texto;
	Mousetrap.bind(caracter, function(evento){
		inicializarExpresion(); 
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
	expresion = "0";
	pantalla.innerHTML = expresion;
	cero = "0";
	igual = "";
}

btnBorrar.onclick = function() {
	inicializarExpresion();
	expresion = expresion.slice(0, expresion.length -1);
	console.log(expresion)
	if ( expresion.length == 0 ){
		expresion = '0';
		cero = "0";
		igual = "";
		pantalla.innerHTML = expresion;
	} else {
		pantalla.innerHTML = expresion;
	}
	console.log(expresion);
}

btnIgual.onclick = function() {
	try {
		var resultado = eval(expresion);
		if ( expresion == '0' ){
			pantalla.innerHTML = "= " +expresion;
			expresion=resultado;
		} else {
			pantalla.innerHTML = "= " +resultado.toString().substr(0,12);
			igual = "= " +resultado.toString().substr(0,12)
		}
	} catch(error) {
		pantalla.innerHTML = "Expresión malformada";
		pantalla.style.fontSize = "200%"
		cero = '0';
		igual = "";
	}
}

btnExpandir.onclick = function() {
	let btn1Agrupar = document.getElementById("agr1");
	let btn2Agrupar = document.getElementById("agr2");
	let btnHistory = document.getElementById("hist");
	if (exp){
		btn1Agrupar.parentNode.removeChild(btn1Agrupar);
		btn2Agrupar.parentNode.removeChild(btn2Agrupar);
		btnHistory.parentNode.removeChild(btnHistory);
		exp = false;
	} else{
		txt1 = "("
		txt2 = ")"
		txt3 = "His"
		const btn1 = document.createElement("button");
		const btn2 = document.createElement("button")
		const btn3 = document.createElement("button")
		btn1.onclick = function(){
			inicializarExpresion(); 
			expresion += this.dataset.texto;
			pantalla.innerHTML = expresion;
		}
		btn2.onclick = function(){
			inicializarExpresion(); 
			expresion += this.dataset.texto;
			pantalla.innerHTML = expresion;
		}
		btn1.innerHTML = txt1;
		btn2.innerHTML = txt2;
		btn3.innerHTML = txt3;
		btn1.id = "agr1";
		btn2.id = "agr2";
		btn3.id = "hist";
		btn1.setAttributeNS("(", "data-texto", "(")
		btn2.setAttributeNS(")", "data-texto", ")")

		var parentDiv = btnExpandir.parentNode;
		parentDiv.insertBefore(btn1, btnExpandir);
		parentDiv.insertBefore(btn2, btnExpandir);
		parentDiv.insertBefore(btn3, btnExpandir);
		exp = true;
	}
}
/////////////////////////////////////////////////////////////////////////
// EVENTOS DEL TECLADO
Mousetrap.bind("enter", function() {
	btnIgual.click();
})
Mousetrap.bind("r", function() {
	btnReset.click();
})
Mousetrap.bind("backspace", function() {
	btnBorrar.click();
})
Mousetrap.bind("s", function() {
	btnSeta.click();
})
Mousetrap.bind("ñ", function() {
	if (!voltea){
		calculadora.style.transform = "rotate(180deg)";
		voltea = true;
	} else {
		calculadora.style.transform = "rotate(0deg)";
		voltea = false;
	}
})
Mousetrap.bind("(", function() {
	texto = "("
	inicializarExpresion(); 
	expresion += texto;
	pantalla.innerHTML = expresion;
})
Mousetrap.bind(")", function() {
	texto = ")"
	inicializarExpresion(); 
	expresion += texto;
	pantalla.innerHTML = expresion;
})

function inicializarExpresion() {
	pantalla.style.fontSize = "300%"
	valorExpresionInicial = cero.startsWith('0')
	valorResultadoInicial = igual.startsWith('=')
	if (valorExpresionInicial || valorResultadoInicial) {
		expresion = "";
		cero = "1";
		igual = "";
	}
}
/////////////////////////////////////////////////////////////////////////


