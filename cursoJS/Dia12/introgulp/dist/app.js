var colores=["red","blue","yellow","green","purple","grey","black","white"];function escogeAlAlzar(e){var r=parseInt(Math.random()*colores.length);return colores[r]}var crono=setInterval(()=>{escogeAlAlzar(colores)},2e3);