<?php
// OJO: esto es una API cutre con ganas. No valida parámetros, no es flexible... 
// Está hecha solo a propósitos ilustrativos
// Tenlo en cuenta para cuando tengas que hacer una API de verdad

include_once("../inc/ajustes.php");

$comando = "";
if(isset($_REQUEST['comando'])) $comando = $_REQUEST['comando'];
$out = array(
	"data" => array(),
	"meta" => array(),
);


switch($comando) {
	case "listaMunis":
		$sql = "SELECT DISTINCT municipio FROM lan_formacion ORDER BY municipio";
		$respuesta = mysqli_query($con, $sql);
		$out['data'] = mysqli_fetch_all($respuesta, MYSQLI_ASSOC);
		$out['meta']['ok'] = true;
		break;

	case "buscar":
		if(!isset($_REQUEST['municipio']) && !isset($_REQUEST['termino'])) {
			$out['meta']['ok'] = false;
			$out['meta']['msg'] = "Faltan parámetros";
			break;
		}
		$clausulaMuni = "";
		$clausulaTerm = "";
		if($_REQUEST['municipio'] != "") {
			$clausulaMuni = "AND municipio LIKE '%{$_REQUEST['municipio']}%' ";
		}
		if($_REQUEST['termino'] != "") {
			$clausulaTerm = "AND (titulo LIKE '%{$_REQUEST['termino']}%' OR centro LIKE '%{$_REQUEST['termino']}%') ";
		}
		// Vamos a limitarnos a 1000 resultados como máximo en esta API. En un proyecto real la paginación 
		// harbía que hacerla aquí en el servidor, y no en el cliente.
		$sql = "SELECT * FROM lan_formacion WHERE 1 {$clausulaMuni} {$clausulaTerm} ORDER BY f_alta DESC LIMIT 0,1000";
		$respuesta = mysqli_query($con, $sql);
		$out['data'] = mysqli_fetch_all($respuesta, MYSQLI_ASSOC);
		$out['meta']['ok'] = true;
		$out['meta']['sql'] = $sql;
		break;

	default:
		$out['meta']['ok'] = false;
		$out['meta']['msg'] = "Comando no válido";
}

echo json_encode($out); 

?>