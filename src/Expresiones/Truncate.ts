import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";


export class Truncate extends Expresion {

    constructor(private exp: Expresion, line: number, column: number){
        super(line, column);
    }


    public Get(env: Ambito): Return {
        
        const val = this.exp.Get(env);


        if(val.type == TipoPrimitivo.Double || val.type == TipoPrimitivo.Integer){

            return { value: Math.trunc(val.value), type: TipoPrimitivo.Integer};

        } 
            
        console.log("Eror: la expresion no es de tipo numerico")

        return { value: null, type: TipoPrimitivo.Null};

        

    }

}