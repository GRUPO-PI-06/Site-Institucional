var estufasModel = require("../models/estufasModel.js");

function cadastrar_estufa(req, res) {
    var nome_estufa = req.body.nome_estufa;
    var fk_especie = req.body.id_especie;
    var fk_empresa = req.body.id_empresa;
    var qtd_orquideas = req.body.qtd_orquideas;
    
    // Faça as validações dos valores
    if (nome_estufa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (fk_especie == undefined) {
        res.status(400).send("Sua fk especie está undefined!");
    }else if (fk_empresa == undefined) {
        res.status(400).send("Sua fk empresa está undefined!");
    }else if (qtd_orquideas == undefined) {
        res.status(400).send("Sua qtd está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo estufasModel.js
        estufasModel.cadastrar_estufa(nome_estufa,qtd_orquideas,fk_especie,fk_empresa)
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
function listar_estufas(req, res) {
    const id_empresa = req.params.id_empresa;
   estufasModel.listar_estufas(id_empresa).then(
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
function deletar_estufas(req, res) {
    const id = req.params.id;
   estufasModel.deletar_estufas(id).then(
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
    cadastrar_estufa,
    listar_estufas,
    deletar_estufas
}