import { Expresion } from "../Entorno/Expresion";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Instruccion } from "../Entorno/Instruccion";

//para la instruccion return


export class ReturnExpresion extends Expresion {

    constructor(private value:Expresion | null, line:number, column: number){
        super(line, column);
    }

    public Get(env: Ambito): Return {
        
        if(this.value != null && this.value != undefined){
            const value = this.value.Get(env);
            return { value: value.value, type: TipoPrimitivo.Return};
        }

        return { value: null, type: TipoPrimitivo.Null};

    }

}
