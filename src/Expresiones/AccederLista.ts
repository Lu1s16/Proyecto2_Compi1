import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";



export class AccederLista extends Expresion {


    constructor(private id: string, private pos:Expresion, line: number, column: number){
        super(line, column);
    }


    public Get(env: Ambito): Return {


        //obtengo la lista
        const lista = env.getLista(this.id);

        if(lista){

            const index = this.pos.Get(env);

            if(index.type == TipoPrimitivo.Integer){

                const val = lista.getAtributo(index.value);


                return { value: val, type: lista.tipo };



            }

            console.log("Error: la posicion no es de tipo entero")

           
        }
        console.log("Error: No existe la lista "+ this.id + " para retornar un valor");

        return { value: null, type: TipoPrimitivo.Null };

        


        
    }

}