var database = require("../database/config");

function getSala(nomeInstituicao){
  return database.executar(`select distinct sala.nome,manutencao.situacao from sala join instituicao on sala.fkInstituicao join usuario on instituicao.idInstituicao join manutencao on usuario.idUsuario where instituicao.idInstituicao=${nomeInstituicao};`);
}

function getSalas(idInstituicao){
    return database.executar(`SELECT * FROM sala WHERE fkInstituicao = ${idInstituicao};`)
}

function getqntdMaquinas(idEquipamento){
    return database.executar(`select count(distinct idEquipamento) from sala join locacao on idsala join equipamento on idequipamento where idEquipamento = ${idEquipamento};`);
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
    getSala,
    getqntdMaquinas,
    getSalas,
    getMaquinasSala,
    getNomeSala
}