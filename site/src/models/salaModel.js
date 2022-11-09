var database = require("../database/config");

function cadastrar(nome, fkInstituicao) {
    return database.executar(`INSERT INTO sala VALUES (null, '${nome}', ${fkInstituicao});`);
}

function getSalas(idInstituicao){
    return database.executar(`SELECT * FROM sala WHERE fkInstituicao = ${idInstituicao};`)
}
function getDadoSala(salaAtual,novaSala,idComputador){
    return database.executar(`update locacao,sala,equipamento set locacao.fkSala = ${novaSala} where idEquipamento = fkEquipamento and idSala = fkSala and sala.idSala = ${salaAtual} and equipamento.idEquipamento = ${idComputador};`)
}

function getMaquinasSala(idInstituicao, idSala){
    return database.executar(`SELECT idEquipamento, modelo, numeroPatrimonio, sala.nome AS nomeSala, sala.idSala AS sala
    FROM equipamento JOIN  instituicao ON fkInstituicao = idInstituicao JOIN locacao ON fkEquipamento = 
    idEquipamento JOIN sala ON fkSala = idSala WHERE idInstituicao = ${idInstituicao} AND idSala = ${idSala} ORDER BY numeroPatrimonio;`);
}

function getNomeSala(idInstituicao, idSala){
    return database.executar(`SELECT nome FROM sala WHERE fkInstituicao = ${idInstituicao} AND idSala = ${idSala};`);
}

module.exports = {
    cadastrar,
    getSalas,
    getDadoSala,
    getMaquinasSala,
    getNomeSala
}