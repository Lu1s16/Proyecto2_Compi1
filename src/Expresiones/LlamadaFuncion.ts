import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";


export class LlamadaFuncion extends Expresion {
    constructor(private id: string, private argumentos:Array<Expresion>, line: number, column: number){
        super(line, column);
    }

    //Ejecuta la funcion

    public Get(env: Ambito): any {

        //se obtiene la funcion para ejecutarla
        //console.log("Buscando la funcion")
        const funcion = env.getFuncion(this.id);
        
        if(funcion != null){
            //significa que si existe y se crea un nuevo entorno
            const envFun = new Ambito(env.getGlobal(), this.id);

            //guardo los parametros y verifico que si vengan todos
            if(funcion.parametros.length == this.argumentos.length){
                //Si vienen todos

                //Recorro los parametros y los guardo

                for(let i = 0; i < funcion.parametros.length; i++){
                    const valor = this.argumentos[i].Get(env);
                    const param = funcion.parametros[i].Get(env);

                    if(valor){
                        //verifico el tipo que si coincida
                        if (valor.type == param.type) {
                        
                            //Guarda los valores pero en el ambito funcion
                            //console.log("guardar variables de ambito funcion")
                            envFun.guardar(param.value, valor.value, valor.type, this.linea, this.columna);
                        
                        
                        } else {
                            console.log("Error: el parametro " + param.value + "no coincide su tipo con el que neceista la funcion")
                        }

                    }

                    

                }

                //Se ejecuta las instrucciones de la funcion
                return funcion.statement.Ejecutar(envFun);
                //console.log("Termino de ejecutar las instrucciones")

                

            } else {
                console.log("Error: la funcion " + this.id + " no tiene la cantidad de parametros necesitados");
            }


        } else {
            console.log("Error: la funcion "+ this.id + " no existe");
        }


    }

}