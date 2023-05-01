import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Expresion } from "../Entorno/Expresion";



export class PushLista extends Instruccion {

    
    
    
    constructor(private id: string, private exp: Expresion | null, line:number, column: number){
        super(line, column);

    }


    public Ejecutar(env: Ambito) {

        if(this.exp != null){

            //Buscamos la lista

            const lista = env.getLista(this.id);

            if(lista){
                //para verificar que no sea null

                const typelist = lista.tipo;

                lista.addAtributo(this.exp, env, typelist);

            } else {
                console.log("Error: no existe la lista " + this.id + " para agregar un valor");

            }

            

            

        }

        
    }




}