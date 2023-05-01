import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";


export class ToUpper extends Expresion {

    constructor(private exp: Expresion, line: number, column: number){
        super(line, column);
    }

    public Get(env: Ambito): Return {
        
        const val = this.exp.Get(env);


        if(val.type == TipoPrimitivo.String){

            return {value: val.value.toUpperCase(), type: TipoPrimitivo.String}

        }
            
        console.log("Error: la expresion no es de tipo string")
        

        return {value: null, type: TipoPrimitivo.Null}


    }

}