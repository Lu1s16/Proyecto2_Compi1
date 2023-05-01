import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";

//Sirve para obtener el valor de un id

export class Acceso extends Expresion {

    constructor(private id: string, line: number, column: number){
        super(line, column);

    }

    public Get(env: Ambito): Return {

        //usa el metodo getVar de la clase Ambito
        const value = env.getVar(this.id);
        //Verifica que el id exista
        if(value) {
            //console.log("Existe la variable")
            return { value: value.valor, type: value.type};

        }
            return { value: null, type: TipoPrimitivo.Null}
        
    }

}