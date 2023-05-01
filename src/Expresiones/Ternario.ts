import { Expresion } from "../Entorno/Expresion";
import { TablaDivision, TablaModulo, TablaMultiplicacion, TablaPotencia, TablaResta, TablaSuma } from "../utils/TablaDominante";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Ambito } from "../Entorno/Ambito";
import { Return } from "../Entorno/Simbolos/Return";


export class Ternario extends Expresion {

    constructor(private condicion: Expresion, private exp1: Expresion, private exp2: Expresion, line: number, colum: number){
        super(line, colum)
    }


    public Get(env: Ambito):Return{

        const condicional = this.condicion.Get(env);
        
        const val1 = this.exp1.Get(env);
        const val2 = this.exp2.Get(env);

        console.log("prueba de condicional")
        console.log(condicional.value);
        console.log(condicional.type);
        
        console.log("-----")



        if(condicional.type == TipoPrimitivo.Boolean){

            const valor = condicional ? val1.value : val2.value;

            return {value: valor, type: valor.type};


        } else {
            console.log("Error: condicion no es de tipo booleano")
        }

        return {value: "Error", type: TipoPrimitivo.Null};



    }



}