function verificarAutenticacao(nivelAcesso) {
    var usuario = null

    var stringUsuario = sessionStorage.USUARIO;

    if (stringUsuario == undefined) {
        window.location.replace('../login.html');
    }

    usuario = JSON.parse(stringUsuario);

    function obterDadosUsuario() {
        return usuario;
    }

    function sair() {
        sessionStorage.clear()

        window.location.replace('../login.html');
    }

    function atualizarUsuario(usuario) {
        sessionStorage.USUARIO = JSON.stringify(usuario);
    }

    return {
        obterDadosUsuario,
        sair,
        atualizarUsuario
    }
}