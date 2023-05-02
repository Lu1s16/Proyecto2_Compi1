import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";


export class ToCharArray extends Expresion {

    constructor(private exp: Expresion, line: number, column: number){
        super(line, column);
    }


    public Get(env: Ambito): Return {

        const val = this.exp.Get(env);
        //console.log(val.type)

        if(val.type == TipoPrimitivo.String){

            const lista = val.value.split("");

            //console.log(lista);

            return { value: lista, type: TipoPrimitivo.Lista }

        }

        return {value: null, type: TipoPrimitivo.Null};



        
    }

}