//import Parser from "./gramatica";
import { Ambito } from "../Entorno/Ambito";
import { Declarar } from "../Instrucciones/Declarar";
import { Funcion } from "../Instrucciones/Funcion";
import { Metodo } from "../Instrucciones/Metodo";
import { Main } from "../Instrucciones/Main";
import { ListaTabla } from "../Reportes/Tabla_simbolos";

export class Reporte{

    entrada: string;
    archivo: string;


    constructor(entrada:string, archivo:string){
        this.archivo = archivo;
        this.entrada = entrada;

    }


    public Analizar(): any {
        //console.log("Analizar")
        var parser = require("./gramatica")
        //let parser: any = Parser.parser;
        
        try{

            const ast = parser.parse(this.entrada);

            try{
                ListaTabla.splice(0, ListaTabla.length);
                

                const globalEnv = new Ambito(null, "Global");

                for(const inst of ast){
                    //Solo ejecuta funciones y declaraciones
                    //no ejecuta main ni tampoco ciclos, etc.
                    if(inst instanceof Declarar){
                        inst.Ejecutar(globalEnv);
                    } else if(inst instanceof Funcion){
                        inst.Ejecutar(globalEnv);
                    } else if(inst instanceof Metodo){
                        inst.Ejecutar(globalEnv);
                    }
                }

                for(const inst of ast){
                    if(inst instanceof Main){
                        inst.Ejecutar(globalEnv);
                    }
                }

                return ListaTabla;



            } catch(error){
                console.log(error);

            }

            

        }catch(e){
            console.log(e);
            return false;

        }

    }

}