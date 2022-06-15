////////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES
let datos 				= [];
let buffer 				= [];
let paginaActual 		= 0;
let paginasTotales;
let longitudPagina 		= 20;
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


function cursosLanbide(datosEnBruto) {
	datos = datosEnBruto;
	console.log("DATOS EN BRUTO --->" +datos);
	// PREGUNTA: ¿Por qué crees que estoy provocando aquí un click en el botón del reset?
		// RESPUESTA . Porque el boton reset refresca la pagina a 0 y vuelve a cargar los datos desde LANBID, la funcion OfertasLanbide, carga los datos desde LANBIDE.
 
	btnReset.click();
}

function resetInterfaz() {
	main.innerHTML = "";
	txtTermino.value = "";

	// EXPLICACIÓN: un Set (conjunto) es como un array en el que nunca se repiten los items
	let conjunto = new Set();
	// PREGUNTA: ¿Qué estamos haciendo aquí?
		// RESPUESTA, esta funcion se carga desde btnReset.click() y lo que hace es cargar todos los registros que obtiene desde OfertasLanbide.
	for(let item of datos) {
		conjunto.add(item.municipio);
	}
	// EXPLICACIÓN: esto es el operador spread (...) Entre otras cosas, sirve para crear copias
	// rápidas de arrays y objetos.
	// PREGUNTA: ¿Por qué estamos creando una copia del Set de antes?
		// RESPUESTA :  Porque necesitamos manipular la array y ordenar la lista de municipios
	let municipios = [...conjunto];
	municipios.sort();

	selMunicipios.innerHTML = `<option value="0">Selecciona un municipio</option>`;
	for(let item of municipios) {
		selMunicipios.innerHTML += `<option value="${item}">${item}</option>`;
	}

	buffer = [...datos];
	console.log("BUFFER 1" +buffer)
}

function muestraPagina(pagina) {
	// PREGUNTA: ¿Para qué son estas 3 líneas?
		/*
		 RESPUESTA :  porque solo creara una pagina con el total de la longitud de la pagimna, 
		al principio sera el numero de la longitud y si le damos a ver mas, le duplica el valor
		todo esto lo gaurda en la variable inicio y fin
		*/
	paginaActual = pagina;
	let inicio = paginaActual * longitudPagina;
	let final = (paginaActual * longitudPagina) + longitudPagina;

	for(let contador = inicio; contador < final; contador ++) {
		// PREGUNTA: ¿Qué hace esta línea?
			// RESPUESTA : Si contador es 0 y final 20, sumara contador y creada objetos hasta que sea < final
		if(contador == buffer.length) break;
		// PREGUNTA (importante): ¿Por qué estamos tirando del array bufer y no del array datos?
		let item = buffer[contador];
		main.innerHTML += `
			<div class="oferta">
				<h3>${item.titulo}</h3>
				<table><td>Fecha inicio : ${item.f_inicio}<td></table><br>
				<table><td>Fecha fin : ${item.f_fin}<td></table><br>
				<div class="localidad">
					<strong color="#58a6ff">${item.municipio}</strong>
					<strong color="#58a6ff"><br><br>${item.centro}</strong>
				</div>
			</div>
		`;
	}
	// PREGUNTA: ¿Para qué es este código?
		/* 
			RESPUESTA :  Primero comprueba si la pagina es mejor que el total de paginas -1,
			Si la pagina actual es mejor, esto probocara que la class 'oculto' desaparesca, si pagina actual es mayor seguira creando el objeto de la class 'oculto'
		*/
	if(paginaActual < paginasTotales - 1) {
		console.log("1")
		verMas.classList.remove("oculto");
	} else {
		console.log("2")
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
		// RESPUESTA : Al cargar la pagina, carga los datos desde la URL de lanbide.
	// PREGUNTA: ¿Qué es lo que hace exactamente, y por qué?
		// Asigna un valor a tamaño de las paginas que es 0, luego cogera la longitud de los datos y lo divide para la longitud de paginas
		// si los datos son 900 objetos y mi longitud que declare es 300, esto lo divide y crea un total de paginas, con la funcion Math.ceil ese valor lo redondea
		// si el valoir es 3. algo lo pone a 4 y ese sera el total de paginas totales, luego reincia la inteerfaz, que como ya sabemos
		// crea la app con el los datos del municipi los añade a un option  etc etc, luego desde muestraPagina, muestra las paginas cargadas y te mostrara la pagina actual
		// y te creara un DIV con los datos que le indiques.

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

		/*
			RESPUSTA : Porque necesitamos manipular los datos del array original, porque cuando damos al boton OK, nos buscara municipios dependiendo los terminos de busqueda,
			y al manipular el array original cambiariamos los datos originales y no podriam os resetar todo los datos, por lo que se crea u n bufer y en ese bufer

			se va guardando los datos de la busqueda
		*/

	if(selMunicipios.value != "0") {
		// EXPLICACIÓN: filter es un método de los arrays. Recorre CADA elemento y le aplica la función de filtrado que hemos creado. Si esa función devuelve true, el elemento "ha pasado el filtro". Si no, no.
		buffer = datos.filter(function(item) {
			return item.municipio == selMunicipios.value;
		});
	}
	if(txtTermino.value != "") {
		buffer = buffer.filter(function(item) {
			// PREGUNTA: ¿Por qué estamos convirtiendo estos datos a minúsculas? 
				// porque seguramente los datos de LANBIDE sean en minusculas y la busqueda debe ser exacto _	   _
																				//							 \_()_/
			let titulo = item.titulo.toLowerCase();
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