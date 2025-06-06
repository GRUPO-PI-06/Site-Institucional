const database = require("../database/config");

// KPI 1: total de orquídeas da empresa
function kpiTotalOrquideas(id_empresa) {
    const sql = `SELECT SUM(qtd_orquideas) AS total FROM estufa WHERE fk_empresa = ${id_empresa};`;
    return database.executar(sql);
}

// KPI 2: média de luminosidade da empresa
function kpiMediaLuminosidade(id_empresa) {
    const sql = `
        SELECT ROUND(AVG(re.intensidade_luz),2) AS media
        FROM estufa AS es
        JOIN sensor AS se ON es.id = se.fk_estufa
        JOIN registro_luminosidade AS re ON se.id = re.fk_sensor
        WHERE es.fk_empresa = ${id_empresa};
    `;
    return database.executar(sql);
}

// KPI 3: luminosidade atual (mais recente)
function kpiLuminosidadeAtual(id_empresa) {
    const sql = `
        SELECT re.intensidade_luz AS ultimo_registro
        FROM estufa AS es
        JOIN sensor AS se ON es.id = se.fk_estufa
        JOIN registro_luminosidade AS re ON se.id = re.fk_sensor
        WHERE es.fk_empresa = ${id_empresa}
        ORDER BY re.horario_registro DESC
        LIMIT 1;
    `;
    return database.executar(sql);
}

// KPI 4: numero de desvios por estufa
function kpiDesvios(id_empresa) {
    const sql = `
        SELECT
            DAY(rl.horario_registro) AS dia,
            e.nome_estufa,
            COUNT(*) AS numero_de_desvios
        FROM registro_luminosidade rl
        JOIN sensor s ON rl.fk_sensor = s.id
        JOIN estufa e ON s.fk_estufa = e.id
        JOIN especie_orquidea eo ON e.fk_especie = eo.id
        WHERE (rl.intensidade_luz < eo.faixa_min_lux OR rl.intensidade_luz > eo.faixa_max_lux)
          AND e.fk_empresa = ${id_empresa}
        GROUP BY dia, e.nome_estufa;
    `;
    return database.executar(sql);
}

// gráfico Pizza: Total de orquideas por especie
function graficoPizza(id_empresa) {
    const sql = `
        SELECT eo.nome_especie, SUM(es.qtd_orquideas) AS total
        FROM estufa AS es
        JOIN especie_orquidea AS eo ON eo.id = es.fk_especie
        WHERE es.fk_empresa = ${id_empresa}
        GROUP BY eo.nome_especie;
    `;
    return database.executar(sql);
}

// grafico linha: media de luminosidade por dia (ultimos 7 dias)
function graficoLinha(id_empresa) {
    const sql = `
        SELECT DATE(rl.horario_registro) AS data_registro, AVG(rl.intensidade_luz) AS media_lux
        FROM registro_luminosidade rl
        JOIN sensor s ON rl.fk_sensor = s.id
        JOIN estufa es ON s.fk_estufa = es.id
        WHERE es.fk_empresa = ${id_empresa}
        GROUP BY DATE(rl.horario_registro)
        ORDER BY data_registro ASC
        LIMIT 7;
    `;
    return database.executar(sql);
}

// Listar estufas da empresa
function listarEstufas(id_empresa) {
    const sql = `
        SELECT es.id, es.nome_estufa, eo.nome_especie
        FROM estufa es
        JOIN especie_orquidea eo ON es.fk_especie = eo.id
        WHERE es.fk_empresa = ${id_empresa};
    `;
    return database.executar(sql);
}

// Listar espécies
function listarEspecies() {
    const sql = `SELECT id, nome_especie FROM especie_orquidea;`;
    return database.executar(sql);
}

function tempoReal(id_empresa) {
    const sql = `
        SELECT DATE(rl.horario_registro) AS data_registro, AVG(rl.intensidade_luz) AS media_lux
        FROM registro_luminosidade rl JOIN sensor s ON rl.fk_sensor = s.id JOIN estufa es ON s.fk_estufa = es.id WHERE es.fk_empresa = ${id_empresa}
        GROUP BY DATE(rl.horario_registro) ORDER BY data_registro DESC LIMIT 1;`

    return database.executar(sql);
}

module.exports = {
    kpiTotalOrquideas,
    kpiMediaLuminosidade,
    kpiLuminosidadeAtual,
    kpiDesvios,
    graficoPizza,
    graficoLinha,
    listarEstufas,
    listarEspecies,
    tempoReal
};