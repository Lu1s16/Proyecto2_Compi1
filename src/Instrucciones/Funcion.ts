import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


export class Funcion extends Instruccion {
    constructor(private tipo: TipoPrimitivo, private id:string, public parametros:Array<Expresion>, public statement: Instruccion, line: number, column: number){
        super(line, column)
    }

    public Ejecutar(env: Ambito) {
        env.guardarFuncion(this.id, this, this.line, this.column);
    }


}

