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
        Swal.fire(
            'Erro de Acesso',
            'Você não tem permissão de acessar essa página',
            'error'
          )
        window.location.href = "../index.html"
        
    }
}