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
var expandirAdd = false;
var divHistorial = ""
let historial = []
let totalHistorial = []
var switchOn = true;
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA LOS BOTONES "NORMALES"
for(let item of arrBtnTexto) {
	item.onclick = function(evento) {
		inicializarExpresion(); 
		expresion += this.dataset.texto;
		pantalla.innerHTML = expresion;
		btnReset.innerHTML = "C";
	}
	
	let caracter = item.dataset.texto;
	Mousetrap.bind(caracter, function(evento){
		inicializarExpresion(); 
		expresion += evento.key;
		pantalla.innerHTML = expresion;
		btnReset.innerHTML = "C";
	})
	
}
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA BOTONES ESPECIALES
btnSeta.onclick = function() {
}

btnReset.onclick = function(evento) {
	expresion = "0";
	pantalla.innerHTML = expresion;
	cero = "0";
	igual = "";
	console.log(btnReset.innerHTML);
	if ( btnReset.innerHTML == "AC" ){
		btnReset.innerHTML = "AC";
		console.log(btnReset.innerHTML);
		if (historial.length != 0) {
			deleteHistorial();
		}
	}else{
		btnReset.innerHTML = "AC";
	}
}

btnBorrar.onclick = function() {
	inicializarExpresion();
	expresion = expresion.slice(0, expresion.length -1);
	if ( expresion.length == 0 ){
		expresion = '0';
		cero = "0";
		igual = "";
		pantalla.innerHTML = expresion;
		btnReset.innerHTML = "AC";
	} else {
		pantalla.innerHTML = expresion;
	}
	
}

btnIgual.onclick = function() {
	try {
		var resultado = eval(expresion);
		if ( expresion == '0' ){
			pantalla.innerHTML = "= " +expresion;
			expresion=resultado;
		} else {
			pantalla.innerHTML = "= " +resultado.toString().substr(0,12);
			igual = "= " +resultado
			historial.push(expresion);
			totalHistorial.push(expresion);
		}
	} catch(error) {
		pantalla.innerHTML = "Error";
		pantalla.style.fontSize = "200%"
		cero = '0';
		igual = "";
	}
	if (switchOn){
		crearHistorial();
		switchOn = false;
	}
	lenHisto =  historial.length;
	if ( lenHisto <= 3 ){
		añadirHistorial();
	} else{
		historial.shift()
		añadirHistorial();
	}
	
}

btnExpandir.onclick = function() {
	let btn1Agrupar = document.getElementById("agr1");
	let btn2Agrupar = document.getElementById("agr2");
	let btnHistory = document.getElementById("hist");
	if (expandirAdd){
		btn1Agrupar.parentNode.removeChild(btn1Agrupar);
		btn2Agrupar.parentNode.removeChild(btn2Agrupar);
		btnHistory.parentNode.removeChild(btnHistory);
		expandirAdd = false;
	} else{
		txt1 = "("
		txt2 = ")"
		txt3 = "hist"
		const btn1 = document.createElement("button");
		const btn2 = document.createElement("button");
		const btn3 = document.createElement("button");
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
		btn3.onclick = function() {
			const totalRecord = document.createElement("div");
			totalRecord.className="totalRecord";
			for ( var i=0; i<totalHistorial.length; i++ ) {
				totalRecord.innerHTML = totalHistorial.join("<br>");
			}
			var parentDiv = calculadora.parentNode;
			parentDiv.insertBefore(totalRecord, calculadora);
		}
		btn1.innerHTML = txt1;
		btn2.innerHTML = txt2;
		btn3.innerHTML = txt3;
		btn1.id = "agr1";
		btn2.id = "agr2";
		btn3.id = "hist";
		btn1.setAttributeNS("(", "data-texto", "(")
		btn2.setAttributeNS(")", "data-texto", ")")
		btn3.setAttributeNS("historial", "data-texto", "record")

		var parentDiv = btnExpandir.parentNode;
		parentDiv.insertBefore(btn1, btnExpandir);
		parentDiv.insertBefore(btn2, btnExpandir);
		parentDiv.insertBefore(btn3, btnExpandir);
		expandirAdd = true;
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
function crearHistorial() {
	divHistorial = document.createElement("div");
	divHistorial.className = "historial";
	var parentDiv = pantalla.parentNode;
	parentDiv.insertBefore(divHistorial, pantalla);
}

function añadirHistorial() {
	for ( var i=0; i<historial.length; i++ ) {
		divHistorial.innerHTML = historial.join("<br>");
	}
}
function deleteHistorial(){
	divHistorial.parentNode.removeChild(divHistorial);
	historial = []
	switchOn = true;
}

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


