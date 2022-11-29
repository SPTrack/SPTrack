var tarefaModel = require('../models/tarefaModel');

function setTarefaXequipamentos(request, response){
    var maquinas = request.body.maquinasServer;
    var idTarefa = request.body.idTarefaServer;

    for(i = 0; i < maquinas.length; i++){
        tarefaModel.setTarefaXequipamento(idTarefa, maquinas[i]).then(resultado => {
            response.json(resultado)
        })
    }
}

function getLastTarefa(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    tarefaModel.getLastTarefa(idInstituicao).then(resultado => {
        response.json(resultado)
    }).catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao pegar os dados da tarefa! Erro: ", erro.sqlMessage);
    });
}

function insertTarefa(request, response){
    var idInstituicao = request.body.idInstituicaoServer;
    var nomeTarefa = request.body.nomeTarefaServer;
    var descricao = request.body.descricaoServer;
    var dtInicio = request.body.dtInicioServer;
    var dtFim = request.body.dtFimServer;
    var isDomingo = request.body.isDomingoServer;
    var isSegunda = request.body.isSegundaServer;
    var isTerca = request.body.isTercaServer;
    var isQuarta = request.body.isQuartaServer;
    var isQuinta = request.body.isQuintaServer;
    var isSexta = request.body.isSextaServer;
    var isSabado = request.body.isSabadoServer;
    var horarioInicioDomingo = request.body.horarioInicioDomingoServer;
    var horarioFimDomingo = request.body.horarioFimDomingoServer;
    var horarioInicioSegunda = request.body.horarioInicioSegundaServer;
    var horarioFimSegunda = request.body.horarioFimSegundaServer;
    var horarioInicioTerca = request.body.horarioInicioTercaServer;
    var horarioFimTerca = request.body.horarioFimTercaServer;
    var horarioInicioQuarta = request.body.horarioInicioQuartaServer;
    var horarioFimQuarta = request.body.horarioFimQuartaServer;
    var horarioInicioQuinta = request.body.horarioInicioQuintaServer;
    var horarioFimQuinta = request.body.horarioFimQuintaServer;
    var horarioInicioSexta = request.body.horarioInicioSextaServer;
    var horarioFimSexta = request.body.horarioFimSextaServer;
    var horarioInicioSabado = request.body.horarioInicioSabadoServer;
    var horarioFimSabado = request.body.horarioFimSabadoServer;

    if((idInstituicao == null || idInstituicao == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!");
    }else if((nomeTarefa == null) || (nomeTarefa == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((descricao == null) || (descricao == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((dtInicio == null) || (dtInicio == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((dtFim == null) || (dtFim == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((isDomingo == null) || (isDomingo == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((isSegunda == null) || (isSegunda == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((isTerca == null) || (isTerca == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((isQuarta == null) || (isQuarta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((isQuinta == null) || (isQuinta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((isSexta == null) || (isSexta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((isSabado == null) || (isSabado == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioInicioDomingo == null) || (horarioInicioDomingo == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioFimDomingo == null) || (horarioFimDomingo == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioInicioSegunda == null) || (horarioInicioSegunda == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioFimSegunda == null) || (horarioFimSegunda == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioInicioTerca == null) || (horarioInicioTerca == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioFimTerca == null) || (horarioFimTerca == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioInicioQuarta == null) || (horarioInicioQuarta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioFimQuarta == null) || (horarioFimQuarta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioInicioQuinta == null) || (horarioInicioQuinta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioFimQuinta == null) || (horarioFimQuinta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioInicioSexta == null) || (horarioInicioSexta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioFimSexta == null) || (horarioFimSexta == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioInicioSabado == null) || (horarioInicioSabado == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else if((horarioFimSabado == null) || (horarioFimSabado == undefined)){
        response.status(400).send("Requisição negada. Dados não integros!")
    }else {
        tarefaModel.insertTarefa(
            idInstituicao, nomeTarefa, descricao, dtInicio, dtFim, isDomingo, isSegunda, isTerca, isQuarta, isQuinta, isSexta, isSabado, horarioInicioDomingo, horarioFimDomingo, 
            horarioInicioSegunda, horarioFimSegunda, horarioInicioTerca, horarioFimTerca, horarioInicioQuarta, horarioFimQuarta, horarioInicioQuinta, horarioFimQuinta, horarioInicioSexta, 
            horarioFimSexta, horarioInicioSabado, horarioFimSabado
        ).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getTarefas(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    tarefaModel.getTarefas(idInstituicao).then(resultado => {
        response.json(resultado)
    }).catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao pegar os dados da tarefa! Erro: ", erro.sqlMessage);
    });    
}

function getTarefa(request, response){
    var idTarefa = request.body.idTarefaServer;

    tarefaModel.getTarefa(idTarefa).then(resultado => {
        response.json(resultado)
    }).catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao pegar os dados da tarefa! Erro: ", erro.sqlMessage);
    });    
}

function getMedidasTarefa(request, response){
    var idInstituicao = request.body.idInstituicaoServer;
    var idTarefa = request.body.idTarefaServer;

    tarefaModel.getMedidasTarefa(idInstituicao, idTarefa).then(resultado => {
        response.json(resultado)
    }).catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao pegar os dados da tarefa! Erro: ", erro.sqlMessage);
    });    
}

module.exports = {
    insertTarefa,
    getLastTarefa,
    setTarefaXequipamentos,
    getTarefas,
    getTarefa,
    getMedidasTarefa
}