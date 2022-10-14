var medidasModel = require('../models/medidasModel');

// Gráfico I
function getHistoricoDisponibilidade(request, response){
    var idInstituicao = request.body.idInstituicaoServer;
    var dias = request.body.diasServer;

    if ((idInstituicao == null || idInstituicao == undefined) && (dias == null || dias == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getHistoricoDisponibilidade(idInstituicao, dias).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}


function getDadosEquipamento(request, response) {
    var idEquipamento = request.body.idEquipamentoServer;

    if ((idEquipamento == null || idEquipamento == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getComponentes(idEquipamento, fkInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getMediasInstituicao(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getMediasInstituicao(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getMaquinasMonitoradas(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getMaquinasMonitoradas(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getDisponibilidade(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getDisponibilidade(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getMaquinasInstituicao(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getMaquinasInstituicao(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function setDadosG4(request, response){
    var idEquipamento = request.body.idEquipamentoServer;

    if ((idEquipamento == null || idEquipamento == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.setDadosG4(idEquipamento).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getMediasEquipamentos(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getMediasEquipamentos(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    getDadosEquipamento,
    getHistoricoDisponibilidade,
    getMediasInstituicao,
    getMaquinasMonitoradas,
    getDisponibilidade,
    getMaquinasInstituicao,
    setDadosG4,
    getMediasEquipamentos
}