class UserController{

    constructor(formId, tableId){ //start constructor
        this.tableEl = document.getElementById(tableId);
        this.formEl = document.getElementById(formId);

        this.onSubmit();

    } //end constructor

    onSubmit(){ //start submit

        this.formEl.addEventListener("submit", event => { // ao clicar no botão 'enviar' irá executar essa ação

            event.preventDefault(); // cancela o ato padrão do envio do form 

            let values = this.getValues();

            

            this.getPhoto((content)=>{
                values.photo = content;
                this.addLine(this.getValues()); //function addLine
            });

           
        });
    } //end submit

    getPhoto(callBack){ //start metodo getPhoto
        let fileReader = new FileReader(); // chamamos a api do file reader.

        let elements = [...this.formEl.elements].filter(item => {
            if(item.name === "photo") {
                return item; 
            } 
        });
        
        let file = elements[0].files[0];

        fileReader.onload = ()=>{

            callBack(fileReader.result);

        };

        fileReader.readAsDataURL(file);
    } // end getPhoto

    addLine(dataUser){ // criada a funciton addLine para adicionar uma nova linha de usuário
        let currentDate = new Date();
        currentDate = currentDate.toLocaleDateString("pt-BR");
        this.tableEl.innerHTML = ` 
        <tr>
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
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
    } // end addLine

    getValues(){ //start getValues 

        let newUser = {};
        
        [...this.formEl.elements].forEach(function(field, index){ // estamos rodando os valores do form com um foreach 
    
            if (field.name === 'gender' && field.checked) {
                newUser[field.name] = field.value;
            }else if(field.name === 'admin' && field.checked == false){
                newUser[field.name] = 'Não';
            }else if (field.name !== 'gender') {
                newUser[field.name] = field.value;
            }
    
        });
    
       return new User( // instanciamos a class user
            newUser.name,
            newUser.gender,
            newUser.birth,
            newUser.country,
            newUser.email,
            newUser.password,
            newUser.photo,
            newUser.admin
        );
    } //end getValues


}