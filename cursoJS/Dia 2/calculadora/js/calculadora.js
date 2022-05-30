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
let btnCero =  document.querySelector(".zero")
///////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES
let expresion = "0";
// Variable donde me hara de switch, y saber si el primer caracter es 0
let cero = "0";
let igual = "";
var voltea = false;
var expandirAdd = false;
// variable para crear un DIV y añadir el historial
var divHistorial = ""
var divRecord = ""

// Array que solo almacenara 3 datos del historial
let historial = []
// Array que almacenara todo el historial
let totalHistorial = []
// switch que activar si esta creado el historial o no
var switchOn = true;
var switchOnTotal = true;
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// EVENTOS CLICK PARA LOS BOTONES "NORMALES"
for(let item of arrBtnTexto) {
	item.onclick = function(evento) {
		inicializarExpresion(); 
		expresion += this.dataset.texto;
		pantalla.innerHTML = expresion;
		btnReset.innerHTML = "C";
		console.log(expresion)
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
// EVENTOS CLICK PARA BOTONES ESPECIALES
btnSeta.onclick = function() {
	console.log("INSPIRATE")
}

btnReset.onclick = function() {
	expresion = "0";
	pantalla.innerHTML = expresion;
	cero = "0";
	igual = "";
	inicializarExpresion();
	if ( btnReset.innerHTML == "AC" ){
		btnReset.innerHTML = "AC";
		deleteHistorial();
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
	var valCero = expresion.startsWith('0')
	//switchOn = true;
	if ( expresion.length != 0 && expresion != '0' ){
		if ( valCero ){
			expresion =  expresion.slice(1);
			try {
				var resultado = calcularResultado();
			} catch(error) {
				errorExpresion();
			}
		} else {
			try {
				var resultado = calcularResultado();
			} catch(error) {
				errorExpresion();
			}
		}
	} else{
		pantalla.innerHTML = "= " +expresion;
	}
	if ( switchOn ){
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
	var parentTeclado = btnIgual.parentNode;
	let btnMod = document.getElementById("mod");
	if (expandirAdd){
		let btn1Agrupar = document.getElementById("agr1");
		let btn2Agrupar = document.getElementById("agr2");
		let btnHistory = document.getElementById("hist");
		
		btn1Agrupar.parentNode.removeChild(btn1Agrupar);
		btn2Agrupar.parentNode.removeChild(btn2Agrupar);
		btnHistory.parentNode.removeChild(btnHistory);
		btnMod.parentNode.removeChild(btnMod);
		parentTeclado.insertBefore(btnExpandir, btnCero)
		expandirAdd = false;
	} else{
		txt1 = "("
		txt2 = ")"
		txt3 = "hist"
		const btn1 = document.createElement("button");
		const btn2 = document.createElement("button");
		const btn3 = document.createElement("button");
		const btnMod = document.createElement("button");
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
		btnMod.onclick = function(){
			inicializarExpresion(); 
			expresion += this.dataset.texto;
			pantalla.innerHTML = expresion;
		}
		btn3.onclick = function() {	
			if ( switchOnTotal ){
				divRecord = document.createElement("div");
				divRecord.className="divRecord";
				var parentDiv = calculadora.parentNode;
				parentDiv.insertBefore(divRecord, calculadora);
				for ( var i=0; i<totalHistorial.length; i++ ) {
					divRecord.innerHTML = totalHistorial.join("<br>");
				}
				switchOnTotal = false;
			} else {
				divRecord.parentNode.removeChild(divRecord);
				console.log("FALSO NO AÑADE " +totalHistorial);
				switchOnTotal = true;
			}
		}
		btn1.innerHTML = txt1;
		btn2.innerHTML = txt2;
		btn3.innerHTML = txt3;
		btnMod.innerHTML = "Mod";
		btn1.id = "agr1";
		btn2.id = "agr2";
		btn3.id = "hist";
		btnMod.id = "mod";
		btnMod.className = "mod";
		btnMod.style.backgroundColor = '#5d82a7';
		btnMod.addEventListener("mouseover", function (event){
			event.target.style.backgroundColor = '#FB7E29';
		})
		btnMod.addEventListener("mouseout", function (event){
			event.target.style.backgroundColor = "#5d82a7";
		})
		btnMod.setAttributeNS("%", "data-texto", "%");
		btn1.setAttributeNS("(", "data-texto", "(")
		btn2.setAttributeNS(")", "data-texto", ")")
		btn3.setAttributeNS("historial", "data-texto", "record")
		parentTeclado.insertBefore(btnMod, btnCero)
		parentTeclado.appendChild(btn1);
		parentTeclado.appendChild(btn2);
		parentTeclado.appendChild(btn3);
		parentTeclado.appendChild(btnExpandir);
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

function errorExpresion() {
	pantalla.innerHTML = "Error : Expresión malformada";
	pantalla.style.fontSize = "150%";
	pantalla.style.color = "red";
	cero = '0';
	igual = "";
    deleteHistorial();

}

function calcularResultado() {
	var resultado = eval(expresion);
	console.log("RESULTADO :" + resultado);
	pantalla.innerHTML = "= " + resultado.toString().substr(0, 12);
	igual = "= " + resultado;
	historial.push(expresion);
	totalHistorial.push(expresion);
	return resultado;
}

function crearHistorial() {
	divHistorial = document.createElement("div");
	divHistorial.className = "historial";
	var parentPantalla = pantalla.parentNode;
	parentPantalla.insertBefore(divHistorial, pantalla);
}

function añadirHistorial() {
	for ( var i=0; i<historial.length; i++ ) {
		divHistorial.innerHTML = historial.join("<br>");
	}
}

function deleteHistorial(){
	console.log("SWITH ", switchOn)
	console.log("HISTYRIAL ", historial.length)
	if ( historial.length != 0 ){
		divHistorial.parentNode.removeChild(divHistorial);
		//historial = [];
		switchOn = true;
	}else if ( !switchOn ){
		divHistorial.parentNode.removeChild(divHistorial);
		console.log("longitud " +historial.length)
		console.log("SWITH -- ", switchOn);
		switchOn = true;
	} else if ( switchOn && historial.length == '0' ){
		console.log("INICIO", divHistorial)
		switchOn = false;
		//divHistorial.parentNode.removeChild(divHistorial);
	}
}

function inicializarExpresion() {
	pantalla.style.fontSize = "300%"
	pantalla.style.color = "black"
	valorExpresionInicial = cero.startsWith('0')
	valorResultadoInicial = igual.startsWith('=')
	if (valorExpresionInicial || valorResultadoInicial) {
		expresion = "";
		cero = "1";
		igual = "";
	}
}
/////////////////////////////////////////////////////////////////////////


