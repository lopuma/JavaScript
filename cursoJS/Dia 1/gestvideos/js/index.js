// JAVASCRIPT PARA EL LISTADO DE LOS VIDEOS

var tablon = document.querySelector("body > main");

for(var item of datos) {
	var cadena = `
		<div>
			<img src="https://i.ytimg.com/vi/${item.idvideo}/hqdefault.jpg">
			<button onclick="playvideo('${item.idvideo}')">▶</button>
			<button onclick="borrarvideo('${item.idvideo}')">❌</button>
			<button onclick="editarvideo('${item.idvideo}')">✏</button>
			<footer>${item.titulo} <br> <strong>${item.categoria}</strong> | Visitas: <strong>${item.visitas}</strong></footer>
		</div>
	`;
	tablon.innerHTML += cadena;
}

function playvideo(idvideo) {
	var direccion = "https://youtu.be/" + idvideo;
	var x = window.open(direccion, "");
	// Tenemos que actualizar el contador de visitas de ese vídeo
	for(var indice in datos) {
		if(datos[indice].idvideo == idvideo) {
			datos[indice].visitas ++;
			var cadenajson = JSON.stringify(datos);
			localStorage.setItem("videos", cadenajson);
			break;		// rompemos el bucle
		}
	}
}

function borrarvideo(idvideo) {
	var respuesta = confirm("¿Estás seguro de que quieres borrar este vídeo?\nEsto no se puede deshacer.");
	if(respuesta == false) {
		return; // cancelamos y salimos de aquí
	}
	for(var indice in datos) {
		var objeto = datos[indice];
		if(objeto.idvideo == idvideo) {
			datos.splice(indice, 1);
			var cadenajson = JSON.stringify(datos);
			localStorage.setItem("videos", cadenajson);
			location.reload();
		}
	}
}

function editarvideo(idvideo) {
	location.href = "editar.html?idvideo=" + idvideo;
}






