var database = require("../database/config")

function cadastrar(nome, email, senha, tipoUsuario, fkInstituicao, fkGestor) {
    return database.executar(`INSERT INTO usuario VALUES (null, '${nome}', '${email}', '${senha}', '${tipoUsuario}', NOW(), ${fkInstituicao}, ${fkGestor});`);
}

function procurarPorEmail(email) {
    return database.executar(`SELECT * FROM usuario WHERE email = '${email}';`);
}

module.exports = {
    cadastrar, 
    procurarPorEmail
};