import { toNamespacedPath } from "path";
import { Ambito } from "../Ambito";
import { Expresion } from "../Expresion";
import { TipoPrimitivo } from "./TipoPrimitivo";


export class Vector{
    public values: any[];
    public id: string;
    public tipo: TipoPrimitivo
    public size: number

    constructor(id: string, tipo: TipoPrimitivo, size: number ){
        this.id = id;
        this.tipo = tipo;
        this.values = [];
        this.size = size;
    }

    public declarar_vector2(tipo_vector: TipoPrimitivo, valores:Array<Expresion>, env: Ambito){

        


        switch(tipo_vector){

            //Agrego los valores por defecto dependiendo el tipo

            case TipoPrimitivo.Integer:
                //console.log("vector tipo entero")

                
                var array_temp = new Array<any>;

                for(var i = 0; i<valores.length; i++){

                    var valor_individual = valores[i].Get(env);
                    array_temp.push(valor_individual.value);
                    

                }

                this.values =  array_temp ;

                
                //console.log("Antes de print: "+this.values)
                return this.values



            
            case TipoPrimitivo.Boolean:

                var array_temp = new Array<any>;

                for(var i = 0; i<valores.length; i++){

                    var valor_individual = valores[i].Get(env);
                    array_temp.push(valor_individual.value);
                    

                }

                this.values =  array_temp ;

                
                //console.log("Antes de print: "+this.values)
                return this.values


            case TipoPrimitivo.Char:

                var array_temp = new Array<any>;

                for(var i = 0; i<valores.length; i++){

                    var valor_individual = valores[i].Get(env);
                    array_temp.push(valor_individual.value);
                    

                }

                this.values =  array_temp ;

                
                //console.log("Antes de print: "+this.values)
                return this.values


            case TipoPrimitivo.Double:

                var array_temp = new Array<any>;

                for(var i = 0; i<valores.length; i++){

                    var valor_individual = valores[i].Get(env);
                    array_temp.push(valor_individual.value);
                    

                }

                this.values =  array_temp ;

                
                //console.log("Antes de print: "+this.values)
                return this.values


            case TipoPrimitivo.String:

                var array_temp = new Array<any>;

                for(var i = 0; i<valores.length; i++){

                    var valor_individual = valores[i].Get(env);
                    array_temp.push(valor_individual.value);
                    

                }

                this.values =  array_temp ;

                
                //console.log("Antes de print: "+this.values)
                return this.values

        }





    }


    public declarar_Vector(tamanio: number, tipo_vector: TipoPrimitivo){

        this.values = new Array(tamanio);


        //Verifico que tipo es el vector
        switch(tipo_vector){

            //Agrego los valores por defecto dependiendo el tipo

            case TipoPrimitivo.Integer:
                //console.log("vector tipo entero")
                for(var i = 0; i<this.values.length; i++){
                    //console.log(i);

                    this.values[i] = 0;
                    

                }
                //console.log("Antes de print: "+this.values)
                return this.values



            
            case TipoPrimitivo.Boolean:
                for(var i = 0; i<this.values.length; i++){

                    this.values[i] = true;

                }

                return this.values


            case TipoPrimitivo.Char:
                for(var i = 0; i<this.values.length; i++){

                    this.values[i] = '0';

                }

                return this.values


            case TipoPrimitivo.Double:

                for(var i = 0; i<this.values.length; i++){

                    this.values[i] = parseFloat("0");

                }

                return this.values


            case TipoPrimitivo.String:

                for(var i = 0; i<this.values.length; i++){

                    this.values[i] = " ";

                }

                return this.values

        }



    }

    public printAll(){
        return this.values;
        



    }

    public getAtributo(index: number){

        //const vector_declarado = this.declarar_Vector(this.size, this.tipo)!;

        return this.values[index];

    }

    public setAtributo(index: number, value: Expresion){

        //const vector_declarado = this.declarar_Vector(this.size, this.tipo)!;

        return this.values[index] = value;

    }



}