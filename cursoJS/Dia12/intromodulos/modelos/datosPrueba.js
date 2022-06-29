// Esta variable no lleva el "export" delante, así que no es accesible desde fuera de este archivo (si se usa como un módulo)
var secreto = "dodgerblue";
// ... pero se puede usar su valor dentro de otra que sí se está exportando, de modo que estaría funcionando como una variable "privada"
let colores = ["red", "pink", "green", "blue", "purple", "grey", "orange", secreto];

let nombres = ["Aidulfo", "Gertrudis", "Aurelio", "Leocadia"];

export {colores, nombres}