import { Instruccion } from "../Entorno/Instruccion";
import { Ambito } from "../Entorno/Ambito";
import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";



export class Declarar extends Instruccion {
    private id: string;
    private tipo: TipoPrimitivo;
    private valor: Expresion | null ;

    constructor(id: string, tipo: TipoPrimitivo, valor: Expresion | null, line: number, column: number){
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor; //primitivo, llamada, operacion aritemtica etc...
    }

    public Ejecutar(env: Ambito): any {

        if (this.valor != null) {
            //Aqui se guarda la variable declarada
            //de la forma int a = 10;

            //console.log("Se guardo la variable: "+ this.id)
            //Accede a la clase Primitivo para obtener el valor del id.
            console.log("Declaracion de variable: " + this.id);
            
            const val = this.valor.Get(env);

            if(val){
                //console.log("ultimas pruebas: "+ this.id + " tipo: "+this.tipo + " valor: "+ val.value)
                env.guardar(this.id, val.value, this.tipo, this.line, this.column);
                
            }

            
            
        } else {
            // guardar la variable con su valor por defecto
            //de la forma int a;
            
            
            const val = this.default()

            env.guardar_default(this.id, val, this.tipo, this.line, this.column);
            
        }

      
        
    }

    public default(): any {

        switch (this.tipo) {

            case TipoPrimitivo.Integer:
                return 0;

            case TipoPrimitivo.Double:
                return parseFloat("0");

            case TipoPrimitivo.Boolean:
                return  true;

            case TipoPrimitivo.Char:
                return '0';

            case TipoPrimitivo.String:
                return " ";


        }

    }

}
