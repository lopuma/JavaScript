<?php
$con = mysqli_connect("localhost", "osboxes", "ABCabc123.", "lanbide") or die("No se ha podido conectar");
mysqli_query($con, "SET NAMES utf8");

function debug($datos, $salir=false) {
    echo "<pre>";
    var_dump($datos);
    echo "</pre>";
    if($salir) die();
}
?>