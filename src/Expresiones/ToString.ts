import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";


export class ToString extends Expresion {

    constructor(private exp: Expresion, line: number, column: number){
        super(line, column);
    }

    public Get(env: Ambito): Return {
        
        const val = this.exp.Get(env);


        if(val.type == TipoPrimitivo.Boolean || val.type == TipoPrimitivo.Integer || val.type == TipoPrimitivo.Double){

            return {value: val.value.toString(), type: TipoPrimitivo.String}

        }
            
        console.log("Error: la expresion no es de tipo numerico o booleano")
        

        return {value: null, type: TipoPrimitivo.Null}


    }

}