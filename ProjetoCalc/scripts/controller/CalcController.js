class CalcController{

    constructor(){
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        let date = new Date(); //estamos instanciando a classe Date();
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display"); // indicando que o valor aonde o ID determinado por # terá esse valor
        this._dateCalcEl = document.querySelector("#data");// indicando que o valor aonde o ID determinado por # terá esse valor
        this._timeCalcEl = document.querySelector("#hora"); // indicando que o valor aonde o ID determinado por # terá esse valor
        this.initialize(); // toda vez que chamarmos o metodo, essa ação é executada. 
        this.initButtonsEvents();
        this.initKeyboard();
        this.pasteFromClipboar();
    }

    pasteFromClipboar(){
        document.addEventListener('paste' , e=>{
            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);
            console.log(text);
        });
    }

    copyToClipboard(){
        let input = document.createElement('input');
        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
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
        this.setLastNumberToDisplay();

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {
                this.toggleAudio();
            })

        });
        

    } // end initialize

    toggleAudio(){
        this._audioOnOff = !this._audioOnOff;
    }

    playAudio(){
        if(this._audioOnOff) {
            this._audio.currentTime = 0; 
            this._audio.play();
        }
    }

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

    set displayCalc(value){ //start setDisplay
        if(value.toString().length > 10){
            this.setError(); 
            return;
        }
        this._displayCalcEl.innerHTML = value;
    } // end setDisplay
//==============================================================================\\

    initKeyboard(){
        
        document.addEventListener('keyup', e=>{
            this.playAudio();
            switch(e.key){
                case 'Escape':
                    this.clearAll();                
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%': 
                    this.addOperation(e.key);
                    break;                    
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot();
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
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
    
            }
        });
    }

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
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    } // end function clearALL


    clearEntry(){ // function limpa ultimo valor
        this._operation.pop();
        this.setLastNumberToDisplay();
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
        
        if(this._operation.length>3 )this.calc();
    }

    getResult(){
        try{
            return  eval(this._operation.join(""));
        }catch (e){
            setTimeout(()=>{
                this.setError();
            },1);            
        }    
    }

    calc(){

        let last ='';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3 ) {
            last = this._operation.pop();
            
            this._lastNumber = this.getResult();
        }else if(this._operation.length == 3){
            
            this._lastNumber = this.getLastItem(false);
        }

        

        
        let result = this.getResult();

        if(last =='%'){

            result /= 100;
            this._operation = [result];

        }else{

            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true){
        let lastItem; 

        for(let i = this._operation.length -1 ; i >= 0 ; i--){
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break
            }
        }

        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false); 


        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    addOperation(value){
        

        if(isNaN(this.getLastOperation())){ // verificando se o ultimo numero não é um numero
            //String
            if(this.isOperator(value)){ // verificando se é um operador utilizando o metodo isOperator
                this.setLastOperation(value); 
            }else{// caso não seja os valores acima, vai inserir um valor
              this.pushOperation(value);
              this.setLastNumberToDisplay();
            }
        }else { // caso seja um numero 
            //Number

            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString(); //concatenamos o ultimo valor com o valor digitado
                this.setLastOperation(newValue); // inserimos o resultado do newValue convertido em int para o o array como um numero inteiro

                //atualizar display

                this.setLastNumberToDisplay();
            }
           
        }

       
    }

    setError(){
        this.displayCalc = "Error";
    }

    addDot(){

        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return; 

        if(this.isOperator(lastOperation)|| !lastOperation){
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    execBtn(value){ // criamos a function execBtn para verificar e executar os valores do botão.
        this.playAudio();
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
                this.calc();
                break;
            case 'ponto':
                this.addDot();
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