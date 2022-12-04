function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;

    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = window.origin + '/login';
}

function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}

function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

function movaNav(){
    if(localStorage.getItem("mode") != "aberto" && localStorage.getItem("mode") != "fechado"){
        localStorage.setItem("mode", "fechado");
    }else if(localStorage.getItem("mode") == "aberto"){
        localStorage.setItem("mode", "fechado");
    }else if(localStorage.getItem("mode") == "fechado"){
        localStorage.setItem("mode", "aberto");
    }
}

function verifyNav(){
    if(localStorage.getItem("mode") == "aberto"){
        $("#sidebarToggle").click();
        localStorage.setItem("mode", "aberto");
    }
}

function verificarAcesso(nivelAcesso, nivelPagina) {
    console.log(nivelAcesso)
    console.log(nivelPagina)

    if (nivelAcesso < nivelPagina || nivelAcesso == null || nivelAcesso == undefined) {
        Swal.fire({
            title: 'Erro de Acesso',
            text: "Você não tem permissão para acessar essa página.",
            icon: 'error',
            confirmButtonColor: '#000000',
            confirmButtonText: 'Ok'
          }).then(() => 
              window.location.href = "../index.html"
          )
        
        

    }
}

function notificacoes(){
    fetch("/instituicoes/notificacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                for (let i = 0; i < json.length; i++) {
                    data = new Date(json[i]['dataChamado'])
                    vetorData = json[i]['dataChamado'].split('T')
                    horario = vetorData[1].slice(0,5)
                    paiNotificacoes.innerHTML += `<a
                class="dropdown-item d-flex align-items-center" href="#">
                <div class="me-3">
                    <div class="icon-circle" style="background: black;"><i
                            class="fas fa-file-alt text-white"></i></div>
                </div>
                <div><span class="small text-gray-500">${data.toLocaleDateString('pt-PT')} ${horario}</span>
                    <p>A máquina de patrimonio ${json[i]['patrimonio']} está com ${json[i]['titulo']} na sala ${json[i]['sala']}</p>
                </div>
            </a>`
                }
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");

            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}
notificacoes()