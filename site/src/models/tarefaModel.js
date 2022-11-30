var database = require("../database/config");

function insertTarefa(idInstituicao, nomeTarefa, descricao, dtInicio, dtFim, isDomingo, isSegunda, isTerca, isQuarta, isQuinta, isSexta, isSabado, horarioInicioDomingo, horarioFimDomingo, 
    horarioInicioSegunda, horarioFimSegunda, horarioInicioTerca, horarioFimTerca, horarioInicioQuarta, horarioFimQuarta, horarioInicioQuinta, horarioFimQuinta, horarioInicioSexta, 
    horarioFimSexta, horarioInicioSabado, horarioFimSabado) {
    
    if(dtInicio != 'NOW()' && dtFim != 'NULL'){
        return database.executar(`INSERT INTO tarefa VALUES (
            NULL,
            '${nomeTarefa}',
            '${descricao}',
            '${dtInicio}',
            '${dtFim}',
            ${isDomingo},
            ${isSegunda},
            ${isTerca},
            ${isQuarta},
            ${isQuinta},
            ${isSexta},
            ${isSabado},
            ${horarioInicioDomingo},
            ${horarioFimDomingo},
            ${horarioInicioSegunda},
            ${horarioFimSegunda},
            ${horarioInicioTerca},
            ${horarioFimTerca},
            ${horarioInicioQuarta},
            ${horarioFimQuarta},
            ${horarioInicioQuinta},
            ${horarioFimQuinta},
            ${horarioInicioSexta},
            ${horarioFimSexta},
            ${horarioInicioSabado},
            ${horarioFimSabado},
            ${idInstituicao}
        );`)
    }else if(dtInicio == 'NOW()' && dtFim != 'NULL'){
        return database.executar(`INSERT INTO tarefa VALUES (
            NULL,
            '${nomeTarefa}',
            '${descricao}',
            ${dtInicio},
            '${dtFim}',
            ${isDomingo},
            ${isSegunda},
            ${isTerca},
            ${isQuarta},
            ${isQuinta},
            ${isSexta},
            ${isSabado},
            ${horarioInicioDomingo},
            ${horarioFimDomingo},
            ${horarioInicioSegunda},
            ${horarioFimSegunda},
            ${horarioInicioTerca},
            ${horarioFimTerca},
            ${horarioInicioQuarta},
            ${horarioFimQuarta},
            ${horarioInicioQuinta},
            ${horarioFimQuinta},
            ${horarioInicioSexta},
            ${horarioFimSexta},
            ${horarioInicioSabado},
            ${horarioFimSabado},
            ${idInstituicao}
        );`)
    }else if(dtInicio != 'NOW()' && dtFim == 'NULL'){
        return database.executar(`INSERT INTO tarefa VALUES (
            NULL,
            '${nomeTarefa}',
            '${descricao}',
            '${dtInicio}',
            ${dtFim},
            ${isDomingo},
            ${isSegunda},
            ${isTerca},
            ${isQuarta},
            ${isQuinta},
            ${isSexta},
            ${isSabado},
            ${horarioInicioDomingo},
            ${horarioFimDomingo},
            ${horarioInicioSegunda},
            ${horarioFimSegunda},
            ${horarioInicioTerca},
            ${horarioFimTerca},
            ${horarioInicioQuarta},
            ${horarioFimQuarta},
            ${horarioInicioQuinta},
            ${horarioFimQuinta},
            ${horarioInicioSexta},
            ${horarioFimSexta},
            ${horarioInicioSabado},
            ${horarioFimSabado},
            ${idInstituicao}
        );`)
    }else if(dtInicio == 'NOW()' && dtFim == 'NULL'){
        return database.executar(`INSERT INTO tarefa VALUES (
            NULL,
            '${nomeTarefa}',
            '${descricao}',
            ${dtInicio},
            ${dtFim},
            ${isDomingo},
            ${isSegunda},
            ${isTerca},
            ${isQuarta},
            ${isQuinta},
            ${isSexta},
            ${isSabado},
            ${horarioInicioDomingo},
            ${horarioFimDomingo},
            ${horarioInicioSegunda},
            ${horarioFimSegunda},
            ${horarioInicioTerca},
            ${horarioFimTerca},
            ${horarioInicioQuarta},
            ${horarioFimQuarta},
            ${horarioInicioQuinta},
            ${horarioFimQuinta},
            ${horarioInicioSexta},
            ${horarioFimSexta},
            ${horarioInicioSabado},
            ${horarioFimSabado},
            ${idInstituicao}
        );`)
    }
    
}

function getLastTarefa(fkInstituicao){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`SELECT idTarefa FROM tarefa WHERE fkInstituicao = ${fkInstituicao} ORDER BY idTarefa DESC LIMIT 1;`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`SELECT TOP 1 idTarefa FROM tarefa WHERE fkInstituicao = ${fkInstituicao} ORDER BY idTarefa DESC;`);
    }
}

function setTarefaXequipamento(idTarefa, idEquipamento){
    return database.executar(`INSERT INTO tarefaXequipamento VALUES (${idTarefa}, ${idEquipamento});`);
}

function getTarefas(fkInstituicao){
    return database.executar(`SELECT * FROM tarefa WHERE fkInstituicao = ${fkInstituicao};`);
}

function getTarefa(idTarefa){
    return database.executar(`SELECT * FROM tarefa WHERE idTarefa = ${idTarefa};`);
}

function getMedidasTarefa(fkInstituicao, idTarefa){
    // Atenção, desenvolvedor: Query provisória, será desenvolvida depois
    return database.executar(`SELECT * FROM tarefa WHERE idTarefa = ${idTarefa};`)
}

function deleteTarefa(idTarefa){
    database.executar(`DELETE FROM medidaTarefa WHERE fkTarefa = ${idTarefa}`);
    database.executar(`DELETE FROM tarefaXequipamento WHERE fkTarefa = ${idTarefa}`);
    return database.executar(`DELETE FROM tarefa WHERE idTarefa = ${idTarefa};`);
}

function getTarefaXequipamento(idTarefa){
    return database.executar(`SELECT * FROM tarefaXequipamento WHERE fkTarefa = ${idTarefa};`);
}

function updateTarefa(idInstituicao, nomeTarefa, descricao, dtInicio, dtFim, isDomingo, isSegunda, isTerca, isQuarta, isQuinta, isSexta, isSabado, horarioInicioDomingo, horarioFimDomingo, 
    horarioInicioSegunda, horarioFimSegunda, horarioInicioTerca, horarioFimTerca, horarioInicioQuarta, horarioFimQuarta, horarioInicioQuinta, horarioFimQuinta, horarioInicioSexta, 
    horarioFimSexta, horarioInicioSabado, horarioFimSabado, idTarefa, maquinas){

    if(dtInicio != 'NOW()' && dtFim != 'NULL'){
            query = `UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = '${dtInicio}',
            dataFim = '${dtFim}',
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado}
            WHERE idTarefa = ${idTarefa};`
            database.executar(query);
            console.log(query)
    }else if(dtInicio == 'NOW()' && dtFim != 'NULL'){
            database.executar(`UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = ${dtInicio},
            dataFim = '${dtFim}',
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado},
            WHERE idTarefa = ${idTarefa};`);
    }else if(dtInicio != 'NOW()' && dtFim == 'NULL'){
            database.executar(`UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = '${dtInicio}',
            dataFim = ${dtFim},
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado}
            WHERE idTarefa = ${idTarefa};`);
    }else if(dtInicio == 'NOW()' && dtFim == 'NULL'){
            database.executar(`UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = ${dtInicio},
            dataFim = ${dtFim},
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado}
            WHERE idTarefa = ${idTarefa};`);
    }

    if(maquinas != 'vazio'){
        database.executar(`DELETE FROM tarefaXequipamento WHERE fkTarefa =  ${idTarefa};`);

        for(i = 0; i < maquinas.length; i++){
            database.executar(`INSERT INTO tarefaXequipamento VALUES (${idTarefa}, ${maquinas[i]});`)
        }
    }

    return database.executar(`SELECT * FROM tarefaXequipamento;`);
}

module.exports = {
    insertTarefa,
    getLastTarefa,
    setTarefaXequipamento,
    getTarefas,
    getTarefa,
    getMedidasTarefa,
    getMedidasTarefa,
    deleteTarefa,
    getTarefaXequipamento,
    updateTarefa
};