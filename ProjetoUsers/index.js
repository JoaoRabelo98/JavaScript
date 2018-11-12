let fields = document.querySelectorAll("#form-user-create [name]");

let newUser = {};

function addLine(dataUser){
    currentDate = new Date();

    currentDate = currentDate.toLocaleDateString("pt-BR");

    var tr = document.createElement("tr");
    tr.innerHTML = `
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${currentDate}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>
    `;

    document.getElementById("table-users").appendChild(tr);

}

document.getElementById("form-user-create").addEventListener("submit", function(event){
    event.preventDefault(); // cancela o ato padrão do envio do form 
    fields.forEach(function(field, index){
    
        if (field.name === 'gender' && field.checked) {
            newUser[field.name] = field.value;
        }else if(field.name === 'admin' && field.checked == false){
            newUser[field.name] = 'off';
        }else if (field.name !== 'gender') {
            newUser[field.name] = field.value;
        }

    });
    addLine(newUser);
});