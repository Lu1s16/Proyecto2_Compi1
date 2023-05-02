import { Expresion } from "../Entorno/Expresion";
import { printlist } from "../Reportes/PrintList";
import { Ambito } from "../Entorno/Ambito";
import { Instruccion } from "../Entorno/Instruccion";

export class Print extends Instruccion {
    constructor(line: number, column: number, public expression: Expresion) {
        super(line, column);
        
    }

    public Ejecutar(env: Ambito): void {

        const value = this.expression.Get(env);
        //const value = this.expression.Ejecutar(env); //
        //console.log("Se imprime el valor: "+ value);
        printlist.push(value.value);
        //console.log("Desde consola instruccion print: ", value.value);
        
    }
}
