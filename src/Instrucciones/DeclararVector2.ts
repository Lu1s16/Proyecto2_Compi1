import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


export class DeclararVector2 extends Instruccion {

    private id: string;
    private tipo: TipoPrimitivo;

    constructor(id: string, tipo: TipoPrimitivo, private valores: Array<Expresion>, line: number, column: number ){
        super(line, column);
        this.id = id;
        this.tipo = tipo;
    }


    public Ejecutar(env: Ambito) {
        

        //guardamos vector
        env.guardarvector(this.id, this.tipo, 0, this.line, this.column)

        //busco el vector para agregar los valores
        const vector = env.getVector(this.id);

        if(vector){


            vector.declarar_vector2(this.tipo, this.valores, env);


        } else {
            console.log("No existe el vector")
        }

    }






}