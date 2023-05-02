import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Expresion } from "../Entorno/Expresion";


export class DeclararVector extends Instruccion {
    private id: string
    private tipo: TipoPrimitivo;
    private size: Expresion;


    constructor(id: string, tipo: TipoPrimitivo, size: Expresion, line: number, column: number){
        super(line, column)
        this.id = id;
        this.tipo = tipo;
        this.size = size;
    }

    public Ejecutar(env: Ambito) {

        
        const val = this.size.Get(env);

        if(val.type == TipoPrimitivo.Integer) {
            env.guardarvector(this.id, this.tipo, val.value, this.line, this.column);

            //busco el vector para colocar los valores por default
            const vector = env.getVector(this.id);


            if(vector){

                const val = this.size.Get(env);
                const tamanio = val.value;
                console.log("Declaracion de vector: " + this.id);

                vector.declarar_Vector(tamanio, this.tipo);

            } else {
                console.log("Error: no existe el vector");

            }


        } else {
            console.log("Error: el tamaño no es de tipo entero")
        }


        

        
    }


}