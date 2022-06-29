// Cosas que vamos haciendo...
function escogeAlAlzar(param) {
    var num = parseInt(Math.random() * colores.length);
    return colores[num];
}
var crono = setInterval(()=>{
    var escogido = escogeAlAlzar(colores);
}, 2000);