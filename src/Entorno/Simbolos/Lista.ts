import { Ambito } from "../Ambito";
import { Expresion } from "../Expresion";
import { TipoPrimitivo } from "./TipoPrimitivo";


export class Lista{
    public values: any[];
    public id: string;
    public tipo: TipoPrimitivo

    constructor(id: string, tipo: TipoPrimitivo){
        this.id = id;
        this.tipo = tipo;
        this.values = [];
    }


    public declarar2(elementos: Expresion, env:Ambito){

        //console.log(elementos);

        const val = elementos.Get(env);

        //console.log(val);


        //probar pasarlo a array desde aqui
        //console.log("prueba en delcarar2: "+elementos)
        this.values = val.value;
    

    }

    public getAtributo(index: number){
        return this.values[index];

    }

    public setAtributo(index: number, value: Expresion){

        this.values[index] = value;

    }

    public addAtributo(value: Expresion, env:Ambito, typelist: TipoPrimitivo){

        const val = value.Get(env);

        if(val.type == typelist){
            console.log("Se agrego el valor: " + val.value);
            this.values.push(val.value)



        } else {
            console.log("Error: el tipo no coincide con el de la lista")
        }


    }

    public printall(){

        return this.values;

    }

}