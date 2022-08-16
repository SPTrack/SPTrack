var database = require("../database/config")

function cadastrar(nome, email, senha, tipoUsuario, fkInstituicao, fkGestor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar()",nome, email, senha, tipoUsuario, fkInstituicao, fkGestor);

    var query = `
        INSERT INTO usuario 
        VALUES ('${nome}', '${email}', AES_ENCRYPT('${senha}', '30ceb909962ef4c517556239ecb63010'), '${tipoUsuario}', ${fkInstituicao}, ${fkGestor})
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrar
};