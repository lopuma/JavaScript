/* Operaciones para el formulario de nuevo vídeo */

// REFERENCIAS
var url = document.getElementById("url");
var titulo = document.getElementById("titulo");
var categoria = document.getElementById("categoria");
var visitas = document.getElementById("visitas");
var btnOk = document.getElementById("btnOk");
var btnCancelar = document.getElementById("btnCancelar");

// Hay que leer los parámetros que nos han pasado por la url
// Esta es la forma moderla y guay de hacerlo:
var parametros = new URLSearchParams(window.location.search);
// obtenemos el valor del parámetro idvideo
var id = parametros.get("idvideo");
if(id == null) {
	alert("No has indicado el video a editar");
	location.href = "index.html";
}

// Ahora ya tengo el id del video. Lo usaré para obtener el item del array datos que contiene los datos del video
var videoActual = null;
for(var item of datos) {
	if(item.idvideo == id) {
		videoActual = item;
		break;		// rompemos el bucle
	}
}
// si llegados aquí videoActual sigue siendo null, es porque no hemos encontrado el video especificado en el array de los datos
if(videoActual == null) {
	alert("El video indicado no existe");
	location.href = "index.html";
}

// por precaución: si el vídeo actual no tiene establecido el nº de visitas (por lo que sea), se lo establezco a 0
if(videoActual.visitas == null) videoActual.visitas = 0;

// Ahora voy a rellenar los campos del formulario con los datos del video seleccionado
url.value = "https://youtu.be/" + videoActual.idvideo;
titulo.value = videoActual.titulo;
categoria.value = videoActual.categoria;
visitas.value = videoActual.visitas;





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
// 4- Actualizo los campos del objeto video con los valores de los campos del formulario

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
	videoActual.idvideo = yuyu;
	videoActual.titulo = titulo.value;
	videoActual.categoria = categoria.value;
	videoActual.visitas = parseInt(visitas.value); // es nº
	
	// PASO 5
	//datos.push(ojeto);
	// No es necesario este paso porque aquí no estamos AÑADIENDO los datos del formulario al array de datos, simplemente estamos CAMBIANDO uno de los elementos de ese array, que tenemos en la variable videoActual
	
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



