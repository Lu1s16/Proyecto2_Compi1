import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";



export class AccesoVector extends Expresion {

    constructor(private id: string, private pos:Expresion, line: number, column:number){
        super(line, column)
    }


    public Get(env: Ambito): Return {


        //Obtengo el vector
        const vector = env.getVector(this.id);

        if(vector){

            const index = this.pos.Get(env);

            if(index.type == TipoPrimitivo.Integer){

                const val = vector.getAtributo(index.value);

                return { value: val, type: vector.tipo};

            } 
            
            console.log("Error: la posicion no es tipo entero")
            return { value: null, type: TipoPrimitivo.Null };


        }

        console.log("Error: No existe el vector")
        return { value: null, type: TipoPrimitivo.Null };
        
    }

}