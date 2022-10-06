var database = require("../database/config");

function getComponentes(fkEquipamento) {
    return database.executar(`SELECT DISTINCT tipo FROM medida JOIN componente ON componente.idComponente = medida.fkComponente AND componente.fkEquipamento = ${fkEquipamento};`);
}

function getMedidasInstituicao(idInstituicao){
    return database.executar(`SELECT * FROM vw_medidasInstituicao WHERE idInstituicao = ${idInstituicao} ORDER BY dataRegistro LIMIT 300;`);
}

function getMediasInstituicao(idInstituicao){
    return database.executar(`SELECT ROUND(AVG(cpu.valor), 2) AS mediaCPU, ROUND(AVG(ram.valor), 2) AS mediaRAM FROM 
    (SELECT valor FROM medida JOIN componente ON idComponente = fkComponente JOIN equipamento 
        ON fkEquipamento = idEquipamento JOIN instituicao ON idInstituicao = fkInstituicao WHERE componente.tipo = "Processador" AND idInstituicao = ${idInstituicao}) AS cpu,
    (SELECT valor FROM medida JOIN componente ON idComponente = fkComponente JOIN equipamento 
        ON fkEquipamento = idEquipamento JOIN instituicao ON idInstituicao = fkInstituicao WHERE componente.tipo = "Memória RAM" AND idInstituicao = ${idInstituicao}) AS ram;`);
}

function getMaquinasMonitoradas(idInstituicao){
    return database.executar(`SELECT COUNT(idEquipamento) AS qtd FROM equipamento JOIN instituicao ON fkInstituicao = idInstituicao WHERE idInstituicao = ${idInstituicao};`);
}

module.exports = {
    getComponentes,
    getMedidasInstituicao,
    getMediasInstituicao,
    getMaquinasMonitoradas
}