let carros = ["FIAT", "WOLKS" , "BMW" , "JAC" ]; // criaça de um array nao tipado, pode ter mais de um valor \\

 carros.forEach(function(values, index){
    index = index + 1;
    console.log(index, values);
 });