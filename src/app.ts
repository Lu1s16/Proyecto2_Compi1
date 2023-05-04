import express  from "express";
import path from "path";
import bodyParser from "body-parser";

import { Analizador } from "./Analizador/Analizador";
import { Reporte } from "./Analizador/Reporte";

const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: false}))

app.get("/", (req, res) =>{
    res.render("principal.ejs", {titulo: "Interprete", codigo: "", consola: ""});

})



app.post("/ejecutar", (req, res) => {
    let texto = req.body.codigo;
    let verificador = req.body.tabla;
    //console.log(texto)
    var contenido = ""

    if(verificador){
        let reportes = new Reporte(texto, "editor");
        let tabla: any = reportes.Analizar();

        console.log("Tabla: " + tabla.length);

        for(var i = 0; i<tabla.length; i++){
            console.log("id: " + tabla[i].id + ", Tipo: " + tabla[i].tipo + ", Ambito: " + tabla[i].ambito + ", Linea: " + tabla[i].linea + ", Columna: " + tabla[i].columna);
        }



        
    
        contenido = "<h2>Tabla de simbolos</h2>"+
        "<table border=\"1\">"+
        "<tr> <td>Id</td> <td>Tipo</td> <td>Ambito</td> <td>Linea</td> <td>Columna</td>  </tr> <tr>"

        var tipo = ""

        for(var i = 0; i<tabla.length; i++){

            switch(tabla[i].tipo){

                case 0:
                    tipo = "Entero";
                    break;

                case 1:
                    tipo = "Double";
                    break;

                case 2:
                    tipo = "Boolean";
                    break;

                case 3:
                    tipo = "Char";
                    break;

                case 4:
                    tipo = "String";
                    break;

                case 5:
                    tipo = "Null";
                    break;

                case 6:
                    tipo = "Return";
                    break;

                case 7:
                    tipo = "Lista";
                    break;

                case 8:
                    tipo = "Vector";
                    break;

                case 9:
                    tipo = "Funcion";
                    break;

                case 10:
                    tipo = "Undefined";
                    break;

                case 11:
                    tipo = "Metodo";
                    break;


            }



            contenido+="<tr> <td>"+ tabla[i].id +"</td> <td>" + tipo + "</td> <td>"+ tabla[i].ambito +"</td> <td>"+ tabla[i].linea +"</td> <td>"+ tabla[i].columna +"</td> </tr>"
        }

        contenido+="</table>"



        console.log(contenido);


            res.send(contenido);

    } else {
        let analizador = new Analizador(texto, "editor");
    
        let datos: any = analizador.Analizar();

        res.render("principal.ejs", { titulo: "Interprete", codigo: texto, consola: datos })

    }

    
    


    

    

   
    
    
    
})

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto: http://localhost:3000");
})