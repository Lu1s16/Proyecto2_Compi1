import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { ReturnExpression } from "../Expresiones/Return";


export class Statement extends Instruccion {

    constructor(private body: Array<Instruccion>, line:number, column: number){
        super(line, column);
    }

    //Ejecuta todas las instrucciones del ambito
    public Ejecutar(env: Ambito) {
        
        //Crea un nuevo ambito
        const newEnv = new Ambito(env, "Funcion");

        //body contienen todas las instrucciones de la funcion
        for(const instrucciones of this.body) {

            try{

                if(instrucciones instanceof ReturnExpression){
                    instrucciones.Get(newEnv);
                    console.log("Instruccion de return")

                } else {
                    instrucciones.Ejecutar(newEnv);

                }

                //const ret = instrucciones.Ejecutar(newEnv);
                //si la instruccion es un return, retorna el valor
                

            }catch(e){
                console.log("Error, al ejecutar instrucciones")
            }

        }


    }

}
