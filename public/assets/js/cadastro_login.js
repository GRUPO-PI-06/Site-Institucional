var lista_codigos = [];
var lista_id_empresa = [];
async function listarCodigos(){
    await fetch("empresas/listar_codigos",{
        method : "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    }).then(dados => dados.json())
    .then(dados =>{
        for(var i=0;i<dados.length;i++){
            lista_codigos.push(dados[i].chave_ativacao);
            lista_id_empresa.push(dados[i].id);
        }
    })
}
async function cadastrar_funcionario(){
    await listarCodigos();
    var nome = input_nome.value;
    var telefone = input_telefone.value;
    var senha = input_senha.value;
    var email = input_email.value;
    var codigo_validacao = input_codigo.value;
    if(lista_codigos.includes(codigo_validacao)){
        var indice =  lista_codigos.indexOf(codigo_validacao);
        var id_empresa = lista_id_empresa[indice];
        console.log(id_empresa)
         fetch("/usuarios/cadastrar_funcionario",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome : nome,
                telefone : telefone,
                email : email,
                senha : senha,
                id_empresa : id_empresa
            })
        }).then(
            function(resposta){
                console.log(resposta);
                    window.location.href = 'login_funcionario.html';
            }
        )
    }else{
        console.log('ERRO FUNCIONARIO')
    }
}

function autenticar_funcionario(){
        var senha = input_senha.value;
        var email = input_email.value;
        fetch("/usuarios/autenticar_funcionario",{
             method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email : email,
                senha : senha
            })
        }).then(response => response.json())
        .then(
            function(response){
                 console.log(response);
                 sessionStorage.ID_USUARIO = response.id;
                 sessionStorage.NOME_USUARIO = response.nome;
                 sessionStorage.EMAIL_USUARIO = response.email;
                 sessionStorage.FUNCAO = 'Funcionario';
                 sessionStorage.ID_EMPRESA = response.id_empresa;
                 sessionStorage.NOME_EMPRESA = response.empresa_nome;
                 window.location.href = 'dashboard.html';
            }
        ).catch(erro => {
            console.error('Deu erro:', erro);
        });
}
function criarCodigoAleatorio(){
    var codigoEmpresa = Math.random().toString(36).substr(-8).toLowerCase();
    return codigoEmpresa;
}
function cadastrar_empresa(nome_sem_alterar,cnpj_sem_alterar,telefone_sem_alterar,email_sem_alterar,senha_sem_alterar){
    var nome = nome_sem_alterar;
    var telefone = telefone_sem_alterar;
    var senha = senha_sem_alterar;
    var email = email_sem_alterar;
    var codigo_validacao = criarCodigoAleatorio();
    var cnpj = cnpj_sem_alterar;
    if(!lista_codigos.includes(codigo_validacao)){
         fetch("/empresas/cadastrar_empresa",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome : nome,
                telefone : telefone,
                email : email,
                senha : senha,
                cnpj : cnpj,
                codigo_validacao : codigo_validacao
            })
        }).then(
            function(resposta){
                if(resposta.affectedRows > 0){
                    window.location.href = 'login_empresa.html';
                }
            }
        ).catch(erro => {
            console.error('Deu erro:', erro);
        });
    }else{
        console.log('CODIGO INVALIDO OU AINDA JÁ CADASTRADO')
    }
}

function autenticar_empresa(){
        var senha = input_senha.value;
        var email = input_email.value;
        fetch("/empresas/autenticar_empresa",{
             method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email : email,
                senha : senha
            })
        }).then(response => response.json())
        .then(
            function(response){
                 console.log(response);
                 sessionStorage.ID_USUARIO = response.id;
                 sessionStorage.NOME_USUARIO = response.nome;
                 sessionStorage.EMAIL_USUARIO = response.email;
                 sessionStorage.TELEFONE_USUARIO = response.telefone;
                 sessionStorage.FUNCAO = 'Empresa';
                 sessionStorage.CODIGO_VALIDACAO = response.codigo_validacao;
                 window.location.href = 'dashboard.html';
            }
        ).catch(
            console.log('erro ao logar melhore')
        )
}




