var database = require("../database/config");

function cadastrar(razaoSocial, nomeFantasia, cnpj, cep, estado, complemento, cidade, bairro, lougradouro, numero) { 
    return database.executar(`INSERT INTO instituicao VALUES (NULL, '${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${cep}', '${estado}', '${complemento}', '${cidade}', '${bairro}', '${lougradouro}', '${numero}', NOW());`);
}

function editar(idInstituicao, nomeFantasia, razaoSocial, cep, estado, complemento, cidade, bairro, logradouro, numero) {
    return database.executar(`UPDATE instituicao SET razaoSocial = '${razaoSocial}', nomeFantasia = '${nomeFantasia}', cep = '${cep}', estado = '${estado}', complemento = '${complemento}', cidade = '${cidade}', bairro = '${bairro}', logradouro = '${logradouro}', numero = '${numero}' WHERE idInstituicao = ${idInstituicao};`);
}

function getInstituicao(idInstituicao) {
    return database.executar(`SELECT razaoSocial, nomeFantasia, cep, estado, complemento, cidade, bairro, logradouro, numero, CONCAT(SUBSTRING(cnpj,1,2),'.',SUBSTRING(cnpj,3,3),'.',SUBSTRING(cnpj,6,3),'/'
    ,SUBSTRING(cnpj,9,4),'-',SUBSTRING(cnpj,13,2)) AS resultado FROM instituicao where idInstituicao = ${idInstituicao};`);
}

module.exports = {
    cadastrar,
    editar,
    getInstituicao
}