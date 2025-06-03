var lista_codigos = [];
var lista_id_empresa = [];
function listarCodigos(){
    fetch("empresas/listar_codigos",{
        method : "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    }).then(dados => dados.json())
    then(dados =>{
        for(var i=0;i<dados.length;i++){
            lista_codigos.push(dados[i].chave_ativacao);
            lista_id_empresa.push(dados[i].id);
        }
    })
}
function cadastrar_funcionario(){
    listarCodigos();
    var nome = input_nome.value;
    var telefone = input_telefone.value;
    var senha = input_senha.value;
    var email = input_email.value;
    var codigo_validacao = input_codigo.value;
    console.log(codigo_validacao)
    if(lista_codigos.includes(codigo_validacao)){
        var indice =  lista_codigos.indexOf(codigo_validacao);
        var id_empresa = lista_codigos[indice];
        console.log(id_empresa)
        //  fetch("/usuarios/cadastrar_funcionario",
        // {
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         nome : nome,
        //         telefone : telefone,
        //         email : email,
        //         senha : senha
        //     })
        // }).then(
        //     function(resposta){
        //         console.log(resposta);
        //         window.location.href = 'login.html';
        //     }
        // )
    }else{
        console.log('ERRO FUNCIONARIO')
    }
}

function autenticar_funcionario(){
        var senha = input_senha.value;
        var email = input_email.value;
        fetch("/usuarios/autenticar",{
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
            }
        ).catch(
            console.log('erro ao logar melhore')
        )
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
                
                window.location.href = 'login_empresa.html';
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
        fetch("/usuarios/autenticar",{
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
            }
        ).catch(
            console.log('erro ao logar melhore')
        )
}




