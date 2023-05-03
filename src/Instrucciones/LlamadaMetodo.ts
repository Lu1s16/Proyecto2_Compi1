import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";
import { Instruccion } from "../Entorno/Instruccion";


export class LlamadaMetodo extends Instruccion {

    constructor(private id: string, private argumentos:Array<Expresion>, line: number, column: number){
        super(line, column);
    }


    public Ejecutar(env: Ambito) {
        
        //Buscamos el metodo para ejecutarlo

        const metodo = env.getMetodo(this.id);
        
        if(metodo != null){

            const envFun = new Ambito(env.getGlobal(), this.id);

            if(metodo.parametros.length == this.argumentos.length){


                for(let i = 0; i < metodo.parametros.length; i++){
                    const valor = this.argumentos[i].Get(env);
                    const param = metodo.parametros[i].Get(env);

                    if(valor.type == param.type){

                        envFun.guardar(param.value, valor.value, valor.type, this.line, this.column);


                    } else {
                        console.log("Error: el parametro " + param.value + "no coincide su tipo con el que neceista el metodo");
                    }


                }

                metodo.statement.Ejecutar(envFun);

            }else {
                console.log("Error: el metodo "+ this.id + " no tiene la cantidad suficiente de parametros");
            }

        } else {
            console.log("Error: el metodo " + this.id + " no existe");
        }


    }

}