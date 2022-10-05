var database = require("../database/config");

function cadastrar(razaoSocial, nomeFantasia, cnpj, cep, estado, complemento, cidade, bairro, lougradouro, numero) { 
    return database.executar(`INSERT INTO instituicao VALUES (NULL, '${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${cep}', '${estado}', '${complemento}', '${cidade}', '${bairro}', '${lougradouro}', '${numero}', NOW());`);
}

module.exports = {
    cadastrar
}

