import { Instruccion } from "../Entorno/Instruccion";
import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";
import { Return } from "../Entorno/Simbolos/Return";
import { OperacionesUnarios } from "../Expresiones/OperacionesUnarios";

export class For extends Instruccion {

    constructor(private variable:Instruccion, private condicion: Expresion, private incremento:Instruccion, private code:Instruccion, line:number, column:number){
        super(line, column)

    }


    public Ejecutar(env: Ambito) {
        

        //declarar la variable
        this.variable.Ejecutar(env);

        //contador para evitar ciclos infinitos
        let contador = 0;
        while(true){

            //obtener el valor de la condicion
            const condicion = this.condicion.Get(env);
            //console.log(condicion.value);
            if(condicion != null && condicion != undefined){
                //console.log("-----------------"+condicion.value)
                if(!condicion.value){
                    this.variable.Ejecutar(env);
                    //console.log("Elimino este ambito for")
                    
                    break;
                }
            }

            //Ejecutar instrucciones
            this.code.Ejecutar(env);

            if(contador > 1000){
                console.log("Error: ciclo infinito");
                break;
            }

            if(this.incremento instanceof OperacionesUnarios){
                this.incremento.Get(env);
            }
            contador++;



        }


    }


}