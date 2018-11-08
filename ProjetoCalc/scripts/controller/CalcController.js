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

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit", 
            month: "long", 
            year:"numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

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