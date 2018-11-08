class CalcController{

    constructor(){
        let _catchDate = new Date();
        this._displayCalc = "0";
        this._currentDate = _catchDate.toLocaleDateString("pt-BR"); 
    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(displayCalc){
        this._displayCalc = displayCalc;
    }

    get dataAtual(){
        return this._currentDate;
    }

}