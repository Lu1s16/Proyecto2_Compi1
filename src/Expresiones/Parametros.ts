import { Expresion } from "../Entorno/Expresion";
import { Return } from "../Entorno/Simbolos/Return";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Ambito } from "../Entorno/Ambito";


export class Parametros extends Expresion {

    constructor(private tipo: TipoPrimitivo, private id: string, line: number, column: number){
        super(line, column)
    }

    //consigue el valor de cada parametro
    public Get(env: Ambito): Return {
        
        return { value: this.id, type: this.tipo};

    }

}