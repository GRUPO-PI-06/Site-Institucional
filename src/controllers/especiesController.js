var especieModel = require("../models/especieModel.js");

function cadastrar_especie(req, res) {
    var nome_especie = req.body.nome_especie;
    var faixa_min_lux = req.body.valor_max;
    var faixa_max_lux = req.body.valor_min;
    // var fkEmpresa = req.body.idEmpresaVincularServer;

    // Faça as validações dos valores
    if (nome_especie == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (faixa_min_lux == undefined) {
        res.status(400).send("Sua faixa_min_lux está undefined!");
    } else if (faixa_max_lux == undefined) {
        res.status(400).send("Sua faixa_max_lux está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo especieModel.js
        especieModel.cadastrar_especie(nome_especie,faixa_min_lux, faixa_max_lux)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function listar_especies(req, res) {
   especieModel.listar_especies().then(
           function (resultadoAutenticar) {
               console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
               console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
               res.json(resultadoAutenticar)
           }).catch(
                   function (erro) {
                       console.log(erro);
                       console.log("\nHouve um erro ao trazer CODIGOS! Erro: ", erro.sqlMessage);
                       res.status(500).json(erro.sqlMessage);
                   }
               );
}
function deletar_especies(req, res) {
    const id = req.params.id;
   especieModel.deletar_especies(id).then(
           function (resultadoAutenticar) {
               console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
               console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
               res.json(resultadoAutenticar)
           }).catch(
                   function (erro) {
                       console.log(erro);
                       console.log("\nHouve um erro ao trazer CODIGOS! Erro: ", erro.sqlMessage);
                       res.status(500).json(erro.sqlMessage);
                   }
               );
}

module.exports = {
    cadastrar_especie,
    listar_especies,
    deletar_especies
}