const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");


router.get("/kpi/total-orquideas/:id_empresa", dashboardController.kpiTotalOrquideas);
router.get("/kpi/media-luminosidade/:id_empresa", dashboardController.kpiMediaLuminosidade);
router.get("/kpi/luminosidade-atual/:id_empresa", dashboardController.kpiLuminosidadeAtual);
router.get("/kpi/desvios/:id_empresa", dashboardController.kpiDesvios);


router.get("/grafico/pizza/:id_empresa", dashboardController.graficoPizza);
router.get("/grafico/linha/:id_empresa", dashboardController.graficoLinha);


router.get("/estufas/:id_empresa", dashboardController.listarEstufas);
router.get("/especies", dashboardController.listarEspecies);

router.get("/tempo-real/:id_empresa", function (req, res){
    dashboardController.tempoReal(req, res)
});

module.exports = router;