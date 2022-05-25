/* Operaciones para el formulario de nuevo vídeo */

// REFERENCIAS
var url = document.getElementById("url");
var titulo = document.getElementById("titulo");
var categoria = document.getElementById("categoria");
var visitas = document.getElementById("visitas");
var btnOk = document.getElementById("btnOk");
var btnCancelar = document.getElementById("btnCancelar");

// 1- Cuando pulse OK
// 2- Compruebo si están rellenados los campos
// 3- Si falta algún dato
//		Mensaje de error
// 		Cancelamos el evento
// Si todo está bien, continuamos
// Una url de Youtube tiene este formato:
//		https://youtu.be/CHWEDsIIMLQ
// 		Ese CHWEDsIIMLQ es el IDENTIFICADOR DEL VÍDEO
// 		Tengo que extraer ese identificador. Me quedaré con él, y desecharé el resto
// 4- Creo un objeto con los datos del formulario (extrayendo el identificador del video)
// 5- Lo añado al array de los videos
// 6- Guardo el array de los videos en localStorage, en formato JSON
// 7- Vuelvo a la index

btnOk.onclick = function() {
	// PASO 2: VALIDACIÓN DEL FORMULARIO
	// El mejor y más rápido método para validar los campos de un formulario es este:
	var errores = ""; // empezamos por una cadena vacía
	if(url.value == "") {
		errores += "La url es obligatoria\n";
	}
	if(titulo.value == "") {
		errores += "El título es obligatorio\n";
	}
	if(visitas.value == "") {
		errores += "Debes indicar el nº de visitas";
	}
	if(categoria.value == "") {
		errores += "Debes seleccionar una categoría\n";
	}
	
	// PASO 3
	if(errores != "") {
		alert(errores);
		return;	// cancelamos el onclick
	}
	
	// PASO 4
	// Vamos a extraer el identificador del video:
	var yuyu = url.value.replace("https://youtu.be/", "");
	// creo el objeto:
	var ojeto = {
		idvideo: yuyu,
		titulo: titulo.value,
		categoria: categoria.value,
		visitas: parseInt(visitas.value) // es nº
	}
	
	// PASO 5
	datos.push(ojeto);
	
	// PASO 6
	// JSON tiene 2 funciones: 
	// parse -> convierte una cadena JSON a datos nativos de JS
	// stringify -> lo contrario: datos nativos de JS a cadena JSON
	var cadenajson = JSON.stringify(datos);
	localStorage.setItem("videos", cadenajson);
	
	// PASO 7
	location.href = "index.html";
}


btnCancelar.onclick = function() {
	location.href = "index.html";
}


