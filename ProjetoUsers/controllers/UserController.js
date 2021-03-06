class UserController{

    constructor(formId, tableId){ //start constructor
        this.tableEl = document.getElementById(tableId);
        this.formEl = document.getElementById(formId);

        this.onSubmit();
        this.onEdit();

    } //end constructor

    onEdit(){
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click",e=>{
            this.showPanelCreate();
        });
    }

    onSubmit(){ //start submit

        this.formEl.addEventListener("submit", event => { // ao clicar no botão 'enviar' irá executar essa ação

            event.preventDefault(); // cancela o ato padrão do envio do form 

            let values = this.getValues();

            if(!values) return false; 

            this.getPhoto().then((content)=>{
                // primeira function
                values.photo = content;
                this.addLine(values); 
              
                this.formEl.reset();
            }, (e)=>{
                // segunda function
                console.error(e);
               
            });

            this.formEl.reset();
           
        });
    } //end submit

    getPhoto(){ //start metodo getPhoto

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader(); // chamamos a api do file reader.

            let elements = [...this.formEl.elements].filter(item => {
                if(item.name === 'photo') {
                    return item; 
                } 
            });
            
            let file = elements[0].files[0];
            
            fileReader.onload = ()=>{

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {
                reject(e);
            };

            if(file) fileReader.readAsDataURL(file);
            else {
                resolve('dist/img/avatardefault.png');
            }

        });

    } // end getPhoto

    addLine(dataUser){ // criada a funciton addLine para adicionar uma nova linha de usuário
        
        let locale = "pt-BR";

        let tr = document.createElement('tr');

        tr .dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = ` 
        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(!dataUser.admin) ? "Não" : "Sim"}</td>
            <td>${dataUser.register.toLocaleDateString(locale)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        
        `;
        this.tableEl.appendChild(tr); 

       
        this.updateCount();

        tr.querySelector(".btn-edit").addEventListener('click', e=>{
            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector("#form-user-update");

            for (let name in json){
                let field = form.querySelector("[name=" + name.replace("_","")+"]");
                
                if(field) {
                    

                    switch(field.type){
                        case 'file':
                            continue;
                        break;

                        case 'radio':
                            field = form.querySelector("[name=" + name.replace("_","")+"][value="+ json[name] +"]");
                            field.checked = true; 
                        break; 

                        case 'checkbox':
                            field.checked = json[name];
                        break;

                        default:
                            field.value = json[name];

                    }

                    
                }
            }

            this.showPanelUpdate();
        });


    } // end addLine

    updateCount(){

        let numberUsers = 0; 
        let numberAdmin = 0; 

        console.log(document.querySelectorAll("number-users"));



        [...this.tableEl.children].forEach(tr=>{
            numberUsers++;
            
            let user = JSON.parse(tr.dataset.user);

            if(user._admin) numberAdmin++; 

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }

    showPanelCreate(){
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";
    }

    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    }

    getValues(){ //start getValues 

        let newUser = {};
        let isValid = true; 
        [...this.formEl.elements].forEach(function(field, index){ // estamos rodando os valores do form com um foreach 

            

            if(['name','email','password','country'].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add('has-error');
                isValid = false; 
            }else field.parentElement.classList.remove('has-error');

            if (field.name === 'gender' && field.checked) {
                newUser[field.name] = field.value;
            }else if(field.name === 'admin' && !field.checked ){
                newUser[field.name] = false;
                
            }else if (field.name !== 'gender') {
                newUser[field.name] = field.value;
            } 
    
            
        });
        
       if(!isValid) return false; 

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