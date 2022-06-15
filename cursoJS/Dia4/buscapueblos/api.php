<?php
	////////////////////////////////////////////////////////////////////////////
	// ESTO ES UN SCRIPT DE PHP QUE SE ENCARGA DE PEDIR DATOS A MYSQL Y DEVOLVERLOS AL CLIENTE EN FORMATO JSON
	////////////////////////////////////////////////////////////////////////////
	// SANEADO DE PARÁMETROS Y CONEXIÓN A MYSQL
	// Esto es para incluir archivos externos
	require("saneado.php");	// para temas de seguridad
	require("bbdd.php");	// para conectarse a una bbdd
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////
	// PREPARATIVOS
	// "Array de objetos" en PHP. De momento, vacío. Lo iremos rellenando con los datos de MySQL
	// Este array, cuando lleguemos al final del script php, se serializa a formato JSON y se manda al navegador. El navegador lo recibe y hará con él lo que quiera (mediante JS)
	// Manía mía: los contenidos de este array los organizo en 2 items: 
	// - data: contiene un array con los datos que le hemos pedido a la api
	// - meta: contiene información extra, como si la petición ha ido bien, o si ha habido algún problema, o info de depuración
	$out = array();
	$out['data'] = array();
	$out['meta'] = array();
	// En JS, podemos escribir objetos como si fueran arrays asociativos:
	// var persona = {}
	// persona.nombre = "Pepe";
	// o...
	// persona['nombre'] = "Pepe";
	
	// A esta API la llamo mediante la url
	// La tengo en un servidor donde hago pruebas:
	// http://www.coavnss.org/api/api.php?comando=provincias
	// Despué sde api.php viene un "?", que significa "ahora vienen parámetros"
	// Y luego, el parámetro "comando" con el valor "provincias"
	// Echamos un vistazo al parámetro "comando" de la url con la que el cliente ha llamado a este script (ojo: cuando digo "cliente" me refiero a CUALQUIER cliente. Un navegador, un programa en Python, en Java, etc)
	if(isset($_REQUEST["comando"])) {	// si existe el parámetro "comando"...
		$comando = $_REQUEST["comando"];// guardo su valor en una variable
	} else {							// si no...
		$comando = "";					// dejo esa variable vacía
	}
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////
	// ACCIONES A EJECUTAR SEGÚN EL COMANDO
	// Vamos a examinar el valor de $comando, y a hacer cosas diferentes según ese valor
	// Podría haberlo hecho con un if/else if/else, pero en este caso un switch me resulta más fácil de leer
	switch($comando) {
		case "test":
			// En el caso del comando "test", hacemos una consulta a la bbdd de la biblioteca
			// Esto es una cadena SQL. PHP no entiende lo que significa. Ni le importa. Se limita a "enviarla" a MySQL, y que sea este el que la ejecute.
			$sql = "SELECT * FROM coa_biblioteca ORDER BY RAND() LIMIT 0,20";
			$resultado = mysqli_query($conexion, $sql);
			while($fila = mysqli_fetch_assoc($resultado)) {
				$out['data'][] = $fila;
			}
			$out['meta']['ok'] = true;
			$out['meta']['mensaje'] = "Pipo tiene hambre";
			break;
			
		case "provincias":
			// Obtenemos una lista de las provincias españolas
			$sql = "SELECT * FROM geo_provincias ORDER BY provincia";
			$resultado = mysqli_query($conexion, $sql);
			while($fila = mysqli_fetch_assoc($resultado)) {
				$out['data'][] = $fila;
			}
			$out['meta']['ok'] = true;
			break;

		case "municipios":
			// Obtenemos una lista de los municipios de la provincia indicada
			$provincia = (int)$_REQUEST["idProvincia"];
			$sql = "SELECT * FROM geo_municipios WHERE provincia_id={$provincia} ORDER BY municipio";
			$resultado = mysqli_query($conexion, $sql);
			while($fila = mysqli_fetch_assoc($resultado)) {
				$out['data'][] = $fila;
			}
			$out['meta']['ok'] = true;
			break;
			
		case "yuyu":
			$out['meta']['ok'] = true;
			$out['meta']['msg'] = "Esto es un yuyu";
			break;
			
		case "pipo":
			$out['meta']['ok'] = true;
			$out['meta']['msg'] = "Hola, Pipo!!!";
			break;
			
		case "email":
			// ÑAPACODE WARNING
			$a = $_REQUEST['a'];
			$asunto = $_REQUEST['asunto'];
			$mensaje = $_REQUEST['mensaje'];
			$out['meta']['resultado'] = mail($a, $asunto, $mensaje);
			$out['meta']['ok'] = true;
			$out['meta']['msg'] = "Mail enviado";
			break;

		case "listaportadas":
			// glob es una función de php que obtiene una lista de archivos en la carpeta que le indicamos
			$lista = glob("../uploads/biblioteca/*.*");
			$out['data'] = $lista;
			$out['meta']['ok'] = true;
			break;
			
		default:
			// Esto es para el caso de que $comando no valga nada de lo anterior
			$out['meta']['ok'] = false;
			$out['meta']['msg'] = "comando no válido";
	}
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////
	// OBSERVACIONES
	// Esta API está alojada en un servidor de pruebas que no tiene restricciones a las peticiones por Ajax (cada vez más complicados de encontrar)
	// Un hacker competente se pondría las botas con este código. Ejemplo:
	// SELECT * FROM geo_municipios WHERE provincia_id=0; DROP TABLE usuarios; -- ORDER BY municipio
	// Hay APIs con MILES de comandos. Esas APIS usan otras técnicas para no escribir tanto código, como importación dinámica de controladores, etc. 
	// Esta es una API HTTP remota. Quiere decir que nos comunicamos con ella por el protocolo HTTP. Hay otras APIs que usan otros protocolos. Por ejemplo, las de servicios bancarios
	// ¿Y las APIs REST? Eso lo dejamos para más adelante, pero es una moda que se está suavizando un poco últimamente
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////
	// SALIDA
	// Llegados a este punto, en el array de objetos $out ya hemos metido cosas
	// De modo que lo CONVERTIMOS A FORMATO JSON y lo mandamos al cliente
	echo json_encode($out);
	// Convertir datos nativos a JSON:
	// JS: JSON.stringify(objeto_o_array);
	// PHP: json_encode($objeto_o_array);

	// Convertir JSON a datos nativos:
	// JS: JSON.parse(cadena_json);
	// PHP: json_decode($cadena_json);

	////////////////////////////////////////////////////////////////////////////
?>