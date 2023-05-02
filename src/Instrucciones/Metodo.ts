import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class Metodo extends Instruccion {

    constructor(private id:string, public parametros:Array<Expresion>, public statement: Instruccion, line: number, column: number){
        super(line, column);
    }


    public Ejecutar(env: Ambito) {
        
        env.guardarMetodo(this.id, this, this.line, this.column);


    }

}