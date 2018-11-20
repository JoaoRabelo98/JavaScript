
/*
let Celular = function(){// iniciamos a classe 

    this.cor = "Prata"; // criamos um atributo da classe Celular

    this.Ligar = function(){ // criamos um metodo para a classe celular, utilizamo o this.

        return "Ligando!";

    } // terminamos o metodo

} // fechamos a classe

let objeto = new Celular();

console.log(objeto.Ligar());
*/

// melhor forma de criar para criar uma classe \\

class Celular{

    constructor(){

        this.cor = "Prata"

    }

    ligar(){

        return "Ligando!";

    }

}

let objeto = new Celular();

console.log(objeto.ligar());