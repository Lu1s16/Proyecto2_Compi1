import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Ambito } from "../Entorno/Ambito";
import { Return } from "../Entorno/Simbolos/Return";

export class Logicas extends Expresion {

    constructor(private exp1: Expresion|null, private operador: any, private exp2: Expresion, line: number, column: number){
        super(line, column)
    }

    public Get(env: Ambito): Return {

        if(this.exp1 != null){
            //Efectua or y and
            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            switch(this.operador){

                case "||":
                    return {value: op1.value || op2.value, type: TipoPrimitivo.Boolean};
    
                case "&&":
                    return {value: op1.value && op2.value, type: TipoPrimitivo.Boolean};
    
            }

        } else {
            const op2 = this.exp2.Get(env);

            return {value: !op2.value, type: TipoPrimitivo.Boolean};

        }
        
        

        

        return {value: "Error", type: TipoPrimitivo.Null};

    }

}