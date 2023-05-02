import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";
import { Instruccion } from "../Entorno/Instruccion";


export class Main extends Instruccion {
    constructor(private id: string, private argumentos:Array<Expresion>, line: number, column: number){
        super(line, column);
    }

    //Ejecutar la funcion o metodo
    public Ejecutar(env: Ambito): any {

        const funcion = env.getFuncion(this.id);
        const metodo = env.getMetodo(this.id);


        if(funcion != null){
            //significa que si existe y se crea un nuevo entorno
            const envFun = new Ambito(env.getGlobal());

            //guardo los parametros y verifico que si vengan todos
            if(funcion.parametros.length == this.argumentos.length){
                //Si vienen todos

                //Recorro los parametros y los guardo

                for(let i = 0; i < funcion.parametros.length; i++){
                    const valor = this.argumentos[i].Get(env);
                    const param = funcion.parametros[i].Get(env);


                    //verifico el tipo que si coincida
                    if (valor.type == param.type) {

                        //Guarda los valores pero en el ambito funcion
                        //console.log("guardar variables de ambito funcion")
                        envFun.guardar(param.value, valor.value, valor.type, this.line, this.column);


                    } else {
                        console.log("Error: el parametro " + param.value + "no coincide su tipo con el que neceista la funcion")
                    }

                }

                //Se ejecuta las instrucciones de la funcion
                return funcion.statement.Ejecutar(envFun);
                //console.log("Termino de ejecutar las instrucciones")

                

            } else {
                console.log("Error: la funcion " + this.id + " no tiene la cantidad de parametros necesitados");
            }


        } else if (metodo != null) {

            const envFun = new Ambito(env.getGlobal());

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
            console.log("Erro: no existe el metodo/funcion")
        }

    }


}
