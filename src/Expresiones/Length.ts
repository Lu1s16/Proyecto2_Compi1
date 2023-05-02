import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";

export class Length extends Expresion {

    constructor(private exp: Expresion, iine: number, column: number){
        super(iine, column);
    }

    public Get(env: Ambito): Return {


        const val = this.exp.Get(env);

        if(val.type == TipoPrimitivo.String || val.type == TipoPrimitivo.Lista || val.type == TipoPrimitivo.Vector){

            return {value: val.value.length, type: TipoPrimitivo.Integer};

        } 

        return {value: null, type: TipoPrimitivo.Null};
        
    }

}