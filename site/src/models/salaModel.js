var database = require("../database/config");

function cadastrar(nome, fkInstituicao) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`INSERT INTO sala VALUES (NULL, '${nome}', ${fkInstituicao});`);
    }else if (process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`INSERT INTO sala (nome, fkInstituicao)
        VALUES ('${nome}', ${fkInstituicao});`);
    }
}

function getSalas(idInstituicao){
    return database.executar(`SELECT * FROM sala WHERE fkInstituicao = ${idInstituicao};`)
}
function getDadoSala(salaAtual,novaSala,idComputador){
    return database.executar(`UPDATE locacao, sala, equipamento 
    SET locacao.fkSala = ${novaSala} 
    WHERE idEquipamento = fkEquipamento and idSala = fkSala and sala.idSala = ${salaAtual} 
    AND equipamento.idEquipamento = ${idComputador};`)
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