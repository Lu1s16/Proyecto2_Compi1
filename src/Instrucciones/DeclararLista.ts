import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Expresion } from "../Entorno/Expresion";


export class DeclararLista extends Instruccion {
    private id: string;
    private tipo: TipoPrimitivo;

    constructor(id: string, tipo: TipoPrimitivo, line: number, column: number, private cadena: Expresion | null){
                                                                                       //cadena recibe una expresion, que es el new ToCharArray que envio desde $$
        super(line, column)
        this.id = id;
        this.tipo = tipo;
    }


    public Ejecutar(env: Ambito) {


        if(this.cadena){

            console.log("declaracion de lista tipo 2: " + this.id);
            env.guardarlista(this.id, this.tipo, this.line, this.column);

            const lista = env.getLista(this.id)!;

            
            

            //console.log(elementos)

            lista.declarar2(this.cadena, env);


        } else {

            console.log("Declaracion de listaa: " + this.id);

            env.guardarlista(this.id, this.tipo, this.line, this.column);

        }


        

        
    }


}