class CalcController{

    constructor(){
        let date = new Date(); //estamos instanciando a classe Date();
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display"); // indicando que o valor aonde o ID determinado por # terá esse valor
        this._dateCalcEl = document.querySelector("#data");// indicando que o valor aonde o ID determinado por # terá esse valor
        this._timeCalcEl = document.querySelector("#hora"); // indicando que o valor aonde o ID determinado por # terá esse valor
        this.initialize(); // toda vez que chamarmos o metodo, essa ação é executada. 
    }
    

    initialize(){ // start initialize
        //indicamos que essa ação irá se repetir no intervalo de milisegundos 
        setInterval(()=>{ // start setInterval
            this.displayDate = this.currentDate.toLocaleDateString(this._locale);
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        }, 1000); // end setInterval \\ // indicando os milisegundos \\

        
    } // end initialize

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

}