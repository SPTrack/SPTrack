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

module.exports = {
    cadastrar
}