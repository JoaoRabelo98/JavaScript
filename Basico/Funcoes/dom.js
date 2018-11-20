//  DOM = Document Object Model

// Serve para manipular o HMTL (inserir e retirar). Dará vida ao HTML


window.addEventListener('focus', event => { // iniciando um novo evento 

    console.log("focus"); // toda vez que o usuario sair e voltar da pagina, irá aparecer a mensagem de "focus"

}); // fim evento \\  // window manipulamos toda a aplicação \\ 


document.addEventListener('click', event =>{ // iniciando um novo evento

    console.log("clique"); // toda vez que o usuario clicar no navegador, irá aparecer a mensagem de "clique"

});//fim evento \\ 