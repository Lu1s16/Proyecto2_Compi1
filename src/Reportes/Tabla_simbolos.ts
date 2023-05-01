import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class Tabla_simbolos {

    constructor(public id: string, public tipo: TipoPrimitivo, public ambito: string, public linea: number, public columna: number ){

    }

}

export let ListaTabla:Array<Tabla_simbolos> = [];