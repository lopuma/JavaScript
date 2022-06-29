import Sub from "./Sub.js";
export default class Test {
    constructor() {
        this.sub = new Sub();
        console.log("Test inicializado");
    }

    saluda(texto) {
        console.log(texto);
    }
}