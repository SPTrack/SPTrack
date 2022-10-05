var database = require("../database/config");

function getComponentes(fkEquipamento) {
    return database.executar(`SELECT DISTINCT tipo FROM medida JOIN componente ON componente.idComponente = medida.fkComponente AND componente.fkEquipamento = ${fkEquipamento};`);
}

function getMedidasInstituicao(idInstituicao){
    return database.executar(`SELECT * FROM vw_medidasInstituicao WHERE idInstituicao = ${idInstituicao} LIMIT 500;`);
}

module.exports = {
    getComponentes,
    getMedidasInstituicao
}