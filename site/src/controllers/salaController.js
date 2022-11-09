var salaModel = require('../models/salaModel');

function cadastrar(request, response) {
    var nome = request.body.nomeServer;
    var fkInstituicao = request.body.fkInstituicaoServer;

    if (nome == null || nome == undefined) {
        response.status(400).send("Nome da sala é obrigatório!");
    } else if (fkInstituicao == null || fkInstituicao == undefined) {
        response.status(400).send("fkInsituicao é obrigatório!");
    } else {
        salaModel.cadastrar(nome, fkInstituicao).then(resultado => {
            response.json(resultado)

        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getDadoSala(request,response){
    var salaAtual = request.body.salaAtual;
    var novaSala = request.body.novaSala;
    var idComputador = request.body.idComputador;

    if (salaAtual == null || idComputador == undefined || novaSala == undefined) {
        response.status(400).send("dados inseridos de forma errada!");
    }
    else{
        salaModel.getDadoSala(salaAtual,novaSala,idComputador).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
        
    }
}


function getSalas(request,response){
    var idInstituicao = request.body.idInstituicaoServer;

    if (idInstituicao == null || idInstituicao == undefined) {
        response.status(400).send("Nome da instituição não foi encantrado!");
    }

    salaModel.getSalas(idInstituicao).then(resultado => {
        response.json(resultado)
    }).catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
        response.status(500).json(erro.sqlMessage);
    });
}

function getMaquinasSala(request, response){
    var idInstituicao = request.body.idInstituicaoServer;
    var idSala = request.body.idSalaServer;

    if ((idInstituicao == null || idInstituicao == undefined) && (idSala == null || idSala == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        salaModel.getMaquinasSala(idInstituicao, idSala).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getNomeSala(request, response){
    var idInstituicao = request.body.idInstituicaoServer;
    var idSala = request.body.idSalaServer;

    if ((idInstituicao == null || idInstituicao == undefined) && (idSala == null || idSala == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        salaModel.getNomeSala(idInstituicao, idSala).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    cadastrar,
    getSalas,
    getDadoSala,
    getMaquinasSala,
    getNomeSala
}