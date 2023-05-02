import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";


export class Typeof extends Expresion {

    constructor(private exp: Expresion, line: number, column: number){
        super(line, column);
    }


    public Get(env: Ambito): Return {
        
        const val = this.exp.Get(env);


        if(val.type == TipoPrimitivo.Boolean){
            
            return { value: "booleano", type: TipoPrimitivo.String};

        } else if(val.type == TipoPrimitivo.Char){

            return { value: "caracter", type: TipoPrimitivo.String}; 

        } else if(val.type == TipoPrimitivo.Double){

            return { value: "double", type: TipoPrimitivo.String};
        
        } else if(val.type == TipoPrimitivo.Integer){
            return { value: "entero", type: TipoPrimitivo.String};
        
        } else if(val.type == TipoPrimitivo.String){
            return { value: "string", type: TipoPrimitivo.String};
        
        } else if(val.type == TipoPrimitivo.Lista){
            return { value: "lista", type: TipoPrimitivo.String};
        
        } else {
            return { value: "vector", type: TipoPrimitivo.String};
        }
        

        

    }

}