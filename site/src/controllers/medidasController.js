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

// Gráfico III
function getMedidasInstituicao(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getMedidasInstituicao(idInstituicao).then(resultado => {
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

function getMaquinasManutencao(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getMaquinasManutencao(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

// Gráfico III -- não mais usado
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

function retirarDaManutencao(request, response){
    var patrimonio = request.body.patrimonioServer;
    var descricao = request.body.descricaoServer;
    var id = request.body.idServer;

    if ((patrimonio == null || patrimonio == undefined) && (descricao == null || descricao == undefined) && (id == null || id == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.retirarDaManutencao(patrimonio, descricao, id).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function inserirNaManutencao(request, response){
    var idEquipamento = request.body.idEquipamentoServer;
    var descricao = request.body.descricaoServer;
    var idUsuario = request.body.idUsuarioServer;

    if ((idEquipamento == null || idEquipamento == undefined) && (descricao == null || descricao == undefined) && (idUsuario == null || idUsuario == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.inserirNaManutencao(idEquipamento, descricao, idUsuario).then(resultado => {
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
    getMedidasInstituicao,
    getMaquinasMonitoradas,
    getDisponibilidade,
    getMaquinasInstituicao,
    getMediasEquipamentos,
    getMaquinasManutencao,
    retirarDaManutencao,
    inserirNaManutencao
}