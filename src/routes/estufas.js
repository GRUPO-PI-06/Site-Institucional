var express = require("express");
var router = express.Router();

var estufasController = require("../controllers/estufasController.js");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar_estufa", function (req, res) {
    estufasController.cadastrar_estufa(req, res);
});

router.get("/listar_estufa/:id_empresa", function (req, res) {
    estufasController.listar_estufas(req, res);
});

router.delete("/deletar_estufa/:id", function (req, res) {
    estufasController.deletar_estufas(req, res);
});

module.exports = router;