import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


export class DeclararLista extends Instruccion {
    private id: string;
    private tipo: TipoPrimitivo;

    constructor(id: string, tipo: TipoPrimitivo, line: number, column: number){
        super(line, column)
        this.id = id;
        this.tipo = tipo;
    }


    public Ejecutar(env: Ambito) {


        console.log("Declaracion de listaa: " + this.id);

        env.guardarlista(this.id, this.tipo, this.line, this.column);

        
    }


}