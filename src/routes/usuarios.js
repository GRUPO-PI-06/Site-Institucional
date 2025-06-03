var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar_funcionario", function (req, res) {
    usuarioController.cadastrar_funcionario(req, res);
})

router.post("/autenticar_funcionario", function (req, res) {
    usuarioController.autenticar_funcionario(req, res);
});


module.exports = router;