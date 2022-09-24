function aguardar(){
    carregando.style.display = "flex"
}
function entrar() {
    aguardar();

    var emailVar = email.value;
    var senhaVar = senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert("Email ou senha vazio!")
        pararAguardar()
        return false;
    }
    else {
        setInterval(pararAguardar, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/entrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                // Dessa forma conseguimos ter todos os dados em único local
                sessionStorage.USUARIO = JSON.stringify(json);

                setTimeout(function () {
                    window.location = "../dashboard/";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                erro(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
function pararAguardar(){
    carregando.style.display = "none"
}
function erro(texto){
    erroResposta.innerHTML = texto;
    pararAguardar()
}