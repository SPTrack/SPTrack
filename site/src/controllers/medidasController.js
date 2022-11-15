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

function pontuacaoDia(request, response){
    var componente = request.body.componenteServer;
    var idInstituicao = request.body.idInstituicaoServer;

    if ((componente == null || componente == undefined) && (idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.pontuacaoDia(componente, idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getEstadosDeUso(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getEstadosDeUso(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function getDadosEquipamentoEspecifico(request, response){
    var idEquipamento = request.body.idEquipamentoServer;

    if ((idEquipamento == null || idEquipamento == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.getDadosEquipamentoEspecifico(idEquipamento).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function listarMaquinas(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.listarMaquinas(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function listarDadosMaquinas(request, response){
    var idEquipamento = request.body.idEquipamentoServer;

    if ((idEquipamento == null || idEquipamento == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        medidasModel.listarDadosMaquinas(idEquipamento).then(resultado => {
           console.log(resultado)
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados do equipamento! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function editarMaquinas(request, response) {
    var idInstituicao = request.body.idInstituicaoServer;
    var modelo =  request.body.modeloServer;
    var cpu =  request.body.nomeCpuServer;
    var memoria = request.body.memoriaRamServer;
    var armazenamento= request.body.armazenamentoServer;
    var idCpu =  request.body.idCpuServer;
    var idMemoria =  request.body.idMemoriaServer;
    var idArmazenamento = request.body.idArmazenamentoServer;
    var idEquipamento = request.body.idEquipamentoServer;
    var sistema = request.body.sistemaOperacionalServer;

    if (modelo == null || modelo == undefined) {
        response.status(400).send('modelo obrigatório!')
    } else if (cpu == null || cpu == undefined) {
        response.status(400).send('cpu é obrigatório!')
    } else if (memoria == null || memoria == undefined) {
        response.status(400).send('memoria é obrigatório!')
    } else if (armazenamento == null || armazenamento == undefined) {
        response.status(400).send('armazenamento é obrigatório!')
    } else if (idCpu == null || idCpu == undefined) {
        response.status(400).send('cpu é obrigatório!')
    } else if (idMemoria == null || idMemoria == undefined) {
        response.status(400).send('idMemoria é obrigatório!')
    } else if (idArmazenamento == null || idArmazenamento == undefined) {
        response.status(400).send('IdArmazenamento é obrigatório!')
    } else if (idEquipamento == null || idEquipamento == undefined) {
        response.status(400).send('IdEquipamento é obrigatório!')
    } else if (sistema == null || sistema == undefined) {
        response.status(400).send('sistema é obrigatório!')
    } else {
        medidasModel.editarMaquinas(idInstituicao, modelo, cpu, memoria, armazenamento, idCpu, idMemoria, idArmazenamento, idEquipamento, sistema)
            .then(resultado => {
                response.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao editar os dados da instituição! Erro: ", erro.sqlMessage);
                response.status(500).json(erro.sqlMessage);
            });
        
    }
}



module.exports = {
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
    editarMaquinas,
}