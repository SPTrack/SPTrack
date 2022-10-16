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

function getSala(request,response){
    var nomeInstituicao=request.body.InstituicaoServer;
    if (nomeInstituicao == null || nomeInstituicao == undefined) {
        response.status(400).send("Nome da instituição não foi encantrado!");
    }
            salaModel.getSala(nomeInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
}

function getqntdMaquinas(request,response){
    var idEquipamento=request.body.idEquipamentoServer;

    if (idEquipamento == null || idEquipamento == undefined) {
        response.status(400).send("Fk da maquina não foi encantrada!");
    }
    if ((idSala == null || idSala == undefined)) {
        response.status(400).send("Dados não encontrados!");
    } else {
        salaModel.getqntdMaquinas(idEquipamento).then(resultado => {
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
    getSala,
    getqntdMaquinas,
    getSalas,
    getMaquinasSala,
    getNomeSala
}