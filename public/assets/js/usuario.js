function cadastrar(){
    var nome = input_nome.value;
    var telefone = input_telefone.value;
    var senha = input_senha.value;
    var email = input_email.value;
    fetch("/usuarios/cadastrar",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome : nome,
                telefone : telefone,
                email : email,
                senha : senha
            })
        }).then(
            function(resposta){
                console.log(resposta);
                window.location.href = 'login.html';
            }
        )
}

function autenticar(){
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
            }
        ).catch(
            console.log('erro ao logar melhore')
        )
}

