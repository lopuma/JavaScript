///////////////////////////////////////////////////////////////////////////////
// REFERENCIAS
const municipio = document.querySelector("#municipio");
const listaMunis = document.querySelector("#listaMunis");
const termino = document.querySelector("#termino");
const btnReset = document.querySelector("#btnReset");
const btnBusca = document.querySelector("#btnBusca");
const numResultados = document.querySelector("#numResultados");
const salida = document.querySelector("body > main > div");
const btnMas = document.querySelector("body > main > footer > button");
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES
let datos; // Array con los 
let totalItems; // Nº de resultados totales de la búsqueda
let tamPagina = 12; // Nº de resultados por página
let pagActual; // Página actual
let totalPaginas; // Nº de páginas totales
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// OBTENCIÓN DE LA LISTA DE MUNICIPIOS
async function getMunicipios() {
    let respuesta = await fetch("api/index-formacion.php?comando=listaMunis");
    let datos = await respuesta.json();
    for (let item of datos.data) {
        listaMunis.innerHTML += `<option value="${item.municipio}">${item.municipio}</option>`;
    }
}
getMunicipios();
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// BOTONES DEL BUSCADOR
btnReset.onclick = function() {
    municipio.value = termino.value = "";
}
btnBusca.onclick = function() {
    if (municipio.value == "" && termino.value == "") return;
    buscar();
}

///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// BÚSQUEDA
async function buscar() {
    // En un proyecto más serio esto se haría por POST, enviando un FormData
    let respuesta = await fetch("api/index-formacion.php?comando=buscar&municipio=" + municipio.value + "&termino=" + termino.value);
    let resultados = await respuesta.json();

    salida.innerHTML = "";
    if (resultados.meta.ok == false) {
        alert(resultados.meta.msg);
        return;
    }

    datos = resultados.data;
    pagActual = 0;
    totalItems = resultados.data.length;
    totalPaginas = Math.ceil(totalItems / tamPagina);

    numResultados.innerHTML = totalItems;
    salida.scrollIntoView({ behavior: 'smooth' });
    render();
}
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// RENDER DEL ÁREA DE RESULTADOS
function render() {
    btnMas.disabled = pagActual == totalPaginas - 1 ? true : false;
    for (let i = pagActual * tamPagina; i < (pagActual * tamPagina) + tamPagina; i++) {
        if (i == totalItems) break;
        let item = datos[i];
        salida.innerHTML += `
			<div class="item">
				<h3>${item.titulo}</h3>
				<span>${item.municipio}</span>
                <span>${item.centro}</span>
				<span>${item.f_inicio} a ${item.f_fin}</span>
                <span>${item.horas} horas</span>
				<a href="${item.url}" target="_blank">Ver más</a>
			</div>
		`;
    }
}
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// BOTÓN PARA MOSTRAR MÁS RESULTADOS
btnMas.onclick = function() {
    pagActual++;
    render();
}

///////////////////////////////////////////////////////////////////////////////