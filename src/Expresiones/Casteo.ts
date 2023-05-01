import { Expresion } from "../Entorno/Expresion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "../Entorno/Simbolos/Return";
import { Ambito } from "../Entorno/Ambito";


export class Casteo extends Expresion {

    constructor(private tipo: TipoPrimitivo, private exp: Expresion, line: number, column: number){
        super(line, column);

    }

    public Get(env: Ambito): Return {
        
        const val = this.exp.Get(env);


        if(val.type == TipoPrimitivo.Integer){

            //pasamos la expresion de int a los otros tipos

            switch(this.tipo){

                case TipoPrimitivo.Double:
                    return { value: parseFloat(val.value), type: TipoPrimitivo.Double  }


                case TipoPrimitivo.String:
                    return { value: val.value.toString(), type: TipoPrimitivo.String  }



                case TipoPrimitivo.Char:

                    let character = "a".charCodeAt(0);

                    return { value: String.fromCharCode(character+val.value), type: TipoPrimitivo.Double  }


            }

        } else if(val.type == TipoPrimitivo.Double){

            switch(this.tipo){

                case TipoPrimitivo.Integer:
                    return { value: parseInt(val.value), type: TipoPrimitivo.Integer  }
                    

                case TipoPrimitivo.String:
                    return { value: val.value.toString(), type: TipoPrimitivo.String  }



            }

        } else if(val.type == TipoPrimitivo.Char){

            switch(this.tipo){

                case TipoPrimitivo.Integer:
                    let ch1 = val.value.charCodeAt(0);
                    return { value: parseInt(ch1), type: TipoPrimitivo.Integer  }


                case TipoPrimitivo.Double:
                    let ch2 = val.value.charCodeAt(0);
                    return { value: parseFloat(ch2), type: TipoPrimitivo.Double  }


            }

        }




        console.log("Error: casteo no permitido")
        return { value: null, type: TipoPrimitivo.Null  }

    }


}