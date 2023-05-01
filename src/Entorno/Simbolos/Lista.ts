import { Ambito } from "../Ambito";
import { Expresion } from "../Expresion";
import { TipoPrimitivo } from "./TipoPrimitivo";
import { Variable } from "./Variable";

export class Lista{
    public values: any[];
    public id: string;
    public tipo: TipoPrimitivo

    constructor(id: string, tipo: TipoPrimitivo){
        this.id = id;
        this.tipo = tipo;
        this.values = [];
    }

    public getAtributo(index: number){
        return this.values[index];

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

}