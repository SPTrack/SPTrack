var database = require("../database/config");

function getComponentes(fkEquipamento) {
    return database.executar(`SELECT DISTINCT tipo FROM medida JOIN componente ON componente.idComponente = medida.fkComponente AND componente.fkEquipamento = ${fkEquipamento};`);
}

// Gráfico 1
function getHistoricoDisponibilidade(idInstituicao, dias){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`SELECT valor, DATE_FORMAT(dataRegistro, '%d/%m') AS dataRegistro 
        FROM disponibilidade JOIN instituicao ON fkInstituicao = ${idInstituicao}
        WHERE dataRegistro >= DATE(NOW() - INTERVAL ${dias+1} DAY) ORDER BY dataRegistro DESC LIMIT ${dias};`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`SELECT TOP ${dias} valor, FORMAT(dataRegistro, 'dd/M') as dataRegistro
        FROM disponibilidade JOIN instituicao ON fkInstituicao = ${idInstituicao}
        WHERE dataRegistro >=  DATEADD(DAY , -${dias+1}, GETDATE()) ORDER BY dataRegistro DESC;`);
    }
}

// Gráfico 2
function getDisponibilidade(fkInstituicao) {
    return database.executar(`SELECT COUNT(fkEquipamento) AS qtdManutencao FROM manutencao JOIN equipamento ON fkEquipamento = idEquipamento
    JOIN instituicao ON fkInstituicao = idInstituicao WHERE situacao = 'Aberto' AND idInstituicao = ${fkInstituicao};`);
}

function getMedidasInstituicao(idInstituicao){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`SELECT * FROM vw_medidasInstituicao WHERE idInstituicao = ${idInstituicao} ORDER BY dataRegistro DESC LIMIT 300;`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`SELECT TOP 300 * FROM vw_medidasInstituicao WHERE idInstituicao = ${idInstituicao} ORDER BY dataRegistro DESC;`);
    }
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
    ON fkSala = idSala WHERE sala.fkInstituicao = ${idInstituicao} AND situacao = 'Aberto' ORDER BY numeroPatrimonio;`);
}

function getMediasEquipamentos(idInstituicao){
    // Task: Transformar numa view
    return database.executar(`SELECT idEquipamento, modelo, numeroPatrimonio, sala.nome AS sala
    FROM equipamento JOIN  instituicao ON fkInstituicao = idInstituicao JOIN locacao ON fkEquipamento = 
    idEquipamento JOIN sala ON fkSala = idSala WHERE idInstituicao = ${idInstituicao};`);
}

function retirarDaManutencao(patrimonio, descricao, idManutencao){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`UPDATE manutencao 
                                  SET situacao = 'Finalizado', dtFim = NOW(), descricao = '${descricao}' 
                                  WHERE idManutencao = ${idManutencao};`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`UPDATE manutencao 
                                  SET situacao = 'Finalizado', dtFim = GETDATE(), descricao = '${descricao}' 
                                  WHERE idManutencao = ${idManutencao};`);

    }
}

function inserirNaManutencao(idEquipamento, descricao, idUsuario){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`INSERT INTO manutencao VALUES (NULL, NOW(), NULL, 'Aberto', '${descricao}', ${idUsuario}, ${idEquipamento});`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`INSERT INTO manutencao VALUES (GETDATE(), NULL, 'Aberto', '${descricao}', ${idUsuario}, ${idEquipamento});`);
    }
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
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`SELECT * FROM vw_medidasEquipamento WHERE idEquipamento = ${idEquipamento} ORDER BY dataRegistro LIMIT 90`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`SELECT TOP 90 * FROM vw_medidasEquipamento WHERE idEquipamento = ${idEquipamento} ORDER BY dataRegistro;`)
    }
}

function listarMaquinas(idInstituicao){
    return database.executar(`SELECT idEquipamento,  modelo, numeroPatrimonio, sala.nome AS nomeSala, sala.idSala AS sala
    FROM equipamento JOIN  instituicao ON fkInstituicao = idInstituicao JOIN locacao ON fkEquipamento = 
    idEquipamento JOIN sala ON fkSala = idSala WHERE idInstituicao = ${idInstituicao} ORDER BY numeroPatrimonio;`);
}

function listarDadosMaquinas(idEquipamento){
   return database.executar(`SELECT idComponente, idEquipamento, modelo, tipo, nome, sistemaOperacional, fkSala from equipamento, componente, locacao
   WHERE componente.fkEquipamento = idEquipamento AND idEquipamento= ${idEquipamento} AND locacao.fkEquipamento = ${idEquipamento};`);
}

function editarMaquinasProc(idEquipamento, modelo,  cpu, sistemaOperacional, idCpu  ) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`UPDATE equipamento, componente SET modelo = '${modelo}',  nome = '${cpu}', 
        sistemaOperacional = '${sistemaOperacional}' 
        WHERE fkEquipamento = idEquipamento AND idEquipamento = ${idEquipamento} AND idComponente = ${idCpu} AND tipo = 'Processador';`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`UPDATE equipamento 
        SET modelo = '${modelo}', sistemaOperacional = '${sistemaOperacional}' 
        WHERE idEquipamento = ${idEquipamento};
        
        UPDATE componente
        SET nome = '${cpu}'
        WHERE idComponente = ${idCpu};`);
    }
}

function editarMaquinasMemo(idEquipamento, modelo,  memoria, sistemaOperacional, idMemoria ) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        database.executar(`UPDATE equipamento, componente SET modelo = '${modelo}',  nome = '${memoria}', 
        sistemaOperacional = '${sistemaOperacional}' 
        WHERE fkEquipamento = idEquipamento AND idEquipamento = ${idEquipamento} AND idComponente = ${idMemoria} AND tipo = 'Memória RAM';`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`UPDATE equipamento 
        SET modelo = '${modelo}', sistemaOperacional = '${sistemaOperacional}' 
        WHERE idEquipamento = ${idEquipamento};
        
        UPDATE componente
        SET nome = '${memoria}'
        WHERE idComponente = ${idMemoria};`);
    }
}

function editarMaquinasDisc(idEquipamento, modelo,  armazenamento, sistemaOperacional,idArmazenamento ) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        database.executar(`UPDATE equipamento, componente SET modelo = '${modelo}',  nome = '${armazenamento}', 
        sistemaOperacional = '${sistemaOperacional}' 
        WHERE fkEquipamento = idEquipamento AND idEquipamento = ${idEquipamento} AND idComponente = ${idArmazenamento} AND tipo = 'Disco Rígido';`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`UPDATE equipamento 
        SET modelo = '${modelo}', sistemaOperacional = '${sistemaOperacional}' 
        WHERE idEquipamento = ${idEquipamento};
        
        UPDATE componente
        SET nome = '${armazenamento}'
        WHERE idComponente = ${idArmazenamento};`);
    }
}

function editarLocacao(idEquipamento, idSala) {
    database.executar(`UPDATE locacao SET fkSala = ${idSala} WHERE fkEquipamento = ${idEquipamento};`);
}

function editarMaquinas(idInstituicao, modelo, cpu ,memoria ,armazenamento ,idCpu ,idMemoria ,idArmazenamento, idEquipamento, sistema, idSala) {
    editarHist(idEquipamento, idSala);
    editarLocacao(idEquipamento, idSala);
    editarMaquinasMemo(idEquipamento, modelo,  memoria , sistema, idMemoria);
    editarMaquinasProc(idEquipamento, modelo, cpu, sistema, idCpu);
    return editarMaquinasDisc(idEquipamento, modelo,  armazenamento , sistema, idArmazenamento);
}

function editarHist(idEquipamento, idSala) {
    database.executar(`INSERT INTO historico values( ${idEquipamento},  ${idSala}, NOW()); `);
}

function cadastrarMaquinas(nomeMaquinaCadastro, sistemaCadastro, numeroPatrimonio, enderecoMac, numeroSerial, idInstituicao){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`INSERT INTO equipamento VALUES(NULL, '${nomeMaquinaCadastro}', '${sistemaCadastro}','${numeroPatrimonio}', '${enderecoMac}', '${numeroSerial}', NOW(), ${idInstituicao});`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`INSERT INTO equipamento VALUES('${nomeMaquinaCadastro}', '${sistemaCadastro}','${numeroPatrimonio}', '${numeroSerial}', GETDATE(), ${idInstituicao}, '${enderecoMac}');`);
    }
}

function pegarIdNovaMaquina() {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`SELECT idEquipamento FROM equipamento ORDER BY dataRegistro DESC LIMIT 1;`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`SELECT TOP 1 idEquipamento FROM equipamento ORDER BY dataRegistro DESC;`);
    }
}

function cadastrarComponentes(idSala, nomeProcessador, capacidadeProcessador, nomeMemoria, capacidadeMemoria, nomeDisco, capacidadeDisco, idEquipamento){
    cadastrarComponenteProcessador(nomeProcessador, capacidadeProcessador, idEquipamento);
    cadastrarComponenteMemoria(nomeMemoria, capacidadeMemoria, idEquipamento);
    cadastrarComponenteDisco(nomeDisco, capacidadeDisco, idEquipamento);
    return alocarMaquina(idEquipamento, idSala);
}

function cadastrarComponenteProcessador(nomeProcessador, capacidadeProcessador, idEquipamento) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        database.executar(`INSERT INTO componente VALUES (NULL, '${nomeProcessador}', '%', ${capacidadeProcessador}, 'Processador', ${idEquipamento});`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        database.executar(`INSERT INTO componente VALUES ('${nomeProcessador}', '%', ${capacidadeProcessador}, 'Processador', ${idEquipamento});`);
    }
}

function cadastrarComponenteMemoria(nomeMemoria, capacidadeMemoria, idEquipamento) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        database.executar(`INSERT INTO componente VALUES (NULL, '${nomeMemoria}', '%', ${capacidadeMemoria}, 'Memória RAM', ${idEquipamento});`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        database.executar(`INSERT INTO componente VALUES ('${nomeMemoria}', '%', ${capacidadeMemoria}, 'Memória RAM', ${idEquipamento});`);
    }
}
function cadastrarComponenteDisco(nomeDisco, capacidadeDisco, idEquipamento) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        database.executar(`INSERT INTO componente VALUES (NULL, '${nomeDisco}', '%', ${capacidadeDisco}, 'Disco Rígido', ${idEquipamento});`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        database.executar(`INSERT INTO componente VALUES ('${nomeDisco}', '%', ${capacidadeDisco}, 'Disco Rígido', ${idEquipamento});`);
    }
}

function alocarMaquina(idEquipamento, idSala) {
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`INSERT INTO locacao VALUES(${idEquipamento}, ${idSala}, NOW());`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`INSERT INTO locacao VALUES(${idEquipamento}, ${idSala}, GETDATE());`);
    }
}

function pegarInfoChamado(){
    return database.executar(`SELECT * FROM infoChamados;`);
}

function historico(idInstituicao){
    return database.executar(`select modelo, numeroPatrimonio, fkSala, dtRegistro from equipamento, historico where idEquipamento=fkEquipamento and fkinstituicao=${idInstituicao}  order by dtRegistro desc ;`);
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
    editarMaquinas,
    cadastrarMaquinas,
    pegarIdNovaMaquina,
    cadastrarComponentes,
    pegarInfoChamado,
    historico
}