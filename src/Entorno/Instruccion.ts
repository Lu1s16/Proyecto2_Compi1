import { Ambito } from "./Ambito";


export abstract class Instruccion {
    public line: number;
    public column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;

    }

    public abstract Ejecutar(env:Ambito):any;
}