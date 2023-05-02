import express  from "express";
import path from "path";
import bodyParser from "body-parser";

import { Analizador } from "./Analizador/Analizador";

const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false}))

app.get("/", (req, res) =>{
    res.render("principal.ejs", {titulo: "Interprete", codigo: "", consola: ""});

})

app.get("/main", (req, res) => {


    res.render("test.ejs", {});
})

app.post("/ejecutar", (req, res) => {
    let texto = req.body.codigo;
    //console.log(texto)
    let analizador = new Analizador(texto, "editor");
    let console: any = analizador.Analizar();

    res.render("principal.ejs", { titulo: "Interprete", codigo: texto, consola: console })
})

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto: http://localhost:3000");
})