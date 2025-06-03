var express = require("express");
var router = express.Router();

var empresasController = require("../controllers/empresasController.js");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar_empresa", function (req, res) {
    empresasController.cadastrar_empresa(req, res);
})

router.post("/autenticar_empresa", function (req, res) {
    empresasController.autenticar_empresa(req, res);
});

router.get("/listar_codigos", function (req, res) {
    empresasController.listar_codigos(req, res);
});

module.exports = router;