var database = require("../database/config");

// Gráfico 1
function getHistoricoDisponibilidade(idInstituicao, dias){
    return database.executar(`SELECT valor, DATE_FORMAT(dataRegistro, '%d/%m') AS dataRegistro 
    FROM disponibilidade JOIN instituicao ON fkInstituicao = ${idInstituicao}
    WHERE dataRegistro >= DATE(NOW() - INTERVAL ${dias+1} DAY) ORDER BY dataRegistro DESC LIMIT ${dias};`);
}

// Gráfico 2
function getDisponibilidade(fkInstituicao) {
    return database.executar(`SELECT COUNT(fkEquipamento) AS qtdManutencao FROM manutencao JOIN equipamento ON fkEquipamento = idEquipamento
    JOIN instituicao ON fkInstituicao = idInstituicao WHERE situacao = 'Aberto' AND idInstituicao = ${fkInstituicao};`);
}

function getComponentes(fkEquipamento) {
    return database.executar(`SELECT DISTINCT tipo FROM medida JOIN componente ON componente.idComponente = medida.fkComponente AND componente.fkEquipamento = ${fkEquipamento};`);
}

function getMedidasInstituicao(idInstituicao){
    return database.executar(`SELECT * FROM vw_medidasInstituicao WHERE idInstituicao = ${idInstituicao} ORDER BY dataRegistro DESC LIMIT 300;`);
}

function getMaquinasMonitoradas(idInstituicao){
    return database.executar(`SELECT COUNT(idEquipamento) AS qtd FROM equipamento JOIN instituicao ON fkInstituicao = idInstituicao WHERE idInstituicao = ${idInstituicao};`);
}

function getMaquinasInstituicao(idInstituicao){
    return database.executar(`SELECT idEquipamento, modelo, numeroPatrimonio, sala.nome AS nomeSala, sala.idSala AS sala
    FROM equipamento JOIN  instituicao ON fkInstituicao = idInstituicao JOIN locacao ON fkEquipamento = 
    idEquipamento JOIN sala ON fkSala = idSala WHERE idInstituicao = ${idInstituicao} ORDER BY numeroPatrimonio;`);
}

function getMaquinasManutencao(idInstituicao){
    return database.executar(`SELECT idEquipamento, modelo, numeroPatrimonio, sala.nome AS nomeSala, manutencao.descricao, idManutencao , sala.idSala AS idSala 
    FROM equipamento JOIN manutencao ON idEquipamento = manutencao.fkEquipamento JOIN locacao ON locacao.fkEquipamento = idEquipamento JOIN sala 
    ON fkSala = idSala WHERE sala.fkInstituicao = ${idInstituicao} AND situacao = "Aberto" ORDER BY numeroPatrimonio;`);
}

function getMediasEquipamentos(idInstituicao){
    // Task: Transformar numa view
    return database.executar(`SELECT idEquipamento, modelo, numeroPatrimonio, sala.nome AS sala
    FROM equipamento JOIN  instituicao ON fkInstituicao = idInstituicao JOIN locacao ON fkEquipamento = 
    idEquipamento JOIN sala ON fkSala = idSala WHERE idInstituicao = ${idInstituicao};`);
}

function retirarDaManutencao(patrimonio, descricao, idManutencao){
    return database.executar(`UPDATE manutencao SET situacao = "Finalizado", dtFim = NOW(), descricao = '${descricao}' WHERE idManutencao = ${idManutencao};`);
}

function inserirNaManutencao(idEquipamento, descricao, idUsuario){
    return database.executar(`INSERT INTO manutencao VALUES (NULL, NOW(), NULL, 'Aberto', '${descricao}', ${idUsuario}, ${idEquipamento});`);
}

// PARA SISTEMA DE PONTUAÇÃO
function pontuacaoDia(componente, idInstituicao){
    return database.executar(`SELECT ROUND(AVG(valor), 2) AS valor, tipo FROM medida JOIN componente ON fkComponente = idComponente JOIN equipamento ON fkEquipamento = idEquipamento 
    WHERE componente.tipo = "${componente}" AND medida.dataRegistro >= DATE(NOW() - INTERVAL 1 DAY) AND fkInstituicao = ${idInstituicao} GROUP BY idEquipamento;`);
}

function getEstadosDeUso(idInstituicao){
    return database.executar(`SELECT mb, b, r, a, DATE_FORMAT(dataRegistro, '%d/%m') AS dataRegistro FROM estadoDeUso JOIN instituicao ON fkInstituicao = idInstituicao 
    WHERE dataRegistro >= DATE(NOW() - INTERVAL 7 DAY) AND idInstituicao = ${idInstituicao};`);
}

function getDadosEquipamentoEspecifico(idEquipamento){
    return database.executar(`SELECT * FROM vw_medidasEquipamento WHERE idEquipamento = ${idEquipamento} ORDER BY dataRegistro LIMIT 90`);
}

function listarMaquinas(idInstituicao){
    return database.executar(`SELECT idEquipamento,  modelo, numeroPatrimonio, sala.nome AS nomeSala, sala.idSala AS sala
    FROM equipamento JOIN  instituicao ON fkInstituicao = idInstituicao JOIN locacao ON fkEquipamento = 
    idEquipamento JOIN sala ON fkSala = idSala WHERE idInstituicao = ${idInstituicao} ORDER BY numeroPatrimonio;`);
}

function listarDadosMaquinas(idEquipamento){
   return database.executar(`select idComponente, idEquipamento, modelo, tipo, nome, sistemaOperacional from equipamento, componente where fkEquipamento = idEquipamento and idEquipamento= ${idEquipamento} ;`);
}

function editarMaquinasProc(idEquipamento, modelo,  cpu, sistemaOperacional, idCpu  ) {
    return database.executar(`UPDATE equipamento, componente SET modelo = '${modelo}',  nome = '${cpu}', 
    sistemaOperacional = '${sistemaOperacional}' 
    where fkEquipamento = idEquipamento and idEquipamento = ${idEquipamento} and idComponente = ${idCpu } and tipo = 'processador';`);
}

function editarMaquinasMemo(idEquipamento, modelo,  memoria, sistemaOperacional, idMemoria ) {
    database.executar(`UPDATE equipamento, componente SET modelo = '${modelo}',  nome = '${memoria}', 
    sistemaOperacional = '${sistemaOperacional}' 
    where fkEquipamento = idEquipamento and idEquipamento = ${idEquipamento} and idComponente = ${idMemoria} and tipo = 'Memória RAM';`);
}

function editarMaquinasDisc(idEquipamento, modelo,  armazenamento, sistemaOperacional,idArmazenamento ) {
    database.executar(`UPDATE equipamento, componente SET modelo = '${modelo}',  nome = '${armazenamento}', 
    sistemaOperacional = '${sistemaOperacional}' 
    where fkEquipamento = idEquipamento and idEquipamento = ${idEquipamento} and idComponente = ${idArmazenamento} and tipo = 'Disco Rígido';`);
}

function editarMaquinas(idInstituicao ,modelo, cpu ,memoria ,armazenamento ,idCpu ,idMemoria ,idArmazenamento, idEquipamento, sistema) {
    editarMaquinasDisc(idEquipamento, modelo,  armazenamento , sistema, idArmazenamento)
    editarMaquinasMemo(idEquipamento, modelo,  memoria , sistema, idMemoria)
    return editarMaquinasProc(idEquipamento, modelo,  cpu , sistema, idCpu)
}

module.exports = {
    getComponentes,
    getHistoricoDisponibilidade,
    getMedidasInstituicao,
    getMaquinasMonitoradas,
    getDisponibilidade,
    getMaquinasInstituicao,
    getMediasEquipamentos,
    getMaquinasManutencao,
    retirarDaManutencao,
    inserirNaManutencao,
    pontuacaoDia,
    getEstadosDeUso,
    getDadosEquipamentoEspecifico,
    listarMaquinas,
    listarDadosMaquinas,
    editarMaquinasProc,
    editarMaquinasMemo,
    editarMaquinasDisc,
    editarMaquinas
}