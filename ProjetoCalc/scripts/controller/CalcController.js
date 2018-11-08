class CalcController{

    constructor(){
        let date = new Date(); //estamos instanciando a classe Date();
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateCalcEl = document.querySelector("#data");
        this._timeCalcEl = document.querySelector("#hora"); 
        this.initialize(); // toda vez que chamarmos o metodo, essa ação é executada. 
    }
    

    initialize(){ // start initialize
  

        this._displayCalcEl.innerHTML = "4567";
        
        setInterval(()=>{
            this._dateCalcEl.innerHTML = this.currentDate.toLocaleDateString(this._locale);
            this._timeCalcEl.innerHTML = this.currentDatE.toLocaleTimeString(this._locale);
        }, 100);

        
    } // end initialize

    get displayCalc(){ // start getDisplay
        return this._displayCalcEl.innerHTML;
    }//end getDisplay

    set displayCalc(displayCalc){ //start setDisplay
        this._displayCalcEl.innerHTML = displayCalc;
    } // end setDisplay

    get currentDate(){ // start getCurrentDate
        return new Date();
    } // end getCurrentDate

    get currentTime(){ // start getCurrentDate
        return this._currentTime;
    } // end getCurrentDate

}