<?php
	////////////////////////////////////////////////////////////////////////////
	// ESTO ES UN SCRIPT DE PHP QUE SE ENCARGA DE PEDIR DATOS A MYSQL Y DEVOLVERLOS AL CLIENTE EN FORMATO JSON
	////////////////////////////////////////////////////////////////////////////
	// SANEADO DE PARÁMETROS Y CONEXIÓN A MYSQL
	require("saneado.php");
	require("bbdd.php");
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////
	// PREPARATIVOS
	// "Array de objetos" en PHP. De momento, vacío. Lo iremos rellenando con los datos de MySQL
	$out = array();
	$out['data'] = array();
	$out['meta'] = array();
	
	// Echamos un vistazo al parámetro "comando" de la url con la que el cliente ha llamado a este script
	if(isset($_REQUEST["comando"])) {
		$comando = $_REQUEST["comando"];
	} else {
		$comando = "";
	}
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////
	// ACCIONES A EJECUTAR SEGÚN EL COMANDO
	// Vamos a examinar el valor de $comando, y a hacer cosas diferentes según ese valor
	// Podría haberlo hecho con un if/else if/else, pero en este caso un switch me resulta más fácil de leer
	switch($comando) {
		case "test":
			// En el caso del comando "test", hacemos una consulta a la bbdd de la biblioteca
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
			$out['meta']['ok'] = false;
			$out['meta']['msg'] = "comando no válido";
	}
	////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////
	// SALIDA
	// Llegados a este punto, en el array de objetos $out ya hemos metido cosas
	// De modo que lo CONVERTIMOS A FORMATO JSON y lo imprimimos en la página
	echo json_encode($out);
	////////////////////////////////////////////////////////////////////////////
?>