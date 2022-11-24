function aguardar(){
    carregando.style.display = "flex"
}

function entrar() {
    aguardar();

    var emailVar = email.value;
    var senhaVar = senha.value;

    if (emailVar == "" || senhaVar == "") {
       
         
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Email ou senha inválido',
            showConfirmButton: false,
            timer: 1500
          })

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

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                sessionStorage.usuario = JSON.stringify(json);
                window.location = "../dashboard/";
            });

        } else {
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