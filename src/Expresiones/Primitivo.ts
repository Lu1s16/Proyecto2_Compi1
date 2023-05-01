import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";

export class Primitivo extends Expresion {

    constructor(line: number, column: number, private value: any, private tipo: TipoPrimitivo){

        super(line, column);

    }


    //Sirve para guardar el valor entero, char, string etc.
    public Get(): Return {
        //console.log("Estoy accediento a la variable primitiva: "+ this.value);
        //Retorna el valor de la variable declarada con valor.

        switch (this.tipo) {
            case TipoPrimitivo.Integer:
                //console.log("agarra el: "+ this.value);
                return { value: parseInt(this.value), type: TipoPrimitivo.Integer};

            case TipoPrimitivo.Double:
                return { value: parseFloat(this.value), type: TipoPrimitivo.Double};

            case TipoPrimitivo.Boolean:
                if(this.value.toString().toLowerCase() === "true") {
                    return { value: true, type: TipoPrimitivo.Boolean};
                }
                return { value: false, type: TipoPrimitivo.Boolean};
                
            case TipoPrimitivo.Char:
                return { value: this.value, type: TipoPrimitivo.Char};

            case TipoPrimitivo.String:
                return { value: this.value, type: TipoPrimitivo.String};

            default:
                return {value: null, type: TipoPrimitivo.Null};
            
        }
        
        
    }

    


}



