import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


export class Asignar extends Instruccion {

    private id: string;
    private valor: Expresion | null;

    constructor(id: string, valor: Expresion | null, line: number, column: number){
        super(line, column);
        this.id = id;
        this.valor = valor;

    }

    //Aqui asigno nuevo valor a una variable

    public Ejecutar(env: Ambito): any {
        //console.log("Estoy asignando una variable")


        if(this.valor != null){

            
            //a = 20;

            const val = this.valor.Get(env);
            //console.log("Estoy actualizando el valor: "+ val.value);
            env.actualizar_var(this.id, val.value, val.type);

        }



    }

}
