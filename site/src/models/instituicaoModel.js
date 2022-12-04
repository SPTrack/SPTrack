var database = require("../database/config");

function cadastrar(razaoSocial, nomeFantasia, cnpj, cep, estado, complemento, cidade, bairro, lougradouro, numero) { 
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`INSERT INTO instituicao VALUES (NULL, '${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${cep}', 
        '${estado}', '${complemento}', '${cidade}', '${bairro}', '${lougradouro}', '${numero}', NOW());`);
    }else{
        return database.executar(`INSERT INTO instituicao VALUES 
        ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${cep}', '${estado}', '${complemento}', '${cidade}',
         '${bairro}', '${lougradouro}', '${numero}', GETDATE());`);
    }
}

function editar(idInstituicao, nomeFantasia, razaoSocial, cep, estado, complemento, cidade, bairro, logradouro, numero) {
    return database.executar(`UPDATE instituicao SET razaoSocial = '${razaoSocial}', nomeFantasia = '${nomeFantasia}', cep = '${cep}', estado = '${estado}', complemento = '${complemento}', cidade = '${cidade}', bairro = '${bairro}', logradouro = '${logradouro}', numero = '${numero}' WHERE idInstituicao = ${idInstituicao};`);
}

function getInstituicao(idInstituicao) {
    return database.executar(`SELECT razaoSocial, nomeFantasia, cep, estado, complemento, cidade, bairro, logradouro, numero, CONCAT(SUBSTRING(cnpj,1,2),'.',SUBSTRING(cnpj,3,3),'.',SUBSTRING(cnpj,6,3),'/'
    ,SUBSTRING(cnpj,9,4),'-',SUBSTRING(cnpj,13,2)) AS resultado FROM instituicao where idInstituicao = ${idInstituicao};`);
}

function notificacoes(idInstituicao) {
    return database.executar(`SELECT titulo, dataChamado, sala.nome AS sala, equipamento.modelo AS modelo, equipamento.numeroPatrimonio AS patrimonio
    FROM chamado JOIN equipamento ON chamado.fkEquipamento = idEquipamento JOIN locacao ON equipamento.idEquipamento = locacao.fkEquipamento
    JOIN sala ON locacao.fkSala = idSala where equipamento.fkInstituicao = ${idInstituicao} ORDER BY dataChamado desc LIMIT 8;
    `);
}

module.exports = {
    cadastrar,
    editar,
    getInstituicao,
    notificacoes
}