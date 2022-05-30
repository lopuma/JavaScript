////////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES
let datos 				= [];
let buffer 				= [];
let paginaActual 		= 0;
let paginasTotales;
let longitudPagina 		= 12;
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// REFERENCIAS
// Las referencias a elementos de la página es mejor declararlas con const, porque
// sabemos que no van a cambiar nunca, así que no son variables.
const selMunicipios 	= document.querySelector("#selMunicipios");
const txtTermino 		= document.querySelector("#txtTermino");
const btnOk 			= document.querySelector("#btnOk");
const btnReset 			= document.querySelector("#btnReset");
const verMas 			= document.querySelector("#verMas");
const main	 			= document.querySelector("main");
////////////////////////////////////////////////////////////////////////////////


function ofertasLanbide(datosEnBruto) {
	datos = datosEnBruto;
	console.log(datos);
	// PREGUNTA: ¿Por qué crees que estoy provocando aquí un click en el botón del reset?
	btnReset.click();
}

function resetInterfaz() {
	main.innerHTML = "";
	txtTermino.value = "";

	// EXPLICACIÓN: un Set (conjunto) es como un array en el que nunca se repiten los items
	let conjunto = new Set();
	// PREGUNTA: ¿Qué estamos haciendo aquí?
	for(let item of datos) {
		conjunto.add(item.municipio);
	}
	// EXPLICACIÓN: esto es el operador spread (...) Entre otras cosas, sirve para crear copias
	// rápidas de arrays y objetos.
	// PREGUNTA: ¿Por qué estamos creando una copia del Set de antes?
	let municipios = [...conjunto];
	municipios.sort();

	selMunicipios.innerHTML = `<option value="0">Selecciona un municipio</option>`;
	for(let item of municipios) {
		selMunicipios.innerHTML += `<option value="${item}">${item}</option>`;
	}

	buffer = [...datos];
}

function muestraPagina(pagina) {
	// PREGUNTA: ¿Para qué son estas 3 líneas?
	paginaActual = pagina;
	let inicio = paginaActual * longitudPagina;
	let final = (paginaActual * longitudPagina) + longitudPagina;

	for(let contador = inicio; contador < final; contador ++) {
		// PREGUNTA: ¿Qué hace esta línea?
		if(contador == buffer.length) break;
		// PREGUNTA (importante): ¿Por qué estamos tirando del array bufer y no del array datos?
		let item = buffer[contador];
		main.innerHTML += `
			<div class="oferta">
				<h3>${item.desEmpleo}</h3>
			</div>
		`;
	}
	// PREGUNTA: ¿Para qué es este código?
	if(paginaActual < paginasTotales - 1) {
		verMas.classList.remove("oculto");
	} else {
		verMas.classList.add("oculto");
	}
}

////////////////////////////////////////////////////////////////////////////////
// PROCEDIMIENTOS DE EVENTOS
////////////////////////////////////////////////////////////////////////////////
verMas.onclick = function() {
	muestraPagina(paginaActual + 1);
}
btnReset.onclick = function() {
	// PREGUNTA: ¿Cuándo se llama a esta función?
	// PREGUNTA: ¿Qué es lo que hace exactamente, y por qué?
	paginaActual = 0;
	paginasTotales = Math.ceil(datos.length / longitudPagina);
	resetInterfaz();
	muestraPagina(paginaActual);
}
btnOk.onclick = function() {
	// EXPLICACIÓN: si no hemos puesto nada en el formulario de búsqueda, salimos de la función en esta misma línea sin hacer nada más
	if(selMunicipios.value == "0" && txtTermino.value == "") return;

	// PREGUNTA: Y esta línea, ¿por qué? 
	buffer = [...datos];

	if(selMunicipios.value != "0") {
		// EXPLICACIÓN: filter es un método de los arrays. Recorre CADA elemento y le aplica la función de filtrado que hemos creado. Si esa función devuelve true, el elemento "ha pasado el filtro". Si no, no.
		buffer = datos.filter(function(item) {
			return item.municipio == selMunicipios.value;
		});
	}
	if(txtTermino.value != "") {
		buffer = buffer.filter(function(item) {
			// PREGUNTA: ¿Por qué estamos convirtiendo estos datos a minúsculas? 
			let titulo = item.desEmpleo.toLowerCase();
			let puesto = item.desPuesto.toLowerCase();
			// EXPLICACIÓN: hay muchas formas de buscar una cadena dentro de otra: substr(), substring(), includes(), search(), o con expresiones regulares (match y test). He escogido includes() por ser la más fácil de entender
			return titulo.includes(txtTermino.value) || puesto.includes(txtTermino.value);
		});
	}
	// EXPLICACIÓN: llegados a este punto, tendremos el array buffer cargado con los resultados de la búsqueda. Ahora hay que vaciar el <main>, recalcular el nº de páginas totales, y mostrar la página 0:
	main.innerHTML = "";
	paginasTotales = Math.ceil(buffer.length / longitudPagina);
	muestraPagina(0);
}


// PROPUESTA(S): 
// - Modifica el código para incluir también la descripción del puesto de trabajo
// - Y ya de paso, el municipio y la provincia 
// - Y la fecha de publicación, y un enlace a la página de Lanbide con los detalles de la oferta
// - ¿Se te ocurre alguna forma de mejorar el código de esta aplicación? No hace falta que lo hagas, solo que lo apuntes
// - ¿Se te ocurre alguna característica extra que añadir a esta aplicación? No hace falta que lo hagas, solo que lo apuntes
// - Crea una aplicación como esta, pero con los datos de la oferta de cursos de Lanbide. La url para cargar los datos es esta:
// 	http://apps.lanbide.euskadi.net/apps/FR_CURSOS_ODE_JSON?jsonCallBack=empleoLanbide
//	Recuerda hacerla en otra carpeta, para que no se te mezclen los arhcivos