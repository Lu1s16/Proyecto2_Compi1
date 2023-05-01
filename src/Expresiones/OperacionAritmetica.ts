import { Expresion } from "../Entorno/Expresion";
import { TablaDivision, TablaModulo, TablaMultiplicacion, TablaPotencia, TablaResta, TablaSuma } from "../utils/TablaDominante";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Ambito } from "../Entorno/Ambito";
import { Return } from "../Entorno/Simbolos/Return";


export class OperacionAritmetica extends Expresion {


    constructor(private exp1: Expresion, private operador: any, private exp2: Expresion, line: number, column: number){
        super(line, column);

       

    }


    public Get(env: Ambito): Return {

        
        //--------SUMA------
        if(this.operador == "+"){

            console.log("suma");

            //obtengo el valor
            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            //obtengo el tipo dominante
            const tipoDominante = TablaSuma[op1.type][op2.type];

            //Verificar el tipo de dato
            switch(tipoDominante){
                case TipoPrimitivo.Integer:
                    //verificar si algun operando es booleano
                    if(op1.type == TipoPrimitivo.Boolean) {

                        op1.value = op1.value ? 1 : 0;
                    }
                    if(op2.type == TipoPrimitivo.Boolean){
                        op2.value = op2.value ? 1 : 0;
                    }


                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);

                    }

                    return {value: op1.value + op2.value , type: TipoPrimitivo.Integer};


                case TipoPrimitivo.Double:
                    //operaciones que tengan double

                    //Si alguno es booleano
                    if(op1.type == TipoPrimitivo.Boolean) {

                        op1.value = op1.value ? 1 : 0;

                        op1.value = parseFloat(op1.value);
                    }
                    if(op2.type == TipoPrimitivo.Boolean){
                        op2.value = op2.value ? 1.0 : 0.0;
                        op2.value = parseFloat(op2.value);
                    }

                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);
                        op1.value = parseFloat(op1.value);

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);
                        op2.value = parseFloat(op2.value);

                    }

                    //verificar si algun operando es int
                    if(op1.type == TipoPrimitivo.Integer){
                        op1.value = parseFloat(op1.value);
                    }

                    if(op2.type == TipoPrimitivo.Integer){
                        op2.value = parseFloat(op2.value);
                    }


                    return {value: op1.value + op2.value, type: TipoPrimitivo.Double};


                case TipoPrimitivo.String:

                    //Operaciones que devuelvan un string
                    //verificar si algun operando es int
                    if(op1.type == TipoPrimitivo.Integer){
                        op1.value.toString();
                    }

                    if(op2.type == TipoPrimitivo.Integer){
                        op2.value.toString();
                    }

                    //verifica si es double
                    if(op1.type == TipoPrimitivo.Double){
                        op1.value.toString();
                    }

                    if(op2.type == TipoPrimitivo.Double){
                        op2.value.toString();
                    }

                    //Si alguno es booleano
                    if(op1.type == TipoPrimitivo.Boolean) {

                        op1.value = op1.value ? 1 : 0;

                        op1.value.toString();
                    }
                    if(op2.type == TipoPrimitivo.Boolean){
                        op2.value = op2.value ? 1.0 : 0.0;
                        op2.value.toString();
                    }

                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);
                        op1.value.toString();

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);
                        op2.value.toString();

                    }


                    return {value: op1.value + op2.value, type: TipoPrimitivo.String}; 



                
            }


        //------RESTA-------
        } else if (this.operador == "-"){

            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            const tipoDominante = TablaResta[op1.type][op2.type];

            console.log("resta");

            switch(tipoDominante){


                case TipoPrimitivo.Integer:

                    if(op1.type == TipoPrimitivo.Boolean) {

                        op1.value = op1.value ? 1 : 0;
                    }
                    if(op2.type == TipoPrimitivo.Boolean){
                        op2.value = op2.value ? 1 : 0;
                    }


                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);

                    }
                    

                    return {value: op1.value - op2.value , type: TipoPrimitivo.Integer};


                case TipoPrimitivo.Double:
                    //Si alguno es booleano
                    if(op1.type == TipoPrimitivo.Boolean) {

                        op1.value = op1.value ? 1 : 0;

                        op1.value = parseFloat(op1.value);
                    }
                    if(op2.type == TipoPrimitivo.Boolean){
                        op2.value = op2.value ? 1.0 : 0.0;
                        op2.value = parseFloat(op2.value);
                    }

                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);
                        op1.value = parseFloat(op1.value);

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);
                        op2.value = parseFloat(op2.value);

                    }

                    //verificar si algun operando es int
                    if(op1.type == TipoPrimitivo.Integer){
                        op1.value = parseFloat(op1.value);
                    }

                    if(op2.type == TipoPrimitivo.Integer){
                        op2.value = parseFloat(op2.value);
                    }


                    return {value: op1.value - op2.value, type: TipoPrimitivo.Double};

                

            }



        //-------MULTIPLICACION--------
        } else if (this.operador == "*"){

            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            //obtengo el tipo dominante
            const tipoDominante = TablaMultiplicacion[op1.type][op2.type];


            switch(tipoDominante) {

                case TipoPrimitivo.Integer:
                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);

                    }

                    return {value: op1.value * op2.value , type: TipoPrimitivo.Integer};


                case TipoPrimitivo.Double:
                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);
                        op1.value = parseFloat(op1.value);

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);
                        op2.value = parseFloat(op2.value);

                    }

                    //verificar si algun operando es int
                    if(op1.type == TipoPrimitivo.Integer){
                        op1.value = parseFloat(op1.value);
                    }

                    if(op2.type == TipoPrimitivo.Integer){
                        op2.value = parseFloat(op2.value);
                    }

                    return {value: op1.value * op2.value, type: TipoPrimitivo.Double};



            }




        } else if(this.operador == "/"){

            console.log("Division");

            //obtengo el valor
            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            //obtengo el tipo dominante
            const tipoDominante = TablaDivision[op1.type][op2.type];

            switch(tipoDominante){
                case TipoPrimitivo.Double:
                    //Verificar si algun operando es caracter
                    if(op1.type == TipoPrimitivo.Char){
                        op1.value = op1.value.charCodeAt(0);
                        op1.value = parseFloat(op1.value);

                    }
                    if(op2.type == TipoPrimitivo.Char){
                        op2.value = op2.value.charCodeAt(0);
                        op2.value = parseFloat(op2.value);

                    }

                    //verificar si algun operando es int
                    if(op1.type == TipoPrimitivo.Integer){
                        op1.value = parseFloat(op1.value);
                    }

                    if(op2.type == TipoPrimitivo.Integer){
                        op2.value = parseFloat(op2.value);
                    }

                    return {value: op1.value / op2.value, type: TipoPrimitivo.Double};


            }


        } else if (this.operador == "^"){

            console.log("Potencia");

            //obtengo el valor
            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            //obtengo el tipo dominante
            const tipoDominante = TablaPotencia[op1.type][op2.type];

            switch(tipoDominante) {

                case TipoPrimitivo.Integer:
                    return {value: Math.pow(op1.value, op2.value), type: TipoPrimitivo.Double};



                case TipoPrimitivo.Double:
                    //verificar si algun operando es int
                    if(op1.type == TipoPrimitivo.Integer){
                        op1.value = parseFloat(op1.value);
                    }

                    if(op2.type == TipoPrimitivo.Integer){
                        op2.value = parseFloat(op2.value);
                    }

                    return {value: Math.pow(op1.value, op2.value), type: TipoPrimitivo.Double};



                

            }


        } else if (this.operador == "%"){

            console.log("Modulo");

            //obtengo el valor
            const op1 = this.exp1.Get(env);
            const op2 = this.exp2.Get(env);

            //obtengo el tipo dominante
            const tipoDominante = TablaModulo[op1.type][op2.type];

            switch(tipoDominante) {

                case TipoPrimitivo.Double:
                    //verificar si algun operando es int
                    if(op1.type == TipoPrimitivo.Integer){
                        op1.value = parseFloat(op1.value);
                    }

                    if(op2.type == TipoPrimitivo.Integer){
                        op2.value = parseFloat(op2.value);
                    }

                    return {value: op1.value % op2.value, type: TipoPrimitivo.Double};


            }

        }

        return {value: "Error", type: TipoPrimitivo.Null};
        
        


    }


}











