const dashboardModel = require("../models/dashboardModel");

function kpiTotalOrquideas(req, res) {
    dashboardModel.kpiTotalOrquideas(req.params.id_empresa)
        .then(r => res.json(r[0]))
        .catch(e => res.status(500).json(e));
}

function kpiMediaLuminosidade(req, res) {
    dashboardModel.kpiMediaLuminosidade(req.params.id_empresa)
        .then(r => res.json(r[0]))
        .catch(e => res.status(500).json(e));
}

function kpiLuminosidadeAtual(req, res) {
    dashboardModel.kpiLuminosidadeAtual(req.params.id_empresa)
        .then(r => res.json(r[0]))
        .catch(e => res.status(500).json(e));
}

function kpiDesvios(req, res) {
    dashboardModel.kpiDesvios(req.params.id_empresa)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
}

function graficoPizza(req, res) {
    dashboardModel.graficoPizza(req.params.id_empresa)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
}

function graficoLinha(req, res) {
    dashboardModel.graficoLinha(req.params.id_empresa)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
}

function listarEstufas(req, res) {
    dashboardModel.listarEstufas(req.params.id_empresa)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
}

function listarEspecies(req, res) {
    dashboardModel.listarEspecies()
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
}

module.exports = {
    kpiTotalOrquideas,
    kpiMediaLuminosidade,
    kpiLuminosidadeAtual,
    kpiDesvios,
    graficoPizza,
    graficoLinha,
    listarEstufas,
    listarEspecies
};