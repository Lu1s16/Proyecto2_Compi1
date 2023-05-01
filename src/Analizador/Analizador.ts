//import Parser from "./gramatica";
import { printlist } from "../Reportes/PrintList";
import { Ambito } from "../Entorno/Ambito";
import { Declarar } from "../Instrucciones/Declarar";
import { Funcion } from "../Instrucciones/Funcion";

export class Analizador{

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
                printlist.splice(0, printlist.length);

                const globalEnv = new Ambito(null, "Global");

                for(const inst of ast){
                    //Solo ejecuta funciones y declaraciones
                    //no ejecuta main ni tampoco ciclos, etc.
                    //if(inst instanceof Declarar){
                    //    inst.Ejecutar(globalEnv);
                    //} else if(inst instanceof Funcion){
                    //    inst.Ejecutar(globalEnv);
                    //}

                    if(inst instanceof Funcion) {
                        //Si es funcion la guarda
                        inst.Ejecutar(globalEnv);
                    } else {
                        console.log("Instruccion: " + inst);
                        inst.Ejecutar(globalEnv);
                    }



                    
                    //console.log("------")
                    //console.log("Instruccion: " + inst)
                }

                return ast;



            } catch(error){
                console.log(error);

            }

            

        }catch(e){
            console.log(e);
            return false;

        }

    }

}