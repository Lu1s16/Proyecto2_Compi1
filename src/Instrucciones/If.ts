import { Instruccion } from "../Entorno/Instruccion";
import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";
import { Return } from "../Entorno/Simbolos/Return";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


export class If extends Instruccion {

    constructor(private condicion: Expresion, private statementIf: Instruccion, private statementElse: Instruccion | null, linea: number, columna: number){
        super(linea, columna);

    }

    public Ejecutar(env: Ambito) {

        //Obtener el valor de la condicion
        const condicion = this.condicion.Get(env);

        if(condicion.type == TipoPrimitivo.Boolean){

            //si es verdadero
            if(condicion.value){

                //this.statementIf es de la clase Statement
                this.statementIf.Ejecutar(env);

            } else {
                if(this.statementElse != null){
                    this.statementElse.Ejecutar(env);
                }

            }

        }


    }

}