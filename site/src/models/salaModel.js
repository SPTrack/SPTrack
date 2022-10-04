var database = require("../database/config");

function cadastrar(nome, fkInstituicao) {
    console.log("ACESSEI O SALA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar()", nome, fkInstituicao);

    var query = `
        INSERT INTO sala VALUES (null, '${nome}', '1', 1, ${fkInstituicao});
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrar
}