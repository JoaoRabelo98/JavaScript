class CalcController{

    constructor(){
        let _catchDate = new Date(); //estamos instanciando a classe Date();
        this._displayCalc = "0"; // atribuindo um valor padrao ao display
        this._currentDate = _catchDate.toLocaleDateString("pt-BR"); //estamos indicando que a variavel local recebe a data atual.
        this.initialize(); // toda vez que chamarmos o metodo, essa ação é executada. 
    }

    initialize(){ // start initialize



    } // end initialize

    get displayCalc(){ // start getDisplay
        return this._displayCalc;
    }//end getDisplay

    set displayCalc(displayCalc){ //start setDisplay
        this._displayCalc = displayCalc;
    } // end setDisplay

    get currentDate(){ // start getCurrentDate
        return this._currentDate;
    } // end getCurrentDate

}