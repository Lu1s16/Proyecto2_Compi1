import { Expresion } from "../Entorno/Expresion";

import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Ambito } from "../Entorno/Ambito";
import { Return } from "../Entorno/Simbolos/Return";



export class Relacional extends Expresion {


    constructor(private exp1: Expresion, private operador: any, private exp2: Expresion, line: number, column: number){
        super(line, column);

    }

    public Get(env: Ambito): Return {

        //console.log("entra a clase Relacional")



        if(this.operador == "=="){
            

            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            if(op1.type == TipoPrimitivo.Integer || op2.type == TipoPrimitivo.Integer){

                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    //convierte el caracter en un numero int
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value == op2.value, type: TipoPrimitivo.Boolean};




            } else if (op1.type == TipoPrimitivo.Double || op2.type == TipoPrimitivo.Double){
                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value == op2.value, type: TipoPrimitivo.Boolean};



            } else if (op1.type == TipoPrimitivo.Char || op2.type == TipoPrimitivo.Char){

                return { value: op1.value == op2.value, type: TipoPrimitivo.Boolean};


            }


        } else if (this.operador == "!="){


            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            if(op1.type == TipoPrimitivo.Integer || op2.type == TipoPrimitivo.Integer){

                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    //convierte el caracter en un numero int
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value != op2.value, type: TipoPrimitivo.Boolean};




            } else if (op1.type == TipoPrimitivo.Double || op2.type == TipoPrimitivo.Double){
                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value != op2.value, type: TipoPrimitivo.Boolean};



            } else if (op1.type == TipoPrimitivo.Char || op2.type == TipoPrimitivo.Char){

                return { value: op1.value != op2.value, type: TipoPrimitivo.Boolean};


            }


        } else if (this.operador == "<"){

            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            if(op1.type == TipoPrimitivo.Integer || op2.type == TipoPrimitivo.Integer){

                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    //convierte el caracter en un numero int
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value < op2.value, type: TipoPrimitivo.Boolean};




            } else if (op1.type == TipoPrimitivo.Double || op2.type == TipoPrimitivo.Double){
                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value < op2.value, type: TipoPrimitivo.Boolean};



            } else if (op1.type == TipoPrimitivo.Char || op2.type == TipoPrimitivo.Char){

                return { value: op1.value < op2.value, type: TipoPrimitivo.Boolean};


            }

        } else if (this.operador == "<="){

            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            if(op1.type == TipoPrimitivo.Integer || op2.type == TipoPrimitivo.Integer){

                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    //convierte el caracter en un numero int
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value <= op2.value, type: TipoPrimitivo.Boolean};




            } else if (op1.type == TipoPrimitivo.Double || op2.type == TipoPrimitivo.Double){
                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value <= op2.value, type: TipoPrimitivo.Boolean};



            } else if (op1.type == TipoPrimitivo.Char || op2.type == TipoPrimitivo.Char){

                return { value: op1.value <= op2.value, type: TipoPrimitivo.Boolean};


            }

        } else if (this.operador == ">"){


            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            if(op1.type == TipoPrimitivo.Integer || op2.type == TipoPrimitivo.Integer){

                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    //convierte el caracter en un numero int
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value > op2.value, type: TipoPrimitivo.Boolean};




            } else if (op1.type == TipoPrimitivo.Double || op2.type == TipoPrimitivo.Double){
                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value > op2.value, type: TipoPrimitivo.Boolean};



            } else if (op1.type == TipoPrimitivo.Char || op2.type == TipoPrimitivo.Char){

                return { value: op1.value > op2.value, type: TipoPrimitivo.Boolean};


            }

        } else if (this.operador == ">="){

            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            if(op1.type == TipoPrimitivo.Integer || op2.type == TipoPrimitivo.Integer){

                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    //convierte el caracter en un numero int
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value >= op2.value, type: TipoPrimitivo.Boolean};




            } else if (op1.type == TipoPrimitivo.Double || op2.type == TipoPrimitivo.Double){
                //Verificar si algun operando es caracter
                if(op1.type == TipoPrimitivo.Char){
                    op1.value = op1.value.charCodeAt(0);

                }
                if(op2.type == TipoPrimitivo.Char){
                    op2.value = op2.value.charCodeAt(0);

                }

                return { value: op1.value >= op2.value, type: TipoPrimitivo.Boolean};



            } else if (op1.type == TipoPrimitivo.Char || op2.type == TipoPrimitivo.Char){

                return { value: op1.value >= op2.value, type: TipoPrimitivo.Boolean};


            }

        }

        return { value: "Error: Operacion relacional no valido", type: TipoPrimitivo.Null};

    }

}