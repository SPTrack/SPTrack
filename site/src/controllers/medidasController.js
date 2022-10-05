var medidasModel = require('../models/medidasModel');

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

module.exports = {
    getDadosEquipamento,
    getMedidasInstituicao
}