import { Expresion } from "../Entorno/Expresion";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";


export class OperacionesUnarios extends Expresion {
    constructor(private id: string, private tipoOperacion: any, line: number, column: number){
        super(line, column);

    }


    public Get(env: Ambito): Return {
        
        if(this.tipoOperacion == "++") {

            console.log()
            //obtneer valor de variable
            const valor = env.getVar(this.id);

            //Verificar que exista
            if(valor) {
                //Verificar que sea entero
                if(valor.type == TipoPrimitivo.Integer){
                    //incrementar el valor
                    valor.valor = valor.valor +1;
                    //actualizar el valor de la variable
                    env.actualizar_var(this.id, valor.valor, valor.type);

                    //retornar el valor
                    return { value: valor.valor, type: TipoPrimitivo.Integer };

                }
            }
        }

        return { value: null, type: TipoPrimitivo.Null};
    }

}