//Necesita el ambito
import { Ambito } from "./Ambito";
import { Return } from "./Simbolos/Return";

//Clase abstracta

export abstract class Expresion {


    public linea: number;
    public columna: number;

    constructor(line: number, column: number){

        this.linea = line;
        this.columna = column;

    }

    public abstract Get(env:Ambito): Return; //Return;




}