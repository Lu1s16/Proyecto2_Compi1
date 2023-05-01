import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = 3000;
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: true }))




app.get('/', (req: Request, res: Response) => {

  let pagina = '<!DOCTYPE html><html lang="en"><head><title>Interprete</title></head><body><form action="/ejecutar" method="POST"><textarea id="consola" name="codigo"></textarea><input type="submit" value="Ejecutar"></form></body></html>';
  res.send(pagina);
  
});

app.post("/ejecutar", (req: Request, res: Response) => {
  let texto = req.body.codigo;
  res.send("Se recibio: " + texto);
  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});