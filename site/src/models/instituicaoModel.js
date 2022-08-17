var database = require("../database/config");

function cadastrar(razaoSocial, nomeFantasia, cnpj, cep, estado, complemento, cidade, bairro, lougradouro, numero) {
    console.log("ACESSEI O INSTITUICAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar()", razaoSocial, nomeFantasia, cnpj, cep, estado, complemento, cidade, bairro, estado, lougradouro, numero);

    var query = `
        INSERT INTO instituicao 
        VALUES (null, '${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${cep}', '${estado}', '${complemento}', '${cidade}', '${bairro}', '${lougradouro}', '${numero}');
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrar
}

