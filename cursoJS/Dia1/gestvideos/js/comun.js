// Operaciones comunes a todas las páginas

// REFERENCIAS
var btnBorrar = document.getElementById("btnBorrar");
var btnExportar = document.getElementById("btnExportar");
var btnImportar = document.getElementById("btnImportar");
var fileImportar = document.getElementById("fileImportar");

// EVENTOS PARA LOS TRES BOTONES DEL MENÚ
btnBorrar.onclick = function() {
	var respuesta = confirm("¿Estás seguro de que quieres borrar TODOS los datos?\n\nEsta operación no se puede deshacer.");
	if(respuesta == false) return;
	localStorage.setItem("videos", "[]");
	location.href = "index.html";
}
btnExportar.onclick = function() {
	//alert(JSON.stringify(datos));
	var data = new Blob([JSON.stringify(datos)], {type: 'text/plain'});
	var url = window.URL.createObjectURL(data);
	btnExportar.href = url;
}
btnImportar.onclick = function() {
	// En el header tenemos un input de tipo archivo, que está oculto.
	// Cuando pulsamos este botón, hacemos un click en ese input mediante javascript...
	fileImportar.click();
}
fileImportar.onchange = function(evento) {
	// Este evento se produce cuando hemos escogido un archivo con el input. La función recibe un parámetro (lo llamo "evento"), que es un objeto que contiene muchas cosas. 
	// evento.target.files[0] es un objeto File (nuevo en JS) con información sobre el archivo que hemos escogido
	var archivo = evento.target.files[0];
	console.log(archivo);
	// Algunas de sus propiedades son el tipo de archivo o lo que pesa, para que puedas hacer validaciones en JS, si quieres.
	
	// Y aquí viene lo gordo: FileReader es otro objeto nuevo de JS. Sirve para leer los contenidos de un archivo local. 
	// Pero no puede ser um archivo cualquiera: tiene que ser un objeto File creado desde un <input type="file">. 
	// De lo contrario podría cargarse archivos desde JS de cualqueir carpeta, y sería un riesgo de seguridad
	var reader = new FileReader();
	// Vamos a leer los contenidos del archivo elegido como texto:
	reader.readAsText(archivo);
	// Y cuando se hayan terminado de leer, se ejecuta este evento (onload), donde tendremos todos esos contenidos en e.target.result
	reader.onload = function(e) {
		var contenidos = e.target.result;
		if(contenidos == "") {
			alert("El archivo está vacío");
			return;
		}
		// Antes de guardarlos en localStorage, deberíamos traducirlos a un array de objetos, y añadir cada uno de sus elementos al array de los datos, comprobando si están repetidos o no. Pendiente para más adelante
		var datosTemp = JSON.parse(contenidos);
		for(var i in datosTemp) {
			datos.push(datosTemp[i]);
		}
		// Esto es MAGIA. Es un código para eliminar duplicados del array de los datos (basándonos en el campo idvideo)
		// Esto es JS extremadamente avanzado
		datos.filter((v,i,a)=>a.findIndex(t=>(t.idvideo === v.idvideo))===i);
		
		// Guardamos los datos en localStorage
		localStorage.setItem("videos", contenidos);
		location.href = "index.html";
	}
}

///////////////////////////////////////////////////////////////
// ACCESO A LA BASE DE DATOS EN LOCALSTORAGE
var datosEnBruto = localStorage.getItem("videos");
console.log(datosEnBruto);
if(datosEnBruto == null) {
	var datos = [];
} else {
	var datos = JSON.parse(datosEnBruto);
}























