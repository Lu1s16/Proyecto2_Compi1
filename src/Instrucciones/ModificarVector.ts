import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Expresion } from "../Entorno/Expresion";


export class ModificarVector extends Instruccion {

    constructor(private id: string, private exp: Expresion, private new_exp: Expresion, line: number, column: number){
        super(line, column);

    }


    public Ejecutar(env: Ambito) {

        const vector = env.getVector(this.id);


        if(vector){

            const index = this.exp.Get(env);
            const new_value = this.new_exp.Get(env);

            if(index.type == TipoPrimitivo.Integer){
                console.log("Se actualizo la pos del vector: " + index.value + " con el valor de : " + new_value.value);

                vector.setAtributo(index.value, new_value.value);



            } else {
                console.log("Error: la posicion no es de tipo entero en el vector")
            }
        } else {
            console.log("Error: no existe el vector");
        }
        
    }

}