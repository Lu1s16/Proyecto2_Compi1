"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(__dirname + "/public"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    let pagina = '<!DOCTYPE html><html lang="en"><head><title>Interprete</title></head><body><form action="/ejecutar" method="POST"><textarea id="consola" name="codigo"></textarea><input type="submit" value="Ejecutar"></form></body></html>';
    res.send(pagina);
});
app.post("/ejecutar", (req, res) => {
    let texto = req.body.codigo;
    res.send("Se recibio: " + texto);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
