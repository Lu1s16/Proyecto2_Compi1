import { Return } from "./Return";
import { TipoPrimitivo } from "./TipoPrimitivo";

export class Variable {
    public valor: any;
    public id: string;
    public type: TipoPrimitivo;

    constructor(valor: any, id: string, type: TipoPrimitivo) {
        this.valor = valor;
        this.id = id.toLowerCase();
        this.type = type;
    }
}