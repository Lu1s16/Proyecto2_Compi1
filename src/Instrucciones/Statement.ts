import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { ReturnExpresion } from "../Expresiones/ReturnExpresion";


export class Statement extends Instruccion {

    constructor(private body: Array<Instruccion>, line:number, column: number){
        super(line, column);
    }

    //Ejecuta todas las instrucciones del ambito
    public Ejecutar(env: Ambito) {
        
        //Crea un nuevo ambito
        const newEnv = new Ambito(env, "nuevo_ambito");

        //body contienen todas las instrucciones de la funcion
        for(const instrucciones of this.body) {

           

            //console.log("Instruccion: "+instrucciones.Ejecutar(newEnv));

            try{

                //Verifico si la instruccion es return
                if(instrucciones instanceof ReturnExpresion){

                    //si lo es hago un Get porqu es expresion
                    const ret = instrucciones.Get(newEnv);
                    //console.log("Ret: "+ret);

                    if(ret != null && ret != undefined){
                        return ret;
                    }
                    
                } else {
                    instrucciones.Ejecutar(newEnv);
                    //console.log("Ret: "+ret);

                

                }

                

            }catch(e){
                //console.error(e);
                console.log("Error, al ejecutar instrucciones: ")
            }

        }

    }

}
