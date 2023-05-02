import { TipoPrimitivo } from "./Simbolos/TipoPrimitivo";
import { Variable } from "./Simbolos/Variable"
import { Tabla_simbolos, ListaTabla } from "../Reportes/Tabla_simbolos";
import { Funcion } from "../Instrucciones/Funcion";
import { Lista } from "./Simbolos/Lista";
import { Vector } from "./Simbolos/Vector";
import { Expresion } from "./Expresion";
import { Metodo } from "../Instrucciones/Metodo";


export class Ambito {
    //Map de simbolos, llave: valor(id) valor: simbolo
    private variables = new Map<string, Variable>();
    
    private funciones = new Map<string, Funcion>();
    private listas = new Map<string, Lista>();
    private vectores = new Map<string, Vector>();
    private metodos = new Map<string, Metodo>();

    //tendra un ambito
    constructor(private anterior: Ambito | null){
        //Nuevo map para variables
        this.variables = new Map<string, Variable>();
        
        


        //Se puede tener un map para las listas, vectores, funciones y metodos
    }

    //Este metodo guarda las variables en un entorno
    public guardar(id: string, valor: any, tipo: TipoPrimitivo, linea: number, columna:number ){

        //Verificar el ambito
        let env: Ambito | null = this;

        //Verificar que exista la variable
        console.log("Estoy guardando la variable: " + id);
        if(!env.variables.has(id.toLowerCase())){
            //En este caso aun no esta la variable que definimos

            //Guarda la variable
            //Guarda la variable en una tabla de simbolos
            env.variables.set(id.toLowerCase(), new Variable(valor, id, tipo));

            //en el push se esta metiendo un objeto de tabla_simbolo
            //Esta es mi tabla de simbolos
            ListaTabla.push( new Tabla_simbolos(id, tipo, "ambito" , linea, columna))


        } else {

            console.log("Error: ya existe la variable")
        }

    }

    //guarda las variables por default
    public guardar_default(id: string, valor: any, tipo: TipoPrimitivo, linea: number, columna:number ){

        //Verificar el ambito
        let env: Ambito | null = this;

        //Verificar que exista la variable
        console.log("Estoy guardando la variable por defecto: " + id);
        if(!env.variables.has(id.toLowerCase())){
            //En este caso aun no esta la variable que definimos

            //Guarda la variable
            //Guarda la variable en una tabla de simbolos
            env.variables.set(id.toLowerCase(), new Variable(valor, id, tipo));

            ListaTabla.push( new Tabla_simbolos(id, tipo, "ambito", linea, columna))


        } else {

            console.log("Error: ya existe la variable declarada")
        }

    }

    //asignar nuevo valor a una variable
    public actualizar_var(id: string, valor: any, tipo: TipoPrimitivo, linea: number, columna:number ){

        //Verificar el ambito
        let env: Ambito | null = this;

        //Verificar que exista la variable
        console.log("Estoy actualizando la variable: " + id);
        if(!env.variables.has(id.toLowerCase())){
            //Si aun no existe se guarda la variable

  
            env.variables.set(id.toLowerCase(), new Variable(valor, id, tipo));

        } else {
            //si ya existe se actualiza su valor
            env.variables.set(id.toLowerCase(), new Variable(valor, id, tipo));

            //console.log("Error: ya existe la variable declarada")
        }

    }






    //Obtener una variable de un entorno
    public getVar(id: string): Variable | null {

        //Verificar el ambito
        let env: Ambito | null = this;

        //Buscar la variable en el entorno actual
        while(env != null){

            //Verificar que exista la variable
            
            if(env.variables.has(id.toLowerCase())){
                
                return env.variables.get(id.toLowerCase())!;
            }

            env = env.anterior;
        }

        return null;

    }

    //Guardar la funcion
    public guardarFuncion(id: string, funcion: Funcion, line:number, column:number) {

        //Verificar el ambito
        let env: Ambito | null = this;

        //verificar si la funcion ya existe
        if(!env.funciones.has(id.toLowerCase())) {
            //guardo la variable en el entorno de la funcion enviada

            console.log("Se guardo la funcion: "+ id);
            env.funciones.set(id.toLowerCase(), funcion);

            ListaTabla.push( new Tabla_simbolos(id, TipoPrimitivo.Funcion, "ambito", line, column))

        } else {

           console.log("Error: la funcion: "+ id + " ya existe en el entorno")
        }

    }

    //Obtiene la funcion a ser llamada
    public getFuncion(id: string): Funcion | null {

        //verifica el ambito
        let env: Ambito | null = this;

        //busca la variable de la funcion
        while(env != null){

            //verificar que si existe
            if(env.funciones.has(id.toLowerCase())){
                return env.funciones.get(id.toLowerCase())!;
            }

            //cambia de entorno
            env = env.anterior

        }

        //retorna null ya que no esta la funcion
        return null;

    }

    public guardarMetodo(id: string, metodo: Metodo, line: number, column: number){

        //verificar ambito
        let env: Ambito | null = this;

        if(!env.metodos.has(id.toLowerCase())){

            console.log("Se guardo el metodo: "+ id);
            env.metodos.set(id.toLocaleLowerCase(), metodo)


        } else {
            console.log("Erro: el metodo "+ id + " ya existe");
        }

    }

    public getMetodo(id: string): Metodo | null {

        let env: Ambito | null = this;

        while(env != null){

            if(env.metodos.has(id.toLowerCase())){
                return env.metodos.get(id.toLowerCase())!;

            }

            env = env.anterior

        }

        return null

    }


    //Obtiene el ambito global
    public getGlobal(): Ambito {
        let env:Ambito | null = this;

        //Busca la variable del entorno global
        while(env.anterior != null) {

            //va regresando hasta llegar al entorno global
            env = env.anterior;
        }

        //retorna el ambito global
        return env;

    }


    public guardarlista(id: string, tipo: TipoPrimitivo, line:number, column:number) {

        let env: Ambito | null = this;

        

        if(!env.listas.has(id.toLowerCase())){
            console.log("Estoy guardando la lista: " + id);
            //Si no lo tiene se guarda

            env.listas.set(id.toLowerCase(), new Lista(id, tipo));


            //luego lo meto a la tabla de simbolos
            ListaTabla.push( new Tabla_simbolos(id, TipoPrimitivo.Lista, "ambito", line, column))


        } else {

            console.log("Error: Ya existe la lista");

        }

    }

    public getLista(id: string): Lista | null{

        let env: Ambito | null = this;


        while(env != null){


            if(env.listas.has(id.toLowerCase())){
                //console.log("lista encontrada");

                return env.listas.get(id.toLowerCase())!;

            }

            env = env.anterior;


        }


        return null;


    }


    public guardarvector(id: string, tipo: TipoPrimitivo, size: number, linea:number, columna: number){

        let env: Ambito | null = this;
        console.log("Estoy guardando el vector: " + id);

        if(!env.vectores.has(id.toLowerCase())){

            env.vectores.set(id.toLowerCase(), new Vector(id, tipo, size));

            ListaTabla.push( new Tabla_simbolos(id, TipoPrimitivo.Vector , "ambito", linea, columna))

        } else {
            console.log("Error: ya existe el vector: " + id);
        }

    }


    public getVector(id: string): Vector | null {

        let env: Ambito | null = this;

        while(env != null){

            if(env.vectores.has(id.toLowerCase())){

                return env.vectores.get(id.toLowerCase())!;

            }

            env = env.anterior;

        }

        return null;

    }

}

function timeout(arg0: () => void, timeout: any): TipoPrimitivo {
    throw new Error("Function not implemented.");
}
