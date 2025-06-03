var empresasModel = require("../models/empresasModel.js");

function autenticar_empresa(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        empresasModel.autenticar_empresa(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].id,
                            nome: resultadoAutenticar[0].nome,
                            cnpj: resultadoAutenticar[0].cnpj,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            codigo_validacao : resultadoAutenticar[0].chave_ativacao,
                            telefone : resultadoAutenticar[0].telefone
                            
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar_empresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nome;
    var telefone = req.body.telefone;
    var senha = req.body.senha;
    var email = req.body.email;
    var cnpj = req.body.cnpj;
    var codigo_validacao = req.body.codigo_validacao;
    // var fkEmpresa = req.body.idEmpresaVincularServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    }else if (codigo_validacao == undefined) {
        res.status(400).send("Seu codigo_validacao está undefined!");
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo empresasModel.js
        empresasModel.cadastrar_empresa(nome,cnpj, email, senha,codigo_validacao, telefone)
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
function listar_codigos(req, res) {
   empresasModel.listar_codigos().then(
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
    cadastrar_empresa,
    autenticar_empresa,
    listar_codigos
}