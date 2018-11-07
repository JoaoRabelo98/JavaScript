function calc(x1, x2, operador){ // inicio funcao comum 

    return eval(`${x1} ${operador} ${x2} `);  // utilizando a funcao eval (evaluate ) vai executar essa string. 
    
} // fim funcao comum


let resultado = calc(129,123 , "/");

console.log(resultado);

// ================================================================================================================== \\

(function (x1, x2, operador){ // inicio funcao anonima 

    return eval(`${x1} ${operador} ${x2} `);  // utilizando a funcao eval (evaluate ) vai executar essa string. 
    
})(129,123 , "/");  // fim funcao anonima 

//Funcao anonima você nao consegue chama-la, pois ela é anonima, ou seja, serve para indicar algo que será constante. 

// ================================================================================================================== \\

let calc = (x1, x2, operador) => { // inicio aeroFunction 

    return eval(`${x1} ${operador} ${x2} `);  // utilizando a funcao eval (evaluate ) vai executar essa string. 
    
} // fim aeroFunction
//Pode funcionar também como callback
//callback = função de retorno dentro de uma funcao
// aeroFunction consegue compartilhar informações que estão la dentro pra todo o código 