"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/suma/:valor1/:valor2', function (req, res) {
    var resultado = Number(req.params.valor1) + Number(req.params.valor2);
    console.log("El resultado de la suma es = " + resultado);
    res.send("El resultado de la suma es = " + resultado);
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    return console.log("App listening on PORT " + port + "\n    ENDPOINTS:\n    - GET /suma/:valor1/:valor2");
});
