var express = require("express");
var router = express.Router();

var especiesController = require("../controllers/especiesController.js");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar_especie", function (req, res) {
    especiesController.cadastrar_especie(req, res);
});

router.get("/listar_especie", function (req, res) {
    especiesController.listar_especies(req, res);
});

router.delete("/deletar_especie/:id", function (req, res) {
    especiesController.deletar_especies(req, res);
});

module.exports = router;