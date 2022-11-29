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
    return database.executar(`SELECT idTarefa FROM tarefa WHERE fkInstituicao = ${fkInstituicao} ORDER BY idTarefa DESC LIMIT 1;`)
}

function setTarefaXequipamento(idTarefa, idEquipamento){
    return database.executar(`INSERT INTO tarefaXequipamento VALUES (${idTarefa}, ${idEquipamento});`);
}

function getTarefas(fkInstituicao){
    return database.executar(`SELECT * FROM tarefa WHERE fkInstituicao = ${fkInstituicao};`);
}

module.exports = {
    insertTarefa,
    getLastTarefa,
    setTarefaXequipamento,
    getTarefas
};