class CalcController{

    constructor(){
        this._operation = [];
        let date = new Date(); //estamos instanciando a classe Date();
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display"); // indicando que o valor aonde o ID determinado por # terá esse valor
        this._dateCalcEl = document.querySelector("#data");// indicando que o valor aonde o ID determinado por # terá esse valor
        this._timeCalcEl = document.querySelector("#hora"); // indicando que o valor aonde o ID determinado por # terá esse valor
        this.initialize(); // toda vez que chamarmos o metodo, essa ação é executada. 
        this.initButtonsEvents();
    }
    

    initialize(){ // start initialize
        this.setDisplayDateTime();
        //indicamos que essa ação irá se repetir no intervalo de milisegundos 
        setInterval(()=>{ // start setInterval que ira repetir a cada 1 segundo. 
           this.setDisplayDateTime();
        }, 1000); // end setInterval \\ // indicando os milisegundos \\
        
        //===================================================\\

       /* setTimeout(() => {
            clearInterval(interval); // podemos utilizar o timeout para que pare de executar determinado comando em algum momento.
        }, 10000); */       

        //===================================================\\

    } // end initialize

    setDisplayDateTime(){ // function setDisplayTime setada para indicar data e hora
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit", 
            month: "long", 
            year:"numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    } // end setDisplayTime

    get displayCalc(){ // start getDisplay
        return this._displayCalcEl.innerHTML;
    }//end getDisplay

    set displayCalc(displayCalc){ //start setDisplay
        this._displayCalcEl.innerHTML = displayCalc;
    } // end setDisplay
//==============================================================================\\
    get currentDate(){ // start getCurrentDate
        return new Date();
    } // end getCurrentDate
//===============================================================================\\
    get displayTime(){ // start getDisplayTime
        return this._timeCalcEl.innerHTML;
    } // end getDisplayTime

    set displayTime(value){ // start setDisplayTime
        this._timeCalcEl.innerHTML = value; 
    } // end setDisplayTime
//===============================================================================\\
    get displayDate(){ // start getDisplayDate
        return this._dateCalcEl.innerHTML;
    } // end getDisplayDate
    set displayDate(value){  // start setDisplayDate
        this._dateCalcEl.innerHTML = value; 
    } // end setDisplayDate
//===============================================================================\\ 

    clearAll(){ //function clearAll
        this._operation = [];
    } // end function clearALL


    clearEntry(){ // function limpa ultimo valor
        this._operation.pop();
    } //end function clearEntry

    getLastOperation(){ // function para pegar o ultimo valor
        return this._operation[this._operation.length - 1];
    } //end getLastOperation

    isOperator(value){ // function para verificar se é um operador
        return (['+','-','*','%','/'].indexOf(value) > -1 ) ;
    } // end isOperator

    setLastOperation(value){ //function setLastOperation setada para substituir o ultimo valor 
        this._operation[this._operation.length - 1] = value;
    } // end setLastOperation

    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3){
            this.calc();
        }
    }

    calc(){
        let last = this._operation.pop();
        let result = eval(his._operation.join());

        this._operation = [result, last];

    }

    addOperation(value){
        

        if(isNaN(this.getLastOperation())){ // verificando se o ultimo numero não é um numero
            //String
            if(this.isOperator(value)){ // verificando se é um operador utilizando o metodo isOperator
                this.setLastOperation(value); 
            }else if (isNaN(value)){ // valida se o ultimo numero digitado é um numero 
                console.log(value); //imprime o valor
            }else{// caso não seja os valores acima, vai inserir um valor
                pushOperation(value);
            }
        }else { // caso seja um numero 
            //Number

            if(this.isOperator(value)){
                pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString(); //concatenamos o ultimo valor com o valor digitado
                this.setLastOperation(parseInt(newValue)); // inserimos o resultado do newValue convertido em int para o o array como um numero inteiro

                //atualizar display

                this.setLastNumberToDisplay();
            }
           
        }

       
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){ // criamos a function execBtn para verificar e executar os valores do botão.
        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1': 
            case '2': 
            case '3':
            case '4': 
            case '5':
            case '6':
            case '7': 
            case '8':
            case '9': 
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break; 

        }
    } // end execBtn

//===============================================================================\\
    addEventListenerAll(element,events, fn){ // criamos o addEventListenerAll para permitir que vários eventos sejam executados simultaneamente. 
        events.split(' ').forEach(event => {
           element.addEventListener(event, fn, false);
           element.style.cursor = "pointer";
        });

    } // end addEventListenetAll


    initButtonsEvents(){ // start initButtonsEvents
        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // estamoos pegando todos os resultados dos parametros passados

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, "click drag", e => { // estamos chamando o EventListenerAll
                let textBtn = btn.className.baseVal.replace("btn-",""); //estamos aplicando o value do btn a variaval textBtn
                this.execBtn(textBtn);
            });
        });
    } // end initButtonsEvents 


}